const express = require('express');
const argon = require('argon2');
const jwt = require('jsonwebtoken')
const router = express.Router();
const sellerController = require('./sellerController');

function authenticateToken(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) return res.sendStatus(401);
  
    const [bearer, token] = header.split(' ');
    if (bearer !== 'Bearer' || !token) return res.sendStatus(401);
  
    jwt.verify(token, 'mariahcarey', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

router.post('/', authenticateToken, sellerController.createSeller);
router.get('/', sellerController.getAllSellers);
router.get('/retailer/:id', sellerController.getSellerById);
router.put('/retailer/:id', sellerController.updateSeller);
router.delete('/retailer/:id', sellerController.deleteSeller);
// router.get('/location/:id', sellerController.getLocationById);
// router.post('/location', sellerController.createSellerLocation);
// router.put('/location/:id', sellerController.updateSellerLocation);
// router.delete('/location/:id', sellerController.deleteSellerLocation);
// router.get('/images/:id', sellerController.getImageById);
// router.post('/images', sellerController.createSellerImage);
// router.put('/images/:id', sellerController.updateSellerImage);
// router.delete('/images/:id', sellerController.deleteSellerImage);

module.exports = router;
