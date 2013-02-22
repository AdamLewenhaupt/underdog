var mongoose = require('mongoose'),
	models 	 = require('./models');

exports.connect = function connect(){
	return mongoose.createConnection('mongodb://main:access@linus.mongohq.com:10026/underdog-main');
}

exports.get = function get(req, res){
	var type = req.params.type,
		id = req.params.id;

		if(!models[type]){
			res.send({ error: "invalid type" });
			return;
		}

		models[type].get(id, function(retval){
			res.send(retval);
		});
};

exports.post = function post(req, res){
	var type = req.params.type,
		data = req.body;

	if(!models[type]){
		res.send({ error: "invalid type" });
		return;
	}

	models[type].post(data, function(retval){
		res.send(retval);
	});
};