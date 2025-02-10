//sumaryRouter.js
var routerHome = require('./client/home/homeRouter');
var routerProduct = require('./client/product/productRouter');
var routerDashBoardServer = require('./server/dashBoardRouter');
var routerProductServer = require('./server/productRouter');
console.log('at sumaryRouter.js-'+process.env.A + process.env.B);
var prefix = '/admin';
module.exports = (app)=>{
    app.locals.PREFIX_SERVER = prefix;
    app.use('/home',routerHome);
    app.use('/product',routerProduct);
    app.use(prefix + '/dashboard', routerDashBoardServer);
    app.use(prefix + '/product', routerProductServer);
}