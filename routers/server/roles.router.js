//roles.router.js
var ex = require('express');
var router = ex.Router();
var controllerRoles = require('../../controller/server/roles.controller.js');
var validateMiddlwareRoles = require('../../validation/server/role.validation.middleware.js');

router.get('/', controllerRoles.roleGet);

router.get('/create', controllerRoles.roleCreateGet);
router.post('/create', controllerRoles.roleCreatePost);

router.get('/edit/:id', controllerRoles.roleEditGet);
router.patch('/edit/:id', controllerRoles.roleEditPatch);

router.get('/permisson', controllerRoles.rolePermissonGet);
router.patch('/permission', controllerRoles.rolePermissonPatch);
module.exports = router;