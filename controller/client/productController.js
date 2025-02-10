// productController.js
var modelPhone = require('../../models/itemPhone.js');
module.exports.productGet = async (req,res)=>{
    var condition = {}
    var DATA = await modelPhone.find(condition);
    console.log(DATA); // Kiểm tra thử bằng các in ra
    res.render('client/pages/product/index.pug',{
        toPug : DATA
    });
};
