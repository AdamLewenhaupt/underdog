var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	password: String
});

function pub(user){
	return {
		  id: 	user._id
		, name: user.name
	}
}

var User = mongoose.model('User', userSchema);

exports.model = User;

exports.post = function(data, fn){
	if(data){
		var posting = new User(data);
		posting.save(function(err){
			if(err) fn({ error: err });
			else fn(pub(posting));
		});

	} else {
		fn({ error: "no data" });
	}
}