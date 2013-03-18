/*
	The IO api provides a wrapper around the socket.io api.
*/

define([], function(){

	var socket;

	var init = [],
		inited = false;

	return {
		initialize: function() {
			socket = io.connect('http://localhost', {
				transports: ["xhr-polling"]
			});
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
		}
	}

})