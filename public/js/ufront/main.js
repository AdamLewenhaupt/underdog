/*
The UFront package's main file.
*/

/*
Psudo:
Define a wrapper around a view + model Backbone object.
Create a way for extendability.
*/

define(["backbone", "ufront-extensions", "underscore"], function(Backbone, Extensions, _){

	function UFront(options){

		var self = this;

		this.attributes = [];
		this.viewInits = [];
		this.modelInits = [];
		this.selfInits = [];
		this.type = options.type;

		this.Model = Backbone.Model.extend({

			initialize: function(){

				var model = this;

				self.modelInits.forEach(function(f){
					f(model);
				});
			}

		});

		this.View = Backbone.View.extend({

			tagName: 'div' || options.tagName,

			initialize: function(){
				var view = this;
				self.viewInits.forEach(function(f){
					f(view);
				});
			}

		});

		this.onInit = function(type, fn){
			self[type+'Inits'].push(fn);
		};

		if(options.extend) options.extend(self);

		//Add extensions.
		if(options.attributes){
			for(var e in options.attributes){
				var attr = Extensions.attributes[e];
				if(attr){
					self.attributes.push(e);
					Extensions.attributes[e](self, options.attributes[e]);
				}
			}
		}

		this.Create = function Create(options){

			options = options || {};

			this.Model = new self.Model(options.model);
			this.View = new self.View(_.extend(options.view, { model: this.Model }));
			this.$el = this.View.$el;

			var m = this;
			self.selfInits.forEach(function(f){
				f(m);
			});
		};
	}

	return UFront;

});