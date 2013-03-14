var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var loginSchema = new Schema({
	uid: String
});

var Login = mongoose.model('Login', loginSchema);

exports.model = Login;