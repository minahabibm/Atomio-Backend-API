const express = require('express');

const router = express.Router();

// Load each controller
// const postsController = require('./posts.js');
const appConfigController = require('./appConfig.js');
const apiLoginAuth = require('./auth.js');
const users = require('./users.js');
const areas = require('./areas.js');
const contacts = require('./contacts.js');
const facilities = require('./facilities.js');
const products = require('./products.js');
const tanks = require('./tanks.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
// router.use('/posts', postsController);
router.use('/application-configuration', appConfigController);
router.use('/api', apiLoginAuth);
router.use('/api', users);
router.use('/api', areas);
router.use('/api', contacts);
router.use('/api', facilities);
router.use('/api', products);
router.use('/api', tanks);


module.exports = router;
