//cart.model.js
var mongoose = require('mongoose');
ob = {
    user_id: String,
    products : [
        {
            pro_id: String,
            quantity: Number
        }
    ]
};
var sChema = mongoose.Schema; // trỏ tới constructor schema
var schemaCart = new sChema(ob)
module.exports = mongoose.model('carts', schemaCart);