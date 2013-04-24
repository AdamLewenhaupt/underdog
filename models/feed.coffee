mongoose = require('mongoose')
Schema = mongoose.Schema

feedSchema = new Schema
	content: String,
	timestamp: Date

Feed = mongoose.model('Feed', feedSchema)

pub = (feed) ->
	content: feed.content
	timestamp: feed.timestamp

exports.io = 
	get: (id, fn) ->
		Feed.findById id, (err, feed) ->
			unless err
				fn(pub feed)
			else
				fn
					errror: err

	post: (data, fn) ->
		creating = new Feed(data)
		creating.save (err) ->
			unless err
				fn(pub creating)
			else
				fn
					error: err

	put: (id, data, fn) ->
		Feed.findById id, (err, feed) ->
			unless err
				for attr in data
					feed[attr] = data[attr]
				feed.save (err) ->
					unless err
						fn(pub feed)
					else
						fn
							error: err
			else
				fn
					error: err