requirejs.config({
	baseUrl: "js/",
	paths: {
	    "jquery": "libs/jquery",
	    "underscore": "libs/underscore",
	    "backbone": "libs/backbone",
	    "jquery-libs" : "libs/jquery-libs/",
	    "jquery-ui": "libs/jquery-ui"
	},
	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			exports: 'Backbone',
			deps: ['underscore', 'jquery']
		},

		"jquery-libs/img-dl": ["jquery"],
		"jquery-libs/mousewheel": ["jquery"],
		"jquery-libs/scrollbar": ["jquery", "jquery-libs/mousewheel"]


	},

	packages: ["ufront-extensions", "ufronts/chat"]
});

requirejs([
		"assert"
		, "io"
		, "jquery"
		, 'backbone'
		, 'designer'
		, 'router'
		, 'user'
		, 'community'
	], 

	function(assert, IO, $, Backbone, design, Router, User, Community){

		assert("Loaded", [IO, $, Backbone, design, Router, User, Community]);

		IO.initialize();

		console.log("Init app");
		var start = new Date().getTime();

		Router.init({
			":community": "community"
		}, {
			community: function (community){
				
				IO.emit("community", community);
				Community.setCommunity({ id: community });
				this.navigate("");
			}
		});

		Router.onInit(function (){
			Router.navigate("514adbd63311f5b91b000001", true);
		});

		design();

		console.log("kickin' after: " + (new Date().getTime() - start));
		
		IO.emit("ready");
});