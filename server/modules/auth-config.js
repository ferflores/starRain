var configureAuth = {
	configure: function(passport){
		var LocalStrategy = require('passport-local').Strategy;
		
		passport.use(new LocalStrategy(
		    function(username, password, done) {
		    	if(process.env.NODE_ENV === 'development'){
		    		return done(null, { id: 1, username: username});
		    	}else{
		    		if(username === process.env.username
		    			&& password === process.env.password){

		    			return done(null, {id:1, username: username});
		    		}else{
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

	}
};

module.exports = configureAuth;