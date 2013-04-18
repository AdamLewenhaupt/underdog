define(["jquery"], function($){

	function UGrid(options){

		options = options || {};

		var size = options.size || '50',
			zindex = options.zindex || 1,
			area = options.area,
			parent = options.parent,
			init = options.init;

		var self = this;

		self.provider = false;

		$(function(){
			self.$parent = parent || $('body');
			self.$el = $("<div class='u-grid' />");
			self.$parent.append(self.$el);

			if(options.class) self.$el.addClass(options.class);

			var style;

			switch(area){
				case 'left':
					style = {
						width: size + '%',
						height: '100%'
					}
				break;

				case 'right':
					style = {
						right: 0,
						width: size + '%',
						height: '100%'
					}
				break;

				case 'up':
					style = {
						width: '100%',
						height: size + '%'
					}
				break;

				case 'down':
					style = {
						bottom: 0,
						width: '100%',
						height: size + '%'
					}
				break;

				default:
					style = {
						width: '100%',
						height: '100%'
					}
				break;
			}

			if(zindex) style["z-index"] = zindex;

			self.$el.css(style);

			if(init) init(self);

		});

		this.split = false;

		this.splitV = function(x, fn){

			var left, right;

			if(typeof(x) === "number"){
				left = x;
				right = 100 - x;
			} else {
				fn = fn || x;
			}

			$(function(){

				var finished = 0;

				function finish (){
					if(++finished === 2 && fn) fn(self);
				}

				if(self.split) return;
				self.left = new UGrid({parent: self.$el, area: "left", size: left, init: finish });
				self.right = new UGrid({parent: self.$el, area: "right", size: right, init: finish });
				self.split = true;
			});
		};

		this.splitH = function(x, fn){

			var up, down;

			if(typeof(x) === "number"){
				up = x;
				down = 100 - x;
			} else {
				fn = fn || x;
			}

			$(function(){

				var finished = 0;

				function finish (){
					if(++finished === 2 && fn) fn(self);
				}

				if(self.split) return;

				self.up = new UGrid({parent: self.$el, area: 'up', size: up, init: finish });
				self.down = new UGrid({parent: self.$el, area: 'down', size: down, init: finish });
				self.split = true;
			});
		};

		this.saturate = function(ufront){
			$(function(){
				if(self.split){
					console.error("split grid can't contain content");
					return;
				} else if(self.provider) {
					console.error("allready has a provider");
					return;
				} else {
					self.$el.html(ufront.$el);
					self.provider = ufront;
				}
			});
		};

		this.clean = function (options){

			var exec = function (){
				
				if(self.left){

					self.left.clean();
					self.right.clean();
					self.split = false;

					delete self.left;
					delete self.right;

					self.$el.html("");
				} 

				else if(self.up) {
					self.up.clean();
					self.down.clean();
				}

				else if(self.provider) {
					self.provider.unsubscribe(self);
					self.$el.html("");
				}
			}

			if(options)
				self.$el.animate(options, 500, exec);
			else 
				exec();
			
		};

		this.resize = function (newSize, time, fn){

			if(!self.split) return;

			var a = newSize,
				b = 100 - newSize;

			if(time) {

				if(self.left) {
					self.left.$el.animate({ width: a }, time, fn);
					self.right.$el.animate({ width: b }, time, fn);
				} else {
					self.up.$el.animate({ height: a }, time, fn);
					self.down.$el.animate({ height: b }, time, fn);
				}

			} else {

				if(self.left) {
					self.left.$el.css("width", a + "%");
					self.right.$el.css("width", b + "%");
				} else {
					self.up.$el.css("height", a + "%");
					self.down.$el.css("height", b + "%");
				}
			}
		}
	}

	return UGrid;
});
