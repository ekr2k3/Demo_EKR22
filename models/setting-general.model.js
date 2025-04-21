//setting-general.model.js
var mongoose = require('mongoose');


var schemaSetting_general = new mongoose.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    address: String,
    nocopyRight: String
});

module.exports = mongoose.model("setting-generals", schemaSetting_general);