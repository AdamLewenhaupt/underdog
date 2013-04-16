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
		this.reloads = {};

		this.Model = {

			initialize: function(){

				var model = this;

				self.modelInits.forEach(function(f){
					f(model);
				});
			},

			ufront: self

		};

		this.View = {

			tagName: 'div' || options.tagName,

			initialize: function(){
				var view = this;
				self.viewInits.forEach(function(f){
					f(view);
				});
			},

			events: options.events,

			ufront: self

		};

		if(options.className) this.View.className = options.className;

		this.onInit = function(type, fn){
			self[type+'Inits'].push(fn);
		};

		this.hasAttr = function(name){
			return self.attributes.indexOf(name) !== -1;
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

			this.subscribers = [];
			this.Model = new self.Model(options.model);
			this.View = new self.View(_.extend(options.view || {}, { model: this.Model }));
			this.$el = this.View.$el;

			var m = this;
			self.selfInits.forEach(function(f){
				f(m, options);
			});

			this.provide = function(ugrid){
				ugrid.saturate(m);
				m.subscribers.push(ugrid);
				m.Model.trigger('provide', m);
			}

			this.unsubscribe = function(ugrid){
				var index = m.subscribers.indexOf(ugrid);

				if(index === -1){
					console.error("UGrid not found");
					return;
				} else {
					m.subscribers.splice(index, 1);
				}
			};
		};

		var tmp;
		tmp = this.Model;
		this.Model = Backbone.Model.extend(tmp);
		tmp = this.View;
		this.View = Backbone.View.extend(tmp);

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
	}

	return UFront;

});