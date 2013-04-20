define(["jquery"], function ($){


	function SUGrid(options){

		options = options || {};

		var size = options.size || '50',
			zindex = options.zindex || 1,
			area = options.area,
			parent = options.parent,
			init = options.init;

		var self = this;

		self.alignment = options.align;
		self.provider = false;
		self.children = [];

		$(function(){
			self.$parent = parent || $('body');
			self.$el = $("<div class='su-grid' />");

			if(!options.noParent)
			self.$parent.append(self.$el);

			if(options.class) self.$el.addClass(options.class);

			var style;

			switch(area){
				case 'left':
					if(options.align === "left" || !options.align){
						style = {
							left: 0,
							width: size,
							height: '100%'
						}
					} else {
						style = {
							left: 0,
							right: size,
							height: '100%' 
						}
					}
				break;

				case 'right':
					if(options.align === "left" || !options.align){
						style = {
							right: 0,
							left: size,
							height: '100%'
						}
					} else {
						style = {
							right: 0,
							width: size,
							height: '100%'
						}
					}
				break;

				case 'up':
					if(options.align === "up" || !options.align){
						style = {
							width: '100%',
							top: 0,
							height: size
						}
					} else {
						style = {
							width: '100%',
							top: 0,
							bottom: size
						}
					}
				break;

				case 'down':
					if(options.align === "up" || !options.align){
						style = {
							bottom: 0,
							width: '100%',
							top: size
						}
					} else {
						style = {
							bottom: 0,
							height: size,
							width: '100%'
						}
					}
				break;

				default:
					style = {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					}
				break;
			}

			style.position = "absolute";

			if(zindex) style["z-index"] = zindex;

			self.$el.css(style);

			if(init) init(self);

		});

		this.split = false;

		this.splitH = function(y, align, fn){

			$(function (){

				var finished = 0;

				function finish (){
					if(++finished === 2 && fn) fn(self);
				}

				self.up = new SUGrid({
					area: "up",
					align: align,
					size: y,
					parent: self.$el,
					init: finish
				});

				self.down = new SUGrid({
					area: "down",
					align: align,
					size: y,
					parent: self.$el,
					init: finish
				});

				self.split = true;

				self.children.push(self.down);
				self.children.push(self.up);
			});
		};

		this.splitV = function(x, align, fn){

			$(function (){

				var finished = 0;

				function finish (){
					if(++finished === 2 && fn) fn(self);
				}

				self.left = new SUGrid({
					area: "left",
					align: align,
					size: x,
					parent: self.$el,
					init: finish
				});

				self.right = new SUGrid({
					area: "right",
					align: align,
					size: x,
					parent: self.$el,
					init: finish	
				});

				self.split = true;

				self.children.push(self.left);
				self.children.push(self.right);

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

		this.desaturate = function(){
			if(self.provider) {
				self.provider = false;
				self.$el.html("");
			}
		};

		this.render = function () {
			if(self.provider) {
				if(self.provider.View.render) {
					self.provider.View.render();
				}
			} else {
				self.children.forEach(function (ch){
					ch.render();
				});
			}
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

			if(time) {

				if(self.left) {
					if(self.left.alignment === "left" || !self.left.alignment){
						self.left.$el.animate({ width: newSize }, time, fn);
						self.right.$el.animate({ left: newSize }, time, fn);
					} else {
						self.left.$el.animate({ right: newSize }, time, fn);
						self.right.$el.animate({ width: newSize }, time, fn);
					}
				} else {
					if(self.up.alignment === "up" || !self.up.alignment){
						self.up.$el.animate({ height: newSize }, time, fn);
						self.down.$el.animate({ top: newSize }, time, fn);
					} else {
						self.up.$el.animate({ bottom: newSize }, time, fn);
						self.down.$el.animate({ height: newSize }, time, fn);
					}
				}

			} else {

				if(self.left) {
					if(self.left.alignment === "left" || !self.left.alignment) {
						self.left.$el.css("width", newSize + "px");
						self.right.$el.css("left", newSize + "px");
					} else {
						self.left.$el.css("left", newSize + "px");
						self.right.$el.css("width", newSize + "px");
					}

				} else {
					if(self.up.alignment === "up" || !self.up.alignment) {
						self.up.$el.css("height", newSize + "px");
						self.down.$el.css("top", newSize + "px");
					} else {
						self.up.$el.css("top", newSize + "px");
						self.down.$el.css("height", newSize + "px");
					}
				}
			}
		}
	};

	return SUGrid;

});