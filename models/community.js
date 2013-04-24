var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var communitySchema = new Schema({
	users: [String],
	admins: [String],
	name: String,

	fame: Number,
	progress: Number,

	rooms: [String],
	chatlogs: [String],

	feeds: [String]
});

var Community = mongoose.model('Community', communitySchema);

function pub(c){
	return {
		name: c.name,
		users: c.users,
		id: c._id,
		feeds: c.feeds
	}
}

exports.model = Community;

exports.get = function(id, fn){
	if(id){
		Community.findById(id, function(err, community){
			if(err) fn({ error: err });
			else fn(pub(community));
		});
	} else {
		Community.find({}, function(err, communitys){
			if(err) fn({error: err});
			else {
				for(var c in communitys){
					blocks[c] = pub(blocks[c]);
 				}

				fn(blocks);
			}
		});
	}
}

exports.post = function(data, fn){
	if(data){
		var posting = new Community(data);
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

			Community.findById(id, function(err, community){
				if(err) fn({error: err});
				else {

					for(var a in data)
						community[a] = data[a];

					community.save(function(err){
						if(err) fn({error: err});
						else {
							fn(pub(community));
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