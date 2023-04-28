const express = require('express');
const router = express.Router();

const cartController = require('./cartController');

router.post('/cart', cartController.addToCart);
router.get('/cart', cartController.getCart);
router.put('/cart/:productId', cartController.updateCartItem);
router.delete('/cart/:productId', cartController.deleteCartItem);

module.exports = router;
