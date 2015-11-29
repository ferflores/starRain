var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

var clientComm = require('./modules/clientComm');
var routingConfig = require('./modules/routing-config');
var authConfig = require('./modules/auth-config');

app.use(express.static('public'));
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '..', 'client/views'));
app.use(session({
  secret: 'horney star',
  name:'starRain',
  resave:true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(passport.session());
app.use(flash());

routingConfig.configure(app, passport);
authConfig.configure(passport);

app.post('/api/:project/:result', function(req, res){
  clientComm.processRequest(req.params.project, req.params.result);
  res.send('ok');
});

var port = process.env.PORT || 8080;
server.listen(port);
clientComm.init(server);

console.log("Listening on port: " + port + " :)");
