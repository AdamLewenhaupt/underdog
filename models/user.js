var mongoose = require('mongoose'),
	PasswordHash = require('phpass').PasswordHash,
	Schema = mongoose.Schema;

var passHash = new PasswordHash();

var userSchema = new Schema({
	name: String,
	password: String
});

userSchema.pre('save', function(next){

	if(this.isModified('name')){
		this.name = this.name.toLowerCase();
	}

	if(!this.isModified('password')) return next();

	var hash = passHash.hashPassword(this.password);

	this.password = hash;

	next();

});

userSchema.methods.verify = function(password, cb){
	cb(passHash.checkPassword(password, this.password));
};

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