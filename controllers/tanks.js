const express = require('express');

const router = express.Router();
const authJWT = require('../middlewares/authentication');
const db = require('../models');
const pagination = require('../config/pagination');

let limitParam;
let offsetParam;
let param;

router.get('/tanks', authJWT, (req, res) => {
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
      db.tanks.findAll({
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

router.post('/tanks', authJWT, (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Invalid body or parameters' });
  }

  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.tanks.create({
        name: req.body.name,
        maxCapacity: req.body.maxCapacity,
        heel: req.body.heel,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy,
        productId: req.body.productId,
        tankSpecsId: req.body.tankSpecsId,
        facilityId: req.body.facilityId
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

router.get('/tanks/:tankId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.tanks.findOne({
        where: {
          id: req.params.tankId
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

router.patch('/tanks/:tankId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.tanks.findOne({ where: { id: req.params.tankId } }).then((data) => {
        if (data) {
          db.tanks.update({
            name: req.body.name,
            maxCapacity: req.body.maxCapacity,
            heel: req.body.heel,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            productId: req.body.productId,
            tankSpecsId: req.body.tankSpecsId,
            facilityId: req.body.facilityId
          }, {
            where: {
              id: req.params.tankId
            }
          })
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

router.put('/tanks/:tankId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name || !req.body.maxCapacity || !req.body.heel
      || !req.body.createdBy || !req.body.updatedBy || !req.body.productId
      || !req.body.tankSpecsId || !req.body.facilityId) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.tanks.findOne({ where: { id: req.params.tankId } }).then((data) => {
        if (data) {
          db.tanks.update({
            name: req.body.name,
            maxCapacity: req.body.maxCapacity,
            heel: req.body.heel,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            productId: req.body.productId,
            tankSpecsId: req.body.tankSpecsId,
            facilityId: req.body.facilityId
          }, {
            where: {
              id: req.params.tankId
            }
          })
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

router.delete('/tanks/:tankId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.tanks.findOne({ where: { id: req.params.tankId } }).then((data) => {
        if (data) {
          db.tanks.destroy(
            {
              where: {
                id: req.params.tankId
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

router.get('/barges', authJWT, (req, res) => {
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
      db.barges.findAll({
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
}); //

router.post('/barges', authJWT, (req, res) => {
  if (!req.body.name || !req.body.code) {
    return res.status(400).send({ message: 'Invalid body or parameters' });
  }

  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }
    try {
      db.barges.create({
        name: req.body.name,
        code: req.body.code,
        externalSystemMode: req.body.isFinished,
        owner: req.body.naexternalSystemName,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy,
        vesselContactId: req.body.externalSystemMaterial,
        externalSystemNominationId: req.body.categoryId
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
}); //

router.get('/barges/:bargeId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.barges.findOne({
        where: {
          id: req.params.bargeId
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
}); //

router.patch('/barges/:bargeId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.barges.findOne({ where: { id: req.params.bargeId } }).then((data) => {
        if (data) {
          db.barges.update({
            name: req.body.name,
            code: req.body.code,
            externalSystemMode: req.body.isFinished,
            owner: req.body.naexternalSystemName,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            vesselContactId: req.body.externalSystemMaterial,
            externalSystemNominationId: req.body.categoryId
          }, {
            where: {
              id: req.params.bargeId
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
}); //

router.put('/barges/:bargeId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.name || !req.body.code || !req.body.externalSystemMode
      || !req.body.owner || !req.body.createdBy || !req.body.updatedBy
      || !req.body.vesselContactId || !req.body.externalSystemNominationId) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.barges.findOne({ where: { id: req.params.bargeId } }).then((data) => {
        if (data) {
          db.barges.update({
            name: req.body.name,
            code: req.body.code,
            externalSystemMode: req.body.isFinished,
            owner: req.body.naexternalSystemName,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            vesselContactId: req.body.externalSystemMaterial,
            externalSystemNominationId: req.body.categoryId
          }, {
            where: {
              id: req.params.bargeId
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
}); //

router.delete('/barges/:bargeId', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.barges.findOne({ where: { id: req.params.bargeId } }).then((data) => {
        if (data) {
          db.barges.destroy(
            {
              where: {
                id: req.params.bargeId
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
}); //

router.get('/barges/:bargeId/compartments', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.barges.findOne({
        where: { id: req.params.bargeId },
        include: [{
          model: db.compartments
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
});//

router.post('/barges/:bargeId/compartments', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin') {
    try {
      db.compartments.create({
        number: req.body.number,
        bargeId: req.params.bargeId,
        maxCapacity: req.params.maxCapacity,
        minCapacity: req.params.minCapacity,
        categoryId: req.params.categoryId,
        createdBy: req.params.createdBy,
        updatedBy: req.params.updatedBy
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
});//

router.get('/barges/:bargeId/compartments/:compartmentNumber', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin' || req.user.role === 'user') {
    try {
      db.compartments.findOne({
        where: {
          id: req.params.compartmentNumber
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
});//

router.patch('/barges/:bargeId/compartments/:compartmentNumber', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.compartments.findOne({ where: { id: req.params.compartmentNumber } }).then((data) => {
        if (data) {
          db.compartments.update({
            number: req.body.number,
            bargeId: req.params.bargeId,
            maxCapacity: req.params.maxCapacity,
            minCapacity: req.params.minCapacity,
            categoryId: req.params.categoryId,
            createdBy: req.params.createdBy,
            updatedBy: req.params.updatedBy
          }, {
            where: {
              id: req.params.compartmentNumber
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
}); //

router.put('/barges/:bargeId/compartments/:compartmentNumber', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    if (!req.body.number || !req.body.bargeId || !req.body.maxCapacity
      || !req.body.minCapacity || !req.body.categoryId || !req.body.createdBy
      || !req.body.updatedBy) {
      return res.status(400).send({ message: 'Invalid body or parameters' });
    }

    try {
      db.compartments.findOne({ where: { id: req.params.compartmentNumber } }).then((data) => {
        if (data) {
          db.compartments.update({
            number: req.body.number,
            bargeId: req.params.bargeId,
            maxCapacity: req.params.maxCapacity,
            minCapacity: req.params.minCapacity,
            categoryId: req.params.categoryId,
            createdBy: req.params.createdBy,
            updatedBy: req.params.updatedBy
          }, {
            where: {
              id: req.params.compartmentNumber
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

router.delete('/barges/:bargeId/compartments/:compartmentNumber', authJWT, (req, res) => {
  if (req.user.role === 'superAdmin' || req.user.role === 'admin') {
    try {
      db.compartments.findOne({ where: { facilityId: req.params.compartmentNumber } }).then((data) => {
        if (data) {
          db.compartments.destroy(
            {
              where: {
                facilityId: req.params.compartmentNumber
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
}); //


module.exports = router;
