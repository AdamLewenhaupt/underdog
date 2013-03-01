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
		 "jquery"
		, 'ufront/ufront'
		, 'backbone'
		, 'ufront/ugrid'
	], 

	function($, UFront, Backbone, UGrid){

		console.log("Init app");
		var start = new Date().getTime();

		var background = new UGrid;

		console.log("kickin'");
});