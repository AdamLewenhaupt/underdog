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
    socket.on "auth", (data) ->
      console.log "#{data.name} is authenticated"

    socket.on "pushable", (id) ->
      console.log "New pushable: #{id}"
      pushable[id] socket if pushable[id]

    socket.on "community", (id) ->
      persistent.access("community").findById id, (err, community) ->
        unless err
          socket.emit "fame:down-change:progress", community.progress
          socket.emit "fame:down-change:fame", community.fame
          socket.emit "title:down-change:name", community.name
          socket.emit "title:down-change:users", community.users.length
          logRouter = {}
          for i in [0..community.rooms.length]
            logRouter[community.rooms[i]] = community.chatlogs[i]
          socket.emit "community-chat:down-change:rooms", community.rooms
          socket.emit "community-chat:down-change:loggs", logRouter



exports.on = (name, fn) ->
  console.error "IO.init has not been called" unless io
  io.sockets.on name, fn