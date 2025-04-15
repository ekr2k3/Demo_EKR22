//auth [validation] middleware

//model account
//md5
var md5 = require('md5');
var Account = require('../../models/accounts.model');
var Roles = require('../../models/roles.model');
module.exports.postLogin = async (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'email is required');
        res.redirect('/admin/auth/login');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'password is required');
        res.redirect('/admin/auth/login');
        return;
    }
    var emailBody = req.body.email;
    var passwordBody = req.body.password;
    var dataEmail = await Account.findOne({
        email: emailBody
    })
    if(!dataEmail){
        req.flash('error', 'email không tồn tại');
        res.redirect('/admin/auth/login');
        return;
    }
    if(dataEmail){ // nếu có email kiểm tra mật khẩu
        if(md5(passwordBody) != dataEmail.password){
            req.flash('error', 'sai mật khẩu');
            res.redirect('/admin/auth/login');
            return;
        }
    }
    if(dataEmail){ // nếu có email kiểm tra status
        if(dataEmail.status == "inactive"){
            req.flash('error', 'tài khoản đã bị khóa');
            res.redirect('/admin/auth/login');
            return;
        }
    }
    next();
}

module.exports.checkLogin = async (req, res, next) => {
    var token = req.cookies.Token; // Chú ý chính tả khi đặt tên biến ở controller là Token
    //==> ở đây là Token không phải token viết thường
    if (!token) {
        res.redirect('/admin/auth/login');
        return;
    }
    var dataToken = await Account.findOne({
        deleted: false,
        status: 'active',
        token: token
    })
    if (!dataToken) { //nếu không có token thì quay về trang login (tức người dùng bật F12 để 
        // thêm token giả)
        res.redirect('/admin/auth/login');
        return;
    }
    res.locals.user = dataToken; // dataToken là record của account
    res.locals.role = await Roles.findOne({
        deleted: false,
        _id: dataToken.role_id
    }); // lấy ra bản ghi role của user thông qua thang chiếu role trong account(dataToken.role)
    console.log(res.locals.role); // in ra để kiểm tra xem có đúng không
    next();
}