/*
The UFront package's main file.
*/

define(["backbone", "ufront-extensions", "underscore", "jquery"], 
	function(Backbone, Extensions, _, $){

	function UFront(options){

		var self = this;

		this.attributes = [];
		this.viewInits = [];
		this.modelInits = [];
		this.selfInits = [];
		this.type = options.type;

		this.Model = {

			initialize: function(){

				var model = this;

				self.modelInits.forEach(function(f){
					f(model);
				});
			}

		};

		this.View = {

			tagName: 'div' || options.tagName,

			initialize: function(){
				var view = this;
				self.viewInits.forEach(function(f){
					f(view);
				});
			},

			events: options.events

		};

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
			this.View = new self.View(_.extend(options.view || {}, { model: this.Model }));
			this.$el = this.View.$el;

			var m = this;
			self.selfInits.forEach(function(f){
				f(m);
			});

			this.provide = function($el){
				$el.append(m.$el);
				m.Model.trigger('provide', m);
			}
		};

		this.load = function(fn){

			var s = self;
			var retval = [];
			var url = "/persistent/" + this.type;
			$.ajax({
				type: "get",
				url: url,

				success: function(data){
					if(data.error){
						fn(data.error);
						return;
					}
					data.forEach(function(e){
						retval.push(new s.Create({ model: e }));
					});

					fn(null, retval);
				},

				error: function(err){
					fn(err);
				}
			});
		};

		var tmp;
		tmp = this.Model;
		this.Model = Backbone.Model.extend(tmp);
		tmp = this.View;
		this.View = Backbone.View.extend(tmp);
	}

	return UFront;

});