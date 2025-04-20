//router nhóm cart
var cartController = require('../../../controller/client/cart.controller');
var ex = require('express');
var router = ex.Router();

router.post('/add/:id', cartController.addToCart); // thêm sản phẩm vào giỏ hàng
router.get('/', cartController.getCart); // lấy giỏ hàng

router.get('/delete/:id', cartController.deleteCart); // xóa sản phẩm khỏi giỏ hàng
router.get('/update/:id/:quantity', cartController.updateCart); // cập nhật sản phẩm trong giỏ hàng

router.get('/checkout', cartController.checkout); // tới trang thanh toán
router.post('/checkout', cartController.checkoutPost); // lưu 

router.get('/checkout/success/:id', cartController.checkoutSuccess)
module.exports = router;