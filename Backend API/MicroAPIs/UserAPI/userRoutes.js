const express = require('express');
const router = express.Router();

const userController = require('./userController');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users/login', userController.login);
router.post('/createuser', userController.createUser);
router.put('/updateuser/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);

module.exports = router;
