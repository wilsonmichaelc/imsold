// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8080;

var passport = require('passport');
var flash    = require('connect-flash');
<<<<<<< HEAD
=======
var userManagement = require('./app/userManagement');
>>>>>>> 05f0b5073a0113da7cb757cf6bddd982c8245345

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

<<<<<<< HEAD
=======


>>>>>>> 05f0b5073a0113da7cb757cf6bddd982c8245345
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static('public'));
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
<<<<<<< HEAD
require('./app/api.js')(app, passport);
=======
>>>>>>> 05f0b5073a0113da7cb757cf6bddd982c8245345

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
