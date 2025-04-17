//router nhóm cart
var cartController = require('../../../controller/client/cart.controller');
var ex = require('express');
var router = ex.Router();

router.post('/add/:id', cartController.addToCart); // thêm sản phẩm vào giỏ hàng

module.exports = router;