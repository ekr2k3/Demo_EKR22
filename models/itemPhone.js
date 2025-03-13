//itemPhone.js
var mongoose = require('mongoose');
ob =   {
    "title": String,
    "description": String,
    "price": Number,
    "discountPercentage": Number,
    "stock": Number,
    "thumbnail": String,
    "status": String,
    "position": Number,
    "deleted": {
        type: Boolean,
        default: false
    },
    "Thuoc_danh_muc": String
  };
var schema = mongoose.Schema; // trỏ tới constructor schema
var schemePhone = new schema(ob)
module.exports = mongoose.model('items', schemePhone);
