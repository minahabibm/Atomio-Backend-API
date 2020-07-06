const express = require('express');

const router = express.Router();
const authJWT = require('../middlewares/authentication');
const db = require('../models');
const pagination = require('../config/pagination');

let limitParam;
let offsetParam;
let param;

router.get('/contactTypes', authJWT, (req, res) => {
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
      db.contactTypes.findAll({
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
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.post('/contactTypes', authJWT, (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Invalid body or parameters' });
  }

  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.contactTypes.create({
        name: req.body.name
      })
        .then(() => {
          console.log('Contact Type created successfully');
          res.status(201).send('Contact Type created successfully');
        });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.get('/contactTypes/:contactTypeId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.contactTypes.findOne({
        where: {
          id: req.params.contactTypeId
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

router.put('/contactTypes/:contactTypeId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.contactTypes.findOne({ where: { id: req.params.contactTypeId } }).then((data) => {
        if (data) {
          db.contactTypes.update(
            {
              name: req.body.name
            }, {
              where: {
                id: req.params.contactTypeId
              }
            }
          )
            .then(() => {
              res.status(200).send('Contact Type successfully updated');// data
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

router.delete('/contactTypes/:contactTypeId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.contactTypes.findOne({ where: { id: req.params.contactTypeId } }).then((data) => {
        if (data) {
          db.contactTypes.destroy(
            {
              where: {
                id: req.params.contactTypeId
              }
            }
          )
            .then(() => res.status(202).send('ContactType deleted successfully'));// data
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

router.get('/contacts', authJWT, (req, res) => {
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
      db.contacts.findAll({
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
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.post('/contacts', authJWT, (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Invalid body or parameters' });
  }

  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.contacts.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        typeId: req.body.typeId,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy,
        inspectorId: req.body.inspectorId

      })
        .then(() => {
          console.log('Contact created successfully');
          res.status(201).send('Contact created successfully');
        });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.get('/contacts/:contactsId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.contacts.findOne({
        where: {
          id: req.params.contactsId
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

router.patch('/contacts/:contactsId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.contacts.findOne({ where: { id: req.params.contactsId } }).then((data) => {
        if (data) {
          db.contacts.update({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            typeId: req.body.typeId,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            inspectorId: req.body.inspectorId
          }, {
            where: {
              id: req.params.contactsId
            }
          })
            .then(() => {
              res.status(200).send('Contact successfully updated');// data
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

router.put('/contacts/:contactsId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.typeId || !req.body.phone || !req.body.name
      || !req.body.email || !req.body.createdBy || !req.body.updatedBy) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.contacts.findOne({ where: { id: req.params.contactsId } }).then((data) => {
        if (data) {
          db.contacts.update({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            typeId: req.body.typeId,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy
          }, {
            where: {
              id: req.params.contactsId
            }
          })
            .then(() => {
              res.status(200).send('Contact successfully updated');// data
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

router.delete('/contacts/:contactsId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.contacts.findOne({ where: { id: req.params.contactsId } }).then((data) => {
        if (data) {
          db.contacts.destroy(
            {
              where: {
                id: req.params.contactsId
              }
            }
          )
            .then(() => res.status(202).send('Contact deleted successfully'));// data
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
