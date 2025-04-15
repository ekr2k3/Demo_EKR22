//dataDanhMuc.js
var modelType = require('../models/types.model');

module.exports.getAllType = async (req, res, next) => {
    try {
        var condition = {
            deleted: false
        };
        var result = await modelType.find(condition);
        
        res.locals ={
            data: result
        }
        next();
    } catch (error) {
        res.render('error', { error: error });
    }
}