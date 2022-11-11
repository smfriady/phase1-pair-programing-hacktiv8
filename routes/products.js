const express = require('express');
const Controller = require('../controllers/products');
const router = express.Router();


router.get('/:productName',  Controller.getProduct);
router.get('/:productName/orders/:qty/:nominal/:idProduct', Controller.renderBuyProduct)
router.post('/:productName/orders/:qty/:nominal/:idProduct', Controller.buyProduct)
module.exports = router;