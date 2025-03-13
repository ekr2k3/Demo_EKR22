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
var schema = mongoose.Schema; // trỏ tới constructor schema
var schemeRole = new schema(ob)
module.exports = mongoose.model('roles', schemeRole);