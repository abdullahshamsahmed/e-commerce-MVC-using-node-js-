//DECLARATION
var express  		= require('express');
var login 			= require('./controllers/login');
var home 			= require('./controllers/home');
var logout 			= require('./controllers/logout');
var ustart          =require('./controllers/user/ustart');
var cart            =require('./controllers/user/cart');
var registration    =require('./controllers/user/registration');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var app 			= express();


//CONFIGURATION
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('view engine', 'ejs');

//MIDDLEWARES

app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use ('/ustart',ustart);
app.use ('/cart',cart);
app.use('/registration',registration);
app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);
app.use('/assets', express.static('ext'))//?

//ROUTES
app.get('/', (req, res)=> res.render('start'));
/*app.get('/registration', (req, res)=> res.render('registration'));*/


//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});

