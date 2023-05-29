const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const orderController = require('./ordersController');

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

router.get('/getall', orderController.getAll);
router.post('/orders', authenticateToken, orderController.createOrder);
router.get('/orders', authenticateToken, orderController.getOrderById);
router.put('/orders', authenticateToken, orderController.updateOrderById);
router.delete('/orders', authenticateToken, orderController.deleteOrderById);

module.exports = router;
