//chat.router.js
var chatController = require('../../../controller/client/chat.controller');
var ex = require('express');
var router = ex.Router();
router.get('/:id_room', chatController.getChatList);

module.exports = router; 