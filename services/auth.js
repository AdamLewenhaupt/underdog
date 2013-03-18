var passport = require('passport'),
	persistent = require('../persistant'),
	local = require('passport-local');

passport.use(new local.Strategy(function (name, pass, done){

	persistent.access("user").findOne({ name: name, password: pass }, function (err, user){
		done(err, user);
	});

}));

exports.use = function(app){
	app.use(passport.initialize());
};

authenticate = function(req, res) {

	if(req.body.id){
		persistent.access("login").findById(req.body.id, function (err, login){

			if(err) res.send({error: "Corrupt login id"});
			else {
				persistent.access("user").findById(login.uid, function (err, user){
					if(err) res.send({error: "Corrupt user id"});
					else {
						res.send({ auth: true, user: user.name });
					}
				});
			}
		});

	} else if(req.body.username && req.body.password) {

		persistent.access("user").findOne({ name: req.body.username, password: req.body.password }, function (err, user){

			if(err) res.send({error: err});
			else {
				var login = new persistent.access("login")({ uid: user._id });

				login.save(function (err){
					if(err) res.send({error: err});
					else {
						res.send({ auth: true, assigned: login._id, user: user.name });
					}
				});
			}
		});
	} else {
		res.send({error: "No body data"});
	}
}

exports.route = function (app){
	app.post("/login", authenticate);
}