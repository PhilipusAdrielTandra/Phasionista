const express = require('express');
const router = express.Router();

// Import the user controller
const userController = require('./userController');

// Define routes for users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Export the router
module.exports = router;
