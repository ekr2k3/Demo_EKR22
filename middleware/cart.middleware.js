//cart.middleware.js

var modelCart = require('../models/cart.model');
module.exports = async function (req, res, next) {
    console.log('middleware cart');

    // kiểm tra xem đã có cart_id trong cookies chưa
    if (!req.cookies.cart_id) {
        var cart = new modelCart(); // tạo mới cart
        await cart.save(); // lưu cart vào db

        //timeCookies
        var timeCookies = 365 * 24 * 60 * 60 * 1000; // 1 năm (ms)
        // lưu cart_id vào cookies
        res.cookie('cart_id', cart._id, {
            maxAge: timeCookies, // thời gian sống của cookie (ms)
        });
        console.log('tao cart_id moi: ' + req.cookies.cart_id);
        next(); // gọi next() để tiếp tục xử lý request
    }
    else{
        // Lấy danh sách sản phẩm trong giỏ hàng từ db (tức arr poducts)
        // ở mỗi element cộng dồn quantity lại với nhau
        var cart = await modelCart.findById(req.cookies.cart_id); // tìm giỏ hàng theo id
        var arr_product = cart.products; // lấy mảng sản phẩm trong giỏ hàng
        var totalQuantity = 0; // biến tổng số lượng sản phẩm trong giỏ hàng
        for (var i = 0; i < arr_product.length; i++) {
            totalQuantity += Number(arr_product[i].quantity); // cộng dồn số lượng sản phẩm
        }
        res.locals.totalQuantity = totalQuantity; // lưu tổng số lượng sản phẩm vào res.locals để sử dụng trong view
        next();
    }
}