const express = require('express');
const router = express.Router();
const chatController = require('./chatController');

router.get('/user/:id', chatController.getUserChat);
router.get('/retailer/:id', chatController.getRetailerChat);
router.post('/create-chat', chatController.createChat);

module.exports = router;
