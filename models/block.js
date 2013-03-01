var mongoose = require('mongoose'),
	Schema 	 = mongoose.Schema;

var blockSchema = new Schema({
		name: String,
		color: String,
		width: Number,
		height: Number,
		left: Number,
		top: Number
	});

function pub(block){
	return {
		id: block._id,
		color: block.color,
		width: block.width,
		height: block.height,
		left: block.left,
		top: block.top,
		name: block.name
	}
}

var Block = mongoose.model('Block', blockSchema);

exports.get = function(id, fn){
	if(id){
		Block.findById(id, function(err, block){
			if(err) fn({ error: err });
			else fn(pub(block));
		});
	} else {
		Block.find({}, function(err, blocks){
			if(err) fn({error: err});
			else {
				for(var b in blocks){
					blocks[b] = pub(blocks[b]);
 				}
				console.log(blocks);

				fn(blocks);
			}
		});
	}
}

exports.post = function(data, fn){
	if(data){
		var posting = new Block(data);
		posting.save(function(err){
			if(err) fn({ error: err });
			else fn(pub(posting));
		});

	} else {
		fn({ error: "no id" });
	}
}

exports.put = function(id, data, fn){
	if(data){
		if(id){

			Block.findById(id, function(err, block){
				if(err) fn({error: err});
				else {

					for(var a in data)
						block[a] = data[a];

					block.save(function(err){
						if(err) fn({error: err});
						else {
							fn(pub(block));
						}
					});
				}
			});

		} else {
			fn({error: "No id"})
		}

	} else {
		fn({error: "No data"});
	}
}