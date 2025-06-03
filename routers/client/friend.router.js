var ex = require('express');
var router = ex.Router();
var friendController = require('../../controller/client/friend.controller');

router.get('/listuser', friendController.listuser);
router.get('/listrequest', friendController.listrequest);
router.get('/listSent', friendController.listSent);
router.get('/listfriend', friendController.listfriend);
module.exports = router;