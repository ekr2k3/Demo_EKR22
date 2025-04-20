//user.middleware

var userModel = require("../models/user.model");

module.exports = async (req, res, next) => {
    var user = await userModel.find({
        token_client: req.cookies.token_client
    })
    if(user.length > 0 ){
        res.locals.user = user; 
    }
    console.log(user);
    // Chú ý nếu chỉ if(user) nó trả 1 mảng rỗng mã if([]) vẫn coi là true
    next();
}