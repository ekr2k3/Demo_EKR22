//auth.router.js
var express = require('express');
var router = express.Router();
var controllerAuth = require('../../controller/server/auth.controller');
var validateAuth = require('../../validation/server/auth.validation.middleware');

router.get('/login', controllerAuth.getLogin);
router.post('/login', validateAuth.postLogin, controllerAuth.postLogin);

router.get('/logout', controllerAuth.getLogout);
module.exports = router;