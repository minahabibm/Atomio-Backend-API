const express = require('express');

const router = express.Router();
const authJWT = require('../middlewares/authentication');
const db = require('../models');
const pagination = require('../config/pagination');

let limitParam;
let offsetParam;
let param;

router.get('/facilities', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    if (req.body.limitParam < 1) {
      return res.status(403).send({ message: 'Invalid body or parameters' });
    }
    if (req.body.offsetParam && req.body.limitParam) {
      param = pagination.pagination(req.body.offsetParam, req.body.limitParam);
      offsetParam = param.offsetParam;
      limitParam = param.limitParam;
    } else {
      limitParam = pagination.limitParam;
      offsetParam = pagination.offsetParam;
    }

    try {
      db.facilities.findAll({
        limit: limitParam,
        offset: offsetParam
      })
        .then((data) => {
          if (!data) {
            return res.status(403).send({ message: 'Object not found' });
          }
          res.status(200).send(data);
        });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    console.log('superAdmin');
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.post('/facilities', authJWT, (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Invalid body or parameters' });
  }

  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.facilities.create({
        code: req.body.code,
        name: req.body.name,
        areaId: req.body.areaId,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy
      })
        .then(() => {
          console.log('Facility created successfully');
          res.status(201).send('Facility created successfully');
        });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.get('/facilities/:facilityId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.facilities.findOne({
        where: {
          id: req.params.facilityId
        }
      })
        .then((data) => {
          if (!data) {
            return res.status(403).send({ message: 'Object not found' });
          }
          res.status(200).send(data);
        });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.patch('/facilities/:facilityId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.facilities.findOne({ where: { id: req.params.facilityId } }).then((data) => {
        if (data) {
          db.facilities.update(
            {
              code: req.body.code,
              name: req.body.name,
              areaId: req.body.areaId,
              createdBy: req.body.createdBy,
              updatedBy: req.body.updatedBy
            }, {
              where: {
                id: req.params.facilityId
              }
            }
          )
            .then(() => {
              res.status(200).send('Facility successfully updated');// data
            });
        } else {
          res.status(404).send('Object not found');
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.put('/facilities/:facilityId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.code || !req.body.name
      || !req.body.createdBy || !req.body.areaId || !req.body.updatedBy) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.facilities.findOne({ where: { id: req.params.facilityId } }).then((data) => {
        if (data) {
          db.facilities.update(
            {
              code: req.body.code,
              name: req.body.name,
              areaId: req.body.areaId,
              createdBy: req.body.createdBy,
              updatedBy: req.body.updatedBy
            }, {
              where: {
                id: req.params.facilityId
              }
            }
          )
            .then(() => {
              res.status(200).send('Facility successfully updated');// data
            });
        } else {
          res.status(404).send('Object not found');
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.delete('/facilities/:facilityId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.facilities.findOne({ where: { id: req.params.facilityId } }).then((data) => {
        if (data) {
          db.facilities.destroy(
            {
              where: {
                id: req.params.facilityId
              }
            }
          )
            .then(() => res.status(202).send('Facility deleted successfully'));// data
        } else {
          res.status(404).send('Object not found');
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.put('/facilities/:facilityId/contacts/:contactId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.facilities.findOne({ where: { id: req.params.facilityId } }).then((data) => {
        if (data) {
          // eslint-disable-next-line no-shadow
          db.contacts.findOne({ where: { id: req.params.contactId } }).then((data) => {
            if (data) {
              db.facilitiesHasContacts.update(
                {
                  facilityId: req.params.facilityId,
                  contactsId: req.params.contactId
                }, {
                  // where: {
                  //  id: req.params.facilityId
                // }
                }
              )
                .then(() => {
                  res.status(200).send('Contact added successfully');// data
                });
            } else {
              res.status(404).send('Object not found');
            }
          });
        } else {
          res.status(404).send('Object not found');
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.delete('/facilities/:facilityId/contacts/:contactId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.facilitiesHasContacts.findOne({ where: { facilityId: req.params.facilityId } }).then((data) => {
        if (data) {
          db.facilitiesHasContacts.destroy(
            {
              where: {
                facilityId: req.params.facilityId
              }
            }
          )
            .then(() => res.status(202).send('Contact removed successfully'));// data
        } else {
          res.status(404).send('Object not found');
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

module.exports = router;
