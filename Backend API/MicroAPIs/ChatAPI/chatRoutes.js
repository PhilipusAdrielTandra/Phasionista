const express = require('express');
const router = express.Router();
const chatController = require('./chatController');

router.get('/chats', chatController.getChats);
router.post('/chats', chatController.createChat);

module.exports = router;
