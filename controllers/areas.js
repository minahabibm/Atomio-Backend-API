const express = require('express');

const router = express.Router();
const authJWT = require('../middlewares/authentication');
const db = require('../models');
const pagination = require('../config/pagination');

let limitParam;
let offsetParam;
let param;

router.get('/regions', authJWT, (req, res) => {
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
      db.regions.findAll({
        limit: limitParam,
        offset: offsetParam
      })
        .then((data) => {
          if (!data) {
            return res.status(403).send({ message: 'Object not found' });
          }
          // console.log(`New region ${req.body.name}, has been created.`);
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

router.post('/regions', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.regions.create({
        name: req.body.name
      })
        .then(() => {
          console.log('Region created successfully');
          res.status(201).send('Region created successfully');
        });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.get('/regions/:regionId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.regions.findOne({
        where: {
          id: req.params.regionId
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

router.put('/regions/:regionId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.regions.findOne({ where: { id: req.params.regionId } }).then((data) => {
        if (data) {
          db.regions.update(
            {
              name: req.body.name
            }, {
              where: {
                id: req.params.regionId
              }
            }
          )
            .then(() => {
              res.status(200).send('Region successfully updated');// data
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

router.delete('/regions/:regionId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin') {
    try {
      db.regions.findOne({ where: { id: req.params.regionId } }).then((data) => {
        if (data) {
          db.regions.destroy(
            {
              where: {
                id: req.params.regionId
              }
            }
          )
            .then(() => res.status(202).send('Region deleted successfully')); // data
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

router.get('/regions/:regionId/areas', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.regions.findOne({
        where: { id: req.params.regionId },
        include: [{
          model: db.areas
          // regionId: req.params.regionId
        }]
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

router.post('/regions/:regionId/areas', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.areas.create({
        name: req.body.name,
        regionId: req.params.regionId
      })
        .then(() => {
          console.log('Area created successfully');
          res.status(201).send('Area created successfully');
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

router.get('/areas/:areaId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin') {
    try {
      db.areas.findOne({
        where: {
          id: req.params.areaId
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

router.put('/areas/:areaId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.areas.findOne({ where: { id: req.params.areaId } }).then((data) => {
        if (data) {
          db.areas.update(
            {
              name: req.body.name,
              regionId: req.params.areaId
            }, {
              where: {
                id: req.params.areaId
              }
            }
          )
            .then(() => {
              res.status(200).send('Area successfully updated');// data
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

router.delete('/areas/:areaId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin') {
    try {
      db.areas.findOne({ where: { id: req.params.areaId } }).then((data) => {
        if (data) {
          db.areas.destroy(
            {
              where: {
                id: req.params.areaId
              }
            }
          )
            .then(() => res.status(202).send('Area deleted successfully'));// data
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
