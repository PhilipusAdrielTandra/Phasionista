const express = require('express');
const router = express.Router();

const cartController = require('./cartController');

const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, 'mariahcarey', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }


router.post('/cart', authenticateToken, cartController.addToCart);
router.get('/cart', authenticateToken, cartController.getCart);
router.put('/cart', authenticateToken, cartController.updateCartItem);
router.delete('/cart', authenticateToken, cartController.deleteCartItem);

module.exports = router;
