//dashBoardRouter.js
var ex = require('express');
var router = ex.Router();
var controllerDashBoard = require('../../controller/server/dashBoardController')
router.get('/', controllerDashBoard.getDashBoard);
module.exports = router;