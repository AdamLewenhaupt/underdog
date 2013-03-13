var passport = require('passport'),
	persistent = require('../persistant'),
	local = require('passport-local');

passport.use(new local.Strategy(function (name, pass, done){

	persistent.access("user").findOne({ name: name, password: pass }, function (err, user){
		done(err, user);
	});

}));

passport.serializeUser(function (user, done){
	done(null, user.id);
});

passport.deserializeUser(function (id, done){
	persistent.access("user").findById(id, function (err, user){
		done(err, user);
	});
});

exports.use = function(app){
	app.use(passport.initialize());
	app.use(passport.session());
};

exports.route = function (app){
	app.post("/login", passport.authenticate('local'), function (req, res){
		res.send({ success: true });
	});
}