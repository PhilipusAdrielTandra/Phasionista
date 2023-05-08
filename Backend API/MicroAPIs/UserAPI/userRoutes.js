const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('./userController');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, 'mariahcarey', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

router.get('/users', userController.getAllUsers);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.post('/users/login', userController.login);
router.post('/createuser', userController.createUser);
router.put('/updateuser/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);

module.exports = router;
