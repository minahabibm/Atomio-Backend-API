const express = require('express');

const router = express.Router();
const authJWT = require('../middlewares/authentication');

router.get('/', authJWT, (req, res) => {
  console.log(req.user.role);
  res.json({
    version: '1.0.3',
    title: 'Apophis API',
    description: 'Backend API for PSAT Bunker Toolkit',
    contact: 'you@your-company.com'
  });
});


module.exports = router;
