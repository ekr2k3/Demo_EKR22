// homeController.js
var modelPhone = require('../../models/itemPhone.js');
module.exports.homeGet = async (req,res)=>{
    var condition1 = {
        deleted: false,
        outstanding: true
    }
    var dataOutstanding = await modelPhone.find(condition1).limit(3);
    console.log(dataOutstanding);
    var condition2 = {
        deleted: false,
    }
    var datanew = await modelPhone.find(condition2).sort({ createdAt: -1 }).limit(4);
    //-1 là giảm; 1 là tăng
    res.render('client/pages/home/index.pug',{
        dataOutstanding: dataOutstanding,
        datanew: datanew
    });
}


