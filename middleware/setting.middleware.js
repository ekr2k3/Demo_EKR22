//setting.middleware

var Setting_genModel = require("../models/setting-general.model");

module.exports = async (req, res, next) => {
    var setting = await Setting_genModel.find({})
    if(setting.length > 0 ){
        res.locals.setting = setting[0]; 
    }
    console.log(setting);
    // Chú ý nếu chỉ if(setting) nó trả 1 mảng rỗng mã if([]) vẫn coi là true
    next();
}