const express = require('express');
const Controller = require('../controllers');
const router = express.Router();
 
router.get('/', Controller.homePage);
router.get('/login', Controller.loginPage)

module.exports = router;