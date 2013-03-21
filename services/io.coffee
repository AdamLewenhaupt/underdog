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
    socket.emit name + ":down-change:loggs",
      room: "Social"
      change: [
        sender: "S"
        message: "Aloha :)"
      ]

    socket.on name + ":up-change:loggs", (data) ->
      if data.change.message is "hello"
        socket.emit name + ":down-change:loggs",
          room: data.room
          change:
            sender: "S"
            message: "Hello :)"



exports.init = (server) ->
  io = _io.listen(server,
    log: false
  )
  io.sockets.on "connection", (socket) ->
    socket.on "auth", (data) ->
      socket.emit "community-chat:down-change:loggs",
        room: "Feedback"
        change:
          sender: "S"
          message: "Welcome " + data.name


    socket.on "pushable", (id) ->
      console.log "New pushable: " + id
      pushable[id] socket  if pushable[id]

    socket.on "community", (id) ->
      persistent.access("community").findById id, (err, community) ->
        unless err
          console.log community



exports.on = (name, fn) ->
  console.error "IO.init has not been called" unless io
  io.sockets.on name, fn