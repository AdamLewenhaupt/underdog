#
#A project wrapper for the socket.io package.
#
persistent = require('../persistant')
_io = require("socket.io")
io = false

# Pre-programmed push-behavior.
pushable =
  "fame": (socket) ->
    name = "fame"
    socket.on "#{name}:up-change:progress", (data) ->
      if data >= 100
        socket.emit "#{name}:down-change:progress", 0
        socket.emit "#{name}:down-change:fame", 2


  "community-chat": (socket) ->
    name = "community-chat"
    socket.on "#{name}:up-change:loggs", (data) ->
      console.log(data)

exports.init = (server) ->
  io = _io.listen(server,
    log: false
  )
  io.sockets.on "connection", (socket) ->

    socket.on "server:logout", (data) ->
      persistent.access("login").findById data, (err, login) ->
        unless err
          login.remove()
          socket.emit "client:logout"

    socket.on "pushable", (id) ->
      console.log "New pushable: #{id}"
      pushable[id] socket if pushable[id]

    socket.on "community", (id) ->
      persistent.access("community").findById id, (err, community) ->
        unless err
          if socket.community
            socket.leave(socket.community)
          socket.community = id
          socket.join(id)
          socket.emit "fame:down-change:progress", community.progress
          socket.emit "fame:down-change:fame", community.fame
          socket.emit "title:down-change:name", community.name
          socket.emit "title:down-change:users", community.users.length
          logRouter = {}
          for i in [0..community.rooms.length]
            logRouter[community.rooms[i]] = community.chatlogs[i]
          socket.emit "community-chat:down-change:rooms", community.rooms
          socket.emit "community-chat:down-change:loggs", logRouter

    socket.on "chat", (update) ->
      persistent.access("chatlog").findById update.room, (err, log) ->
        unless err
          if socket.community
            log.names.push update.data.sender
            log.messages.push update.data.message
            log.save()
            io.sockets.in(socket.community).emit "chat-update", update


exports.on = (name, fn) ->
  console.error "IO.init has not been called" unless io
  io.sockets.on name, fn