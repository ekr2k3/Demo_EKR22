//user.js [Client]
var userController = require('../../../controller/client/user.controller');
var userValidate = require('../../../validation/client/middleware.validation.user');
var ex = require('express');
var router = ex.Router();

router.get('/register', userController.registerGet);
router.post('/register', userValidate.registerPost, userController.registerPost);
router.get('/login', userController.loginGet);
router.post('/login', userValidate.loginPost, userController.loginPost);

router.get('/logout', userController.logout);
router.get('/password/forgot', userController.forgotGet);

router.post('/password/forgot', userValidate.forgotPost, userController.forgotPost);

router.get('/password/otp', userController.otpGet);

router.post('/password/otp', userValidate.otpPost, userController.otpPost);
router.get('/password/reset', userController.resetGet)
router.post('/password/reset', userValidate.resetPost, userController.resetPost);
module.exports = router;