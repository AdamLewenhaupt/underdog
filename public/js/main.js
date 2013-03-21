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
	], 

	function(assert, IO, $, Backbone, design, Router, User){

		assert("Loaded", [IO, $, Backbone, design, Router, User]);

		IO.initialize();

		console.log("Init app");
		var start = new Date().getTime();

		IO.onInit(function (){
			Router.onInit(function (){

				var id = Router.flags().community;

				//If a community is loaded.
				if(id) {
					IO.emit("community", id);
				}

			});
		})

		Router.init({
			":community": "community"
		});

		design();

		console.log("kickin' after: " + (new Date().getTime() - start));
});