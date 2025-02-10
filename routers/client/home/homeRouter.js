//homeRouter.js
var homeController = require('../../../controller/client/homeController');
var ex = require('express');
var router = ex.Router();
router.get('/',homeController.homeGet);

module.exports = router;