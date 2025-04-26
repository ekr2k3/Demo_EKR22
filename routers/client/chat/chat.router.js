//chat.router.js
var chatController = require('../../../controller/client/chat.controller');
var ex = require('express');
var router = ex.Router();
router.get('/', chatController.getChatList);

module.exports = router;