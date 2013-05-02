persistent = require('../persistant')
io = require('./io')

io.onSocket (socket) ->

	socket.on "community:save-feed", (data) ->
		Feed = persistent.access("feed")
		newFeed = new Feed(data)

		newFeed.save (err) ->
			unless err
				socket.emit "community:save-feed-res", true
				persistent.access("community").findById data.cid, (err, community) ->
					unless err
						community.feeds.unshift newFeed._id
						community.save()
			else
				socket.emit "community:save-feed-res", false

addUser = (cId, uId) ->
	persistent.access("community").findById cId, (err, community) ->
		unless err
			persistent.access("user").findById uId, (err, user) ->
				unless err
					unless (uId in community.users)
						community.users.push uId
						community.save()
					unless (cId in user.communities)
						user.communities.push cId
						user.save()

removeUser = (cId, uId) ->
	persistent.access("community").findById cId, (err, community) ->
		unless err
			persistent.access("user").findById uId, (err, user) ->
				unless err
					cIndex = user.communities.indexOf cId
					uIndex = community.users.indexOf uId

					unless cIndex == -1
						user.communities.splice cIndex, 1
						user.save()
					unless uIndex == -1
						community.users.splice uIndex, 1
						community.save()


isAdmin = (cId, uId, fn) ->
	persistent.access("community").findById cId, (err, community) ->
		unless err
			persistent.access("user").findById uId, (err, user) ->
				unless err
					if user.id in community.admins
						fn true
					else
						fn false
				else
					fn false
		else
			fn false

exports.route = (app) ->
	app.post "/community/:cid/add/:uid", (req, res) ->
		addUser req.params.cid, req.params.uid
		res.send "success"

	app.post "/community/:cid/del/:uid", (req, res) ->
		removeUser req.params.cid, req.params.uid
		res.send "success"

	app.get "/community/:cid/isadmin/:uid", (req, res) ->
		isAdmin req.params.cid req.params.uid (isAdmin) ->
			res.send(isAdmin)