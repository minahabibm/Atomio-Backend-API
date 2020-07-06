const jwt = require('jsonwebtoken');
const accessTokenSecret = require('../config/auth');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret.secret, (err, user) => {
      if (err) {
        return res.sendStatus(403).send({ message: 'Missing token or operation forbidden' });
      }

      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401).send({ message: 'Invalid body or parameters' });
  }
};

module.exports = authenticateJWT;
