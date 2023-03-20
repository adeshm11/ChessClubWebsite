var express = require('express');
var app = express();
var session = require('express-session');

app.use(session({
    secret: 'this-is-a-secret',
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

var home = require('./routes/indexNav.js');
app.use('/', home);

var newConnection = require('./routes/newConnectionNav.js');
app.use('/newConnection', newConnection);

var connections = require('./routes/connectionNav.js');
app.use('/connections', connections);

var savedConnections = require('./routes/savedConnectionsNav.js');
app.use('/savedConnections', savedConnections);

var about = require('./routes/aboutNav.js');
app.use('/about', about);

var contact = require('./routes/contactNav.js');
app.use('/contact', contact);

var signup = require('./routes/signupNav.js');
app.use('/signup', signup);

var UserController = require('./routes/UserController.js');
app.use('/user', UserController);

//Adding wildcard route to handle URLs which may have random text after /
app.use('/*', home);


app.listen(3000);