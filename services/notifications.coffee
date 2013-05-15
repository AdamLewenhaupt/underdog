timers = require('timers')
io = require('./io')

pushStr = "notification-center:down-change:notifications"

greet = (socket) ->
	return ->
		socket.emit pushStr, 
				priority: 1
				data:
					html: "<p style='margin:10px' >Welcome back</p>"
					duration: 3
					css: 
						color: "white"
						"background-color": "#4DBF4D"
						position: "absolute"

io.onSocket (socket) ->
	socket.ready () -> 
		timers.setTimeout greet(socket), 1000