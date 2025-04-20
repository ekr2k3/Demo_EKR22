//checkout.model.js
var mongoose = require('mongoose');
ob = {
    user_info: {
        name: String,
        phone: String,
        address: String
    },
    products : [
        {
            pro_id: String,
            quantity: Number,
        }
    ],
    cart_id: String, // thêm trường cart_id để lưu trữ id của giỏ hàng
};
var sChema = mongoose.Schema; // trỏ tới constructor schema
var schemaOrder = new sChema(ob)
module.exports = mongoose.model('checkouts', schemaOrder);