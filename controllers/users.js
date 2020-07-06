const express = require('express');

const router = express.Router();
const authJWT = require('../middlewares/authentication');
const db = require('../models');
const pagination = require('../config/pagination');

let limitParam;
let offsetParam;
let param;

router.get('/users', authJWT, (req, res) => {
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
      db.users.findAll({
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

router.post('/users', authJWT, (req, res) => {
  if (!req.body.name || !req.body.role) {
    return res.status(400).send({ message: 'Invalid body or parameters' });
  }

  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.users.create({
        uid: req.body.uid,
        name: req.body.name,
        role: req.body.role,
        defaultLocationId: req.body.defaultLocationId
      })
        .then(() => {
          console.log('User created successfully');
          res.status(201).send('User created successfully');
        });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).send('Missing token or operation forbidden');
  }
});

router.get('/users/:userId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.users.findOne({
        where: {
          id: req.params.userId
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

router.patch('/users/:userId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.users.findOne({ where: { id: req.params.userId } }).then((data) => {
        if (data) {
          db.users.update(
            {
              uid: req.body.uid,
              name: req.body.name,
              role: req.body.role,
              defaultLocationId: req.body.defaultLocationId
            }, {
              where: {
                id: req.params.userId
              }
            }
          )
            .then(() => {
              res.status(200).send('User successfully updated');// data
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

router.put('/users/:userId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name || !req.body.uid || !req.body.role || !req.body.defaultLocationId) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.users.findOne({ where: { id: req.params.userId } }).then((data) => {
        if (data) {
          db.users.update(
            {
              uid: req.body.uid,
              name: req.body.name,
              role: req.body.role,
              defaultLocationId: req.body.defaultLocationId
            }, {
              where: {
                id: req.params.userId
              }
            }
          )
            .then(() => {
              res.status(200).send('User successfully updated');// data
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

router.delete('/users/:userId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.users.findOne({ where: { id: req.params.userId } }).then((data) => {
        if (data) {
          db.users.destroy(
            {
              where: {
                id: req.params.userId
              }
            }
          )
            .then(() => res.status(202).send('User deleted successfully'));// data
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
