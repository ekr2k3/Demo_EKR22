﻿//productRouter.js [Client]
var productController = require('../../../controller/client/productController');
var ex = require('express');
var router = ex.Router();
router.get('/', productController.productGet)
router.get('/sub/:id_DM', productController.SubProductGet);
router.get('/detail/:id_pro', productController.productDetailGet);
router.get('/search', productController.productSearchGet);
module.exports = router;