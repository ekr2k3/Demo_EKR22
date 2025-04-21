//sumaryRouter.js
var routerHome = require('./client/home/homeRouter');
var routerProduct = require('./client/product/productRouter');
var routerDashBoardServer = require('./server/dashBoardRouter');
var routerProductServer = require('./server/productRouter');
var routerTypeServer = require('./server/type.router.js');
var routerRolesServer = require('./server/roles.router.js');
var routerAccountServer = require('./server/accounts.router.js');
var routerAuth = require('./server/auth.router.js');
var routerCartClient = require('./client/cart/cart.router.js');
var middlewareAuth = require('../validation/server/auth.validation.middleware.js')

var middlewareGetAllType = require('../middleware/dataDanhMuc.js');
console.log('at sumaryRouter.js-'+process.env.A + process.env.B);
var prefix = '/admin';

var middlewareCart = require('../middleware/cart.middleware.js');

var routerUser = require('./client/user/user.router.js')
var middlewareUser = require('../middleware/user.middleware.js');
var routerAdminSetting = require('../routers/server/setting.router.js');
var middlewareSetting = require('../middleware/setting.middleware.js')
module.exports = (app)=>{
    app.use(middlewareSetting)
    app.use(middlewareUser);
    app.use('/',middlewareCart); 
    app.locals.PREFIX_SERVER = prefix;
    app.use(middlewareGetAllType.getAllType);
    app.use('/home', routerHome);
    app.use('/product', routerProduct);
    app.use(prefix + '/dashboard', middlewareAuth.checkLogin, routerDashBoardServer);
    app.use(prefix + '/product', middlewareAuth.checkLogin, routerProductServer);
    app.use(prefix + '/type', middlewareAuth.checkLogin, routerTypeServer);
    app.use(prefix + '/role', middlewareAuth.checkLogin, routerRolesServer);
    app.use(prefix + '/accounts', middlewareAuth.checkLogin, routerAccountServer);
    app.use(prefix + '/auth', routerAuth);
    app.use('/cart', routerCartClient);
    app.use('/user', routerUser);
    app.use(prefix + '/setting', middlewareAuth.checkLogin, routerAdminSetting);
    app.get("*", (req, res)=>{
        res.render('./404/404.pug')
    })
}