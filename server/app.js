var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

var clientComm = require('./modules/clientComm');

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

app.use(express.static('public'));

passport.use(new LocalStrategy(
    function(username, password, done) {
    	if(process.env.NODE_ENV === 'development'){
    		return done(null, { id: 1, username: username});
    	}else{
    		if(username === process.env.username
    			&& password === process.env.password){

    			return done(null, {id:1, username: username});
    		}else{
          console.log("neeel!");
    			return done(false);
    		}
    	}
    }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

app.get('/project/:project', function (req, res) {
  if(req.user){
    res.render('index', {project: req.params.project});
  }else{
    res.redirect('/login');
  }
});

app.get('/login', function (req, res){
	res.render('login');
});

app.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect:'/index'}));

app.post('/api/:project/:result', function(req, res){
	clientComm.processRequest(req.params.project, req.params.result);
	res.send('ok');
});

var port = process.env.PORT || 8080;
server.listen(port);
clientComm.init(server);

console.log("Listening on port: " + port + " :)");
