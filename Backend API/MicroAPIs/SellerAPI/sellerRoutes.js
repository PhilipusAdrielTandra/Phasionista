const express = require('express');
const router = express.Router();
const sellerController = require('./sellerController');

router.post('/seller', sellerController.createSeller);
router.get('/seller', sellerController.getAllSellers);
router.get('/seller/:id', sellerController.getSellerById);
router.put('/seller/:id', sellerController.updateSeller);
router.delete('/seller/:id', sellerController.deleteSeller);

module.exports = router;
