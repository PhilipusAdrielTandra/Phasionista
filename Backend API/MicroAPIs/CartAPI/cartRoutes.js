const express = require('express');
const router = express.Router();

const cartController = require('./cartController');

const jwt = require('jsonwebtoken')

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

router.get('/getsessioncart', cartController.getCart);
router.post('/addsessioncart', cartController.addToCart);
router.post('/cart', authenticateToken, cartController.addToCart);
router.get('/cart', authenticateToken, cartController.getCart);
router.put('/cart', authenticateToken, cartController.updateCartItem);
router.delete('/cart', authenticateToken, cartController.deleteCartItem);

module.exports = router;
