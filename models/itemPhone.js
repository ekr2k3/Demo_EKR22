//itemPhone.js
var mongoose = require('mongoose');
ob = {
    "outstanding": Boolean,
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
    "Thuoc_danh_muc": String,
    create: {
        create_by: String,
        create_at: {
            type: Date,
            default: Date.now
        }
    },
    delete: {
        delete_by: String,
        delete_at: Date
    },
    edit: [{
        edit_by: String,
        edit_at: Date
    }]
};
var schema = mongoose.Schema; // trỏ tới constructor schema
var schemePhone = new schema(ob)
module.exports = mongoose.model('items', schemePhone);
