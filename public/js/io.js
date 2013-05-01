/*
	The IO api provides a wrapper around the socket.io api.
*/

define([], function(){

	var socket;

	var init = [],
		inited = false;

	return {
		initialize: function() {
			/*socket = io.connect('http://beviewed.herokuapp.com/', {
				transports: ["xhr-polling"]
			});*/

			socket = io.connect('http://localhost:3000/');

			inited = true;
			init.forEach(function(fn){
				fn();
			});
		},

		onInit: function (fn){
			if(inited) fn();
			else
				init.push(fn);
		},

		on: function(name, fn){
			this.onInit(function (){
				socket.on(name, fn);
			});
		},

		emit: function(name, data){
			this.onInit(function (){
				socket.emit(name, data);
			});
		},

		request: function (type, id, fn){
			$.ajax({

				type: "get",
				url: "/persistent/" + type + "/" + id,

				success: function (data){
					if(data.error)
						fn(data.error, null);
					else
						fn(null, data);
				},

				error: function (err){
					fn(err, null);
				}
			});
		},

		chat: function (room, data){
			this.emit("chat", {
				room: room,
				data: data
			});
		},

		chatUpdate: function (fn){
			this.on("chat-update", fn);
		}
	}

})