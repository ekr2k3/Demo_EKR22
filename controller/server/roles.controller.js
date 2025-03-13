// roles.controller.js
// model
const { json } = require('express');
var Roles_model = require('../../models/roles.model.js');

module.exports.roleGet = async (req, res) => {
    var condition = { deleted: false };
    var roles = await Roles_model.find(condition);
    res.render('./server/pages/roles/index.pug', {
        DataRoles: roles
    });
}

module.exports.roleCreateGet = async (req, res) => {
    res.render('./server/pages/roles/create.pug');
}

module.exports.roleCreatePost = async (req, res) => {
    var role = new Roles_model(req.body);
    await role.save();
    res.redirect('/admin/role');
}

module.exports.roleEditGet = async (req, res) => {
    var id = req.query.id;
    var role = await Roles_model.findOne({
        id: id
    });
    console.log(role);
    res.render('./server/pages/roles/edit.pug', {
        DataRole: role
    });
}

module.exports.roleEditPatch = async (req, res) => {
    var id = req.query.id;
    await Roles_model.updateOne({
        id: id
    }, req.body);
    res.redirect('/admin/role');
}

module.exports.rolePermissonGet = async (req, res) => {
    var data = await Roles_model.find({
        deleted: false
    });
    res.render('./server/pages/roles/permission.pug', {
        roles: data
    });
}

module.exports.rolePermissonPatch = async (req, res) => {
    data = JSON.parse(req.body.ok);
    // Xoát các role không có trong data
    var roles = await Roles_model.find({
        deleted: false
    });
    for (var i = 0; i < roles.length; i++) {
        var check = false;
        for (var j = 0; j < data.length; j++) {
            if (roles[i].id == data[j].x) {
                check = true;
                break;
            }
        }
        // Nếu không có trong data tương đương role đó mất hết quyền
        // thì set permission = []
        if (!check) {
            await Roles_model.updateOne({
                _id: roles[i]._id
            }, {
                $set: {
                    permission: []
                }
            });
        }
    }
    for (var i = 0; i < data.length; i++) { //chú ý dùng let thay cho var khi có bất đồng bộ
        //tuy nhiên nếu có await thì dùng var cũng được
        await Roles_model.updateOne(
            {_id: data[i].x},
            {
                $set: {permission: data[i].permission}
            }
        );
    }
    res.redirect('/admin/role');
}