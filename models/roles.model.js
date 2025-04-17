//roles.model.js
var mongoose = require('mongoose');
ob =   {
    "title": String,
    "description": String,
    "permission": {
        type: Array,
        default: []
    },
    "deleted": {
        type: Boolean,
        default: false
    }
  };
var sChema = mongoose.Schema; // trỏ tới constructor schema
var schemeRole = new sChema(ob)
module.exports = mongoose.model('roles', schemeRole);