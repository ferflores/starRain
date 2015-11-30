var routingConfiguration = {
	configure: function(app, passport){
		this.configureApp(app, passport);
		this.configureRoutes(app, passport);
	},

	configureRoutes: function(app, passport){
		app.get('*',function(req, res, next){
		  if (req.url === '/' || req.url === '/login') return next();

		  if(!req.user){
		    res.redirect('/login');
		  }else{
		    next();
		  }

		});

		app.get('/project/:project', function (req, res) {
		    res.render('index', {project: req.params.project});
		});

		app.get('/index', function (req, res) {
		    res.render('index');
		});

		app.get('/login', function (req, res){
			res.render('login');
		});

		app.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect:'/index'}));
	},

	configureApp:function(app, passport){
		var express = require('express');

		var bodyParser = require('body-parser');
		var path = require('path');
		var session = require('express-session');
		var cookieParser = require('cookie-parser');

		app.use(express.static('public'), {maxAge:0});
		app.set('view engine', 'jade');
		app.set('views', path.join(__dirname, '../..', 'client/views'));
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
	}
}

module.exports = routingConfiguration;