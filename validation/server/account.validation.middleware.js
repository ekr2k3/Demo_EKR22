//accounts.validation.js
//model account
var Account = require('../../models/accounts.model');
module.exports.postCreateAccounts = async (req, res, next) => {
    if (!req.body.fullname) {
        req.flash('error', 'Title is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'password is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'email is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    // Kiểm tra email này đã được sử dụng trước đó chưa
    var account = await Account.findOne
    ({
        email: req.body.email
    });
    if (account) {
        req.flash('error', 'email đã được sử dụng trước đó');
        res.redirect('/admin/accounts/create');
        return;
    }
    if (!req.body.status) {
        req.flash('error', 'Status is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    if (!req.files.avata) {
        req.flash('error', 'Thumbnail is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    if (!req.body.phone) {
        req.flash('error', 'phone is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    if (!req.body.role_id) {
        req.flash('error', 'Roles is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    next();
}

module.exports.patchEditAccounts = async (req, res, next) => {
    if (!req.body.fullname) {
        req.flash('error', 'Title is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    // if (!req.body.password) {     // Mật khẩu mới không bắt buộc
    //     req.flash('error', 'password is required');
    //     res.redirect('/admin/accounts/create');
    //     return;
    // }
    if (!req.body.email) {
        req.flash('error', 'email is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    // // Kiểm tra email này đã được sử dụng trước đó chưa    //email có thể không cần đổi
    // var account = await Account.findOne
    // ({
    //     email: req.body.email
    // });
    // if (account) {
    //     req.flash('error', 'email đã được sử dụng trước đó');
    //     res.redirect('/admin/accounts/create');
    //     return;
    // }
    if (!req.body.status) {
        req.flash('error', 'Status is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    // if (!req.files.avata) {          // Có thể không cần cập nhật ảnh mới
    //     req.flash('error', 'Thumbnail is required');
    //     res.redirect('/admin/accounts/create');
    //     return;
    // }
    if (!req.body.phone) {
        req.flash('error', 'phone is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    if (!req.body.role_id) {
        req.flash('error', 'Roles is required');
        res.redirect('/admin/accounts/create');
        return;
    }
    next();
}