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
        // nếu có thì gọi next() để tiếp tục xử lý request
        next();
    }
}