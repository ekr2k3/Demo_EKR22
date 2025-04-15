// auth [controller]
//model account
const md5 = require("md5");
var accModel = require("../../models/accounts.model")

module.exports.getLogin = async function (req, res) {
    res.render('./server/pages/auth/login.pug');
}

module.exports.postLogin = async (req, res) => {
    var Acc = await accModel.findOne({
        email: req.body.email,
        deleted: false,
        password: md5(req.body.password),
        status: "active"
    })
    res.cookie("Token", Acc.token)
    res.redirect('/admin/dashboard');
}

module.exports.getLogout = async function (req, res) {
    res.clearCookie("Token")
    res.redirect('/admin/auth/login');
}