/*
A project wrapper for the socket.io package.
*/

var _io = require('socket.io'),
	io = false;

// Pre-programmed push-behavior.
var pushable = {
	"community-chat": function (socket){
		var name = "community-chat";

		socket.emit(name+":down-change:loggs", { room: "Social", change: [{ sender: "S", message: "Aloha :)" }] });
		socket.on(name+":up-change:loggs", function (data){

			if(data.change.message === "hello")
				socket.emit(name+":down-change:loggs", { room: data.room, change: { sender: "S", message: "Hello :)" }});
		});
	}
};

exports.init = function (server){
	io = _io.listen(server, {log: false});

	io.sockets.on('connection', function (socket){

		socket.on('auth', function (data){
			socket.emit("community-chat:down-change:loggs", {room: "Feedback", change: { sender: "S", message: "Welcome " + data.name } });
		});

		socket.on('pushable', function (id){
			console.log("New pushable: " + id);
			if(pushable[id]) pushable[id](socket);
		});
	});
};

exports.on = function (name, fn){
	if(!io) console.error("IO.init has not been called");
	io.sockets.on(name, fn);
};