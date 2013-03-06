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

		"jquery-libs/img-dl": ["jquery"]


	},

	packages: ["ufront-extensions"]
});

requirejs([
		"assert"
		, "jquery"
		, 'backbone'
		, 'designer'
		, 'router'
	], 

	function(assert, $, Backbone, design, Router){

		assert("Loaded", [$, Backbone, design, Router]);

		console.log("Init app");
		var start = new Date().getTime();

		Router.init({
			":community": "community"
		});

		design();

		console.log("kickin' after: " + (new Date().getTime() - start));
});