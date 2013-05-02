mongoose = require('mongoose')
Schema = mongoose.Schema

feedSchema = new Schema
	content: String
	timestamp: Date
	embed: String
	title: String

Feed = mongoose.model('Feed', feedSchema)

exports.model = Feed

pub = (feed) ->
	content: feed.content
	timestamp: feed.timestamp
	embed: feed.embed.replace(/(.+)\/watch\?v=(.+)/gi, "$1/embed/$2")
	title: feed.title

exports.get = (id, fn) ->
		Feed.findById id, (err, feed) ->
			unless err
				fn(pub feed)
			else
				fn
					errror: err

exports.post = (data, fn) ->
		creating = new Feed(data)
		creating.save (err) ->
			unless err
				fn(pub creating)
			else
				fn
					error: err

exports.put = (id, data, fn) ->
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