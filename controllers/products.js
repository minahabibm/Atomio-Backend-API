const express = require('express');

const router = express.Router();
const authJWT = require('../middlewares/authentication');
const db = require('../models');
const pagination = require('../config/pagination');

let limitParam;
let offsetParam;
let param;

router.get('/productCategories', authJWT, (req, res) => {
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
      db.productCategories.findAll({
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

router.post('/productCategories', authJWT, (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Invalid body or parameters' });
  }

  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.productCategories.create({
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

router.get('/productCategories/:productCategoryId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.productCategories.findOne({
        where: {
          id: req.params.productCategoryId
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

router.put('/productCategories/:productCategoryId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.productCategories.findOne({ where: { id: req.params.productCategoryId } }).then((data) => {
        if (data) {
          db.productCategories.update(
            {
              name: req.body.name
            }, {
              where: {
                id: req.params.productCategoryId
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

router.delete('/productCategories/:productCategoryId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.productCategories.findOne({ where: { id: req.params.productCategoryId } }).then((data) => {
        if (data) {
          db.productCategories.destroy(
            {
              where: {
                id: req.params.productCategoryId
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

router.get('/products', authJWT, (req, res) => {
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
      db.products.findAll({
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

router.post('/products', authJWT, (req, res) => {
  if (!req.body.name || !req.body.code) {
    return res.status(400).send({ message: 'Invalid body or parameters' });
  }

  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.products.create({
        name: req.body.name,
        code: req.body.code,
        isFinished: req.body.isFinished,
        naexternalSystemName: req.body.naexternalSystemName,
        externalSystemMaterial: req.body.externalSystemMaterial,
        categoryId: req.body.categoryId,
        acceptableSpecsId: req.body.acceptableSpecsId,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy
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

router.get('/products/:productId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.products.findOne({
        where: {
          id: req.params.productId
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

router.patch('/products/:productId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.products.findOne({ where: { id: req.params.productId } }).then((data) => {
        if (data) {
          db.products.update({
            name: req.body.name,
            code: req.body.code,
            isFinished: req.body.isFinished,
            naexternalSystemName: req.body.naexternalSystemName,
            externalSystemMaterial: req.body.externalSystemMaterial,
            categoryId: req.body.categoryId,
            acceptableSpecsId: req.body.acceptableSpecsId,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy
          }, {
            where: {
              id: req.params.productId
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

router.put('/products/:productId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name || !req.body.code || !req.body.isFinished
      || !req.body.naexternalSystemName || !req.body.externalSystemMaterial || !req.body.categoryId
      || !req.body.acceptableSpecsId || !req.body.createdBy || !req.body.updatedBy) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.products.findOne({ where: { id: req.params.productId } }).then((data) => {
        if (data) {
          db.products.update({
            name: req.body.name,
            code: req.body.code,
            isFinished: req.body.isFinished,
            naexternalSystemName: req.body.naexternalSystemName,
            externalSystemMaterial: req.body.externalSystemMaterial,
            categoryId: req.body.categoryId,
            acceptableSpecsId: req.body.acceptableSpecsId,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy
          }, {
            where: {
              id: req.params.productId
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

router.delete('/products/:productId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.products.findOne({ where: { id: req.params.productId } }).then((data) => {
        if (data) {
          db.products.destroy(
            {
              where: {
                id: req.params.productId
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
