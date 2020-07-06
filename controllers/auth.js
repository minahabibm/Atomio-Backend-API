const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const user = require('../models').users;


router.post('/login', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Invalid body or parameters' });
  }

  user.findOne({
    where: {
      name: req.body.name
    }
  })
    // eslint-disable-next-line no-shadow
    .then((user) => {
      if (!user) {
        return res.status(403).send({ message: 'Object not found' });
      }

      const token = jwt.sign({
        id: user.id, uid: user.uid, name: user.name, role: user.role, defaultLocationId: user.defaultLocationId
      }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user.id,
        uid: user.uid,
        name: user.name,
        role: user.role,
        defaultLocationId: user.defaultLocationId,
        accessToken: token
      });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({ message: 'Server Error' });
    });
});

module.exports = router;
