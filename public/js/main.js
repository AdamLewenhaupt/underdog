requirejs.config({
	baseUrl: "js/",
	paths: {
	    "jquery": "libs/jquery",
	    "underscore": "libs/underscore",
	    "backbone": "libs/backbone",
	    "jquery-libs" : "libs/jquery-libs/"
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

	packages: ["ufront", "ufront-extensions"]
});

requirejs(["jquery", 'ufront'], function($, UFront){

	$(function(){

		var Test = new UFront({

			type: "block",

			attributes: {

				loader: {
					callBack: "done"
				},

				defaults: {
					name: 'default',
					color: 'blue',
					width: 120,
					height: 120,
					left: Math.floor((Math.random()*1200)+1),
					top: Math.floor((Math.random()*600)+1)
				},

				rendable: {
					template: "<h2><%= name %></h2>",

					triggers: [
						"name"
					]
				}
			},

			extend: function(main){

				main.done = function(fn){
					setTimeout(fn, 1000);
				}

				main.onInit('view', function(view){

					view.$el.css({
						position: "fixed",
						width: view.model.get("width"),
						height: view.model.get("height"),
						"background-color": view.model.get("color"),
						left: view.model.get("left"),
						top: view.model.get("top"),
						"text-align": "center"
					});

					view.on('dblclick', function(){
						alert("shit");
					});

				});

			}
		});

		var t = new Test.Create({
			view: {
				el: '#test'
			}
		});
	});
});