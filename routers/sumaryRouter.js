//sumaryRouter.js
var routerHome = require('./client/home/homeRouter');
var routerProduct = require('./client/product/productRouter');
var routerDashBoardServer = require('./server/dashBoardRouter');
var routerProductServer = require('./server/productRouter');
var routerTypeServer = require('./server/type.router.js');
var routerRolesServer = require('./server/roles.router.js');
var routerAccountServer = require('./server/accounts.router.js');
var routerAuth = require('./server/auth.router.js');
var middlewareAuth = require('../validation/server/auth.validation.middleware.js')

var middlewareGetAllType = require('../middleware/dataDanhMuc.js');
console.log('at sumaryRouter.js-'+process.env.A + process.env.B);
var prefix = '/admin';
module.exports = (app)=>{
    app.locals.PREFIX_SERVER = prefix;
    app.use('/home', middlewareGetAllType.getAllType, routerHome);
    app.use('/product', middlewareGetAllType.getAllType, routerProduct);
    app.use(prefix + '/dashboard', middlewareAuth.checkLogin, routerDashBoardServer);
    app.use(prefix + '/product', middlewareAuth.checkLogin, routerProductServer);
    app.use(prefix + '/type', middlewareAuth.checkLogin, routerTypeServer);
    app.use(prefix + '/role', middlewareAuth.checkLogin, routerRolesServer);
    app.use(prefix + '/accounts', middlewareAuth.checkLogin, routerAccountServer);
    app.use(prefix + '/auth', routerAuth);
}