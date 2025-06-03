// middleware.validation.user.js [client]
var modelUser = require('../../models/user.model')
module.exports.registerPost = async (req, res, next) => {
    if (req.body.password.length < 8) {
        req.flash("error", "Mật khẩu phải có độ dài >=8");
        res.redirect("back");
        return;
    }
    // kiểm tra email đã được dùng
    var user = await modelUser.find({
        email: req.body.email
    })
    if (user.length > 0) {
        req.flash("error", "Tài khoản đã được dùng");
        res.redirect("back");
        return;
    }
    next();
}

module.exports.loginPost = async (req, res, next) => {
    // thổng tin tài khoản
    var user = await modelUser.find({
        email: req.body.email
    })
    // kiểm tra email tồn tại trước rồi mới tới mật khẩu để tránh bị lỗi
    if (user.length == 0) {
        req.flash("error", "Tài khoản không tồn tại");
        res.redirect("back");
        return;
    }
    if (req.body.password != user[0].password) {
        req.flash("error", "Mật khẩu không đúng");
        res.redirect("back");
        return;
    }


    next();
}

module.exports.forgotPost = async (req, res, next) => {
    // Kiểm tra xem email này có tồn tại hay không
    // Tức đã từng có email x được dùng để tạo tài khoản
    // thổng tin tài khoản
    var user = await modelUser.find({
        email: req.body.email
    })

    if (user.length == 0) {
        req.flash("error", "Tài khoản không tồn tại");
        res.redirect("back");
        return;
    }
    next();
}

var modelOtp = require('../../models/otp.model')
module.exports.otpPost = async (req, res, next) => {
    // tìm bản ghi otp của email
    var otp = await modelOtp.find({
        email: req.body.email
    })
    console.log("hi" + req.body.otp + "   " + otp[otp.length - 1].otp)
    // otp hết hạn chưa
    if (otp.length == 0) {
        req.flash("error", "Otp hết hạn");
        res.redirect("back");
        return;
    }
    // otp có đúng không
    // có thể có nhiều otp cho 1 email trong 3 phút do người dùng spam sai cách
    // Ta chỉ coi otp gân nhất là đúng
    // otp xa hơn coi là otp cũ
    for (var i = 0; i < otp.length - 1; i++) {
        if (req.body.otp == otp[i].otp) {
            req.flash("error", "Otp quá hạn vui lòng nhập otp mới nhất");
            res.redirect("back");
            return;
        }
    }
    if (req.body.otp != otp[otp.length - 1].otp) {
        req.flash("error", "Otp bị sai");
        res.redirect("back");
        return;
    }

    // chú ý thứ tự các câu if đầu tiên if cho Có otp nào không tiếp theo if cho các OTP cũ
    // if cuối mới là kiểm tra đúng sai OTP mới nhất
    next();
}

module.exports.resetPost = async (req, res, next) => {
    if (req.body.password.length < 8) {
        req.flash("error", "Mật khẩu phải có độ dài >=8");
        res.redirect("back");
        return;
    }
    next();
}