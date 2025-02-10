//productRouter.js
var productController = require('../../../controller/client/productController');
var ex = require('express');
var router = ex.Router();
router.get('/', productController.productGet)

module.exports = router;