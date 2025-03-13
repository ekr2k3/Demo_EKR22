//types.model.js
/*
    mongoose tuân theo module caching 
    --> cái require ở file này chỉ là trỏ tới vùng
    cache menory của mongoose
    --> Đã có đoạn connect mongoose trước đó rồi
    --> Ở đây không cần đoạn connect mongoose nữa
*/
var mongoose = require('mongoose');
ob = {
    name: String,
    description: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    parent_id: String,
    position: Number,
    thumbnail: String
}
var Schema = mongoose.Schema;
var typesSchema = new Schema(ob);
var typesModel = mongoose.model('types', typesSchema);
module.exports = typesModel;
