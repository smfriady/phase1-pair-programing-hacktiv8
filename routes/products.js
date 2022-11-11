const express = require('express');
const Controller = require('../controllers/products');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:productName',  Controller.getProduct);
router.get('/:productName/orders/:qty/:nominal/:idProduct', authMiddleware, Controller.renderBuyProduct)
router.post('/:productName/orders/:qty/:nominal/:idProduct', authMiddleware, Controller.buyProduct);
module.exports = router;