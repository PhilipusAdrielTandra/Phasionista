const express = require('express');
const router = express.Router();
const sellerController = require('./sellerController');

router.post('/', sellerController.createSeller);
router.get('/', sellerController.getAllSellers);
router.get('/retailer/:id', sellerController.getSellerById);
router.put('/retailer/:id', sellerController.updateSeller);
router.delete('/retailer/:id', sellerController.deleteSeller);
router.get('/location/:id', sellerController.getLocationById);
router.post('/location', sellerController.createSellerLocation);
router.put('/location/:id', sellerController.updateSellerLocation);
router.delete('/location/:id', sellerController.deleteSellerLocation);
router.get('/images/:id', sellerController.getImageById);
router.post('/images', sellerController.createSellerImage);
router.put('/images/:id', sellerController.updateSellerImage);
router.delete('/images/:id', sellerController.deleteSellerImage);

module.exports = router;
