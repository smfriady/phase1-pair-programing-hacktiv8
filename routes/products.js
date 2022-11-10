const express = require('express');
const Controller = require('../controllers/products');
const router = express.Router();


router.get('/:productName',  Controller.getProduct);

module.exports = router;