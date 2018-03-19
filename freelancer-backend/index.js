var express = require('express');
var routes = require('./app/routes');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var busboyBodyParser = require('busboy-body-parser');
var path = require('path');


//Authentication
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);

var app = express();
app.set('port', 8900);

app.use('/static', express.static('./public'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(busboyBodyParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Methods","HEAD, GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
  res.header("Content-Type", "application/json");
  next();
});

// app.use('/', express.static(path.join(__dirname, 'publicHTML')));

app.use(cookieParser());

var options = {
  connectionLimit : 100,
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'usersignup'
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'ameytotawar',
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  cookie : {
    secure: false,
    maxAge : 900000,
    path: '/',
    httpOnly: false
  }
  //cookie: { secure: false }
}));

// app.use(passport.initialize());
// app.use(passport.session());

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.post('/', (req, res) => {
  console.log("req" + req.isAuthenticated());
  res.send();
}); 

app.use('/', routes);

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Server running at http://127.0.0.1:' + port);
});