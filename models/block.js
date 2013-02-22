var mongoose = require('mongoose'),
	Schema 	 = mongoose.Schema;

var blockSchema = new Schema({
		name: String,
		color: String,
		width: Number,
		Height: Number,
		left: Number,
		top: Number
	});

var Block = mongoose.model('Block', blockSchema);

exports.get = function(id, fn){
	if(id){
		Block.findById(id, function(err, block){
			if(err) fn({ error: err });
			else fn(block);
		});
	} else {
		fn({ error: "no id" });
	}
}

exports.post = function(data, fn){
	if(data){

		var posting = new Block(data);
		posting.save(function(err){
			if(err) fn({ error: err });
			else fn({});
		});

	} else {
		fn({ error: "no id" });
	}
}