const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const session = require('express-session');

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

router.use(session({
  secret: 'mariahcarey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

router.get('/getall', userController.getAllUsers);
router.get('/getid', authenticateToken, userController.getUserById);
router.post('/login', userController.login);
router.post('/createuser', userController.createUser);
router.put('/updateuser', authenticateToken, userController.updateUser);
router.delete('/deleteuser', authenticateToken, userController.deleteUser);
router.get('/user-wishlist', authenticateToken, userController.getUsersWishlist);
router.post('/user-wishlist', authenticateToken, userController.addUserWishlist);
router.delete('/user-wishlist', authenticateToken, userController.deleteUserWishlist);
router.get('/user-reviews/:id', userController.getReviewsById);
router.get('/user-reviews/:productId', userController.getReviewsById); //not yet
router.delete('/user-reviews', authenticateToken, userController.deleteUserReviews);
router.post('/user-reviews', authenticateToken, userController.addUserReviews);
router.get('/user-transactions', authenticateToken, userController.getUserTransactions);
router.post('/user-transactions', authenticateToken, userController.addUserTransactions);

module.exports = router;