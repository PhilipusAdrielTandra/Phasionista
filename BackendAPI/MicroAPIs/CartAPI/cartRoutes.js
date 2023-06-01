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

router.get('/session', cartController.getCart);
router.post('/session', cartController.addToCart);
router.put('/session', cartController.updateCartItem);
router.delete('/session', cartController.deleteCartItem)
router.post('/user', authenticateToken, cartController.addToCart);
router.get('/user', authenticateToken, cartController.getCart);
router.put('/user', authenticateToken, cartController.updateCartItem);
router.delete('/user', authenticateToken, cartController.deleteCartItem);

module.exports = router;
