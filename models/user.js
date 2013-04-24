var mongoose = require('mongoose'),
	PasswordHash = require('phpass').PasswordHash,
	Schema = mongoose.Schema;

var passHash = new PasswordHash();

var userSchema = new Schema({
	name: { type: String, unique: true, trim: true, lowercase: true },
	communities: [String],
	joindate: Date,
	password: String,
	logins: { type: Number, default: 0 },
	lastlogin: { type: Date, default: Date.now }
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
		, communities: user.communities
	}
}

var User = mongoose.model('User', userSchema);

exports.model = User;

exports.post = function(data, fn){
	if(data){
		var posting = new User(data);
		posting.joindate = new Date();
		posting.save(function(err){
			if(err) fn({ error: err });
			else fn(pub(posting));
		});

	} else {
		fn({ error: "no data" });
	}
}

exports.put = function(id, data, fn) {
	if(id && data){

		User.findById(id, function (err, putting){

			if(err) fn({ error: err });
			else {
				for(var x in data)
					putting[x] = data[x];
				putting.save(function (err){
					if(err) fn({ error: err });
					else fn(pub(putting));
				});
			}
		});

	} else {
		fn({ error: "no data" });
	}
}