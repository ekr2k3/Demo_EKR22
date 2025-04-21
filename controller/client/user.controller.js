// user.controller.js [client]
module.exports.registerGet = async (req, res) => {
    res.render('./client/pages/user/register.pug')
}

var modelUser = require('../../models/user.model');

module.exports.registerPost = async (req, res) => {
    /*
    Tạo ra user
    Lưu token user đã tạo vào cookies (vì khi đăng ký thành công
        coi như đã đăng nhập vào luôn thay vì bắt họ đăng nhập lại 
        <Nếu ở đâu không lưu thì ở lúc đăng nhập vẫn phải lưu thôi
        --> ở đây không lưu cũng được >)
     */
    // dùng thêm md5 để mã hóa nếu thích nhưng tôi sẽ bỏ qua
    // req.body.password = md5(req.body.password)
    var userDocument = new modelUser(req.body);
    console.log(userDocument); // kiêm tra thử

    res.cookie("token_client", userDocument.token_client);
    await userDocument.save();
    res.redirect("/home")
}

module.exports.loginGet = async (req, res) => {
    res.render('./client/pages/user/login.pug')
}

module.exports.loginPost = async (req, res) => {
    // Khi đăng nhập chỉ cần đưa cái token vào cookies là được
    var userDocument = await modelUser.find({
        email: req.body.email
    }); // trả ra 1 mảng
    console.log(userDocument[0]);
    res.cookie("token_client", userDocument[0].token_client);
    res.redirect("/home")
}

module.exports.logout = async (req, res) => {
    res.clearCookie('token_client');
    res.redirect("/home")
}

module.exports.forgotGet = (req, res) => {
    res.render('./client/pages/user/forgot.pug')
}
var otpModel = require('../../models/otp.model')
var Email = require('../../sendToEmail');
module.exports.forgotPost = async (req, res) => {
    // Việc số 1: Tạo OTP và lưu vào database
    var data = {
        email: req.body.email,
        // otp không cần vì nó được tạo tự động = default
        expireAt: Date.now()
    }
    var documentOtp = new otpModel(data);
    await documentOtp.save();
    // Việc số 2: Gửi OTP vừa tạo vào email của người dùng
    await Email.sendEmail(req.body.email, "Otp khôi phục mật khẩu", documentOtp.otp)
    // Việc số 3: Tới trang nhập OTP
    res.redirect("/user/password/otp?email=" + req.body.email)
}


module.exports.otpGet = (req, res) => {
    res.render('./client/pages/user/otp.pug', {
        email: req.query.email
    })
}


module.exports.otpPost = async (req, res) => {
    // sau khi otp được xác nhận đúng ở middleware 
    // coi như đâu là chủ nhân tài khoản do otp đã đúng --> set cookies vào web
    // controller chỉ cần chuyển hướng tới trang reset mật khẩu

    var userDocument = await modelUser.find({
        email: req.body.email
    }); // trả ra 1 mảng
    console.log(userDocument[0]);
    res.cookie("token_client", userDocument[0].token_client);
    res.redirect("/user/password/reset?email=" + req.body.email)
}

module.exports.resetGet = (req, res) => {
    res.render('./client/pages/user/reset.pug')
}

module.exports.resetPost = async (req, res) => {
    // Tìm bản ghi user
    var user = await modelUser.find({
        token_client: req.cookies.token_client
    }) // trả ra 1 mảng
    console.log(user[0].password);
    // cập nhập lại mật khẩu
    user[0].password = req.body.password;
    await user[0].save();
    res.redirect('/home')
}

module.exports.info = async (req, res) => {
    // Tìm bản ghi user
    var user = await modelUser.find({
        token_client: req.cookies.token_client
    }) // trả ra 1 mảng
    res.render('./client/pages/user/info.pug',{
        userInfo : user[0]
    })
}
