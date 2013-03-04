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
	], 

	function(assert, $, Backbone, design){

		assert("Loaded", [$, Backbone, design]);

		console.log("Init app");
		var start = new Date().getTime();

		design();

		console.log("kickin' after: " + (new Date().getTime() - start));
});