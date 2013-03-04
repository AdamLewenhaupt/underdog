define(["jquery"], function($){
	function UGrid(options){

		options = options || {};

		var size = options.size || '50',
			zindex = options.zindex || 1,
			area = options.area,
			parent = options.parent,
			init = options.init;

		var self = this;

		$(function(){
			self.$parent = parent || $('body');
			self.$el = $("<div class='u-grid' />");
			self.$parent.append(self.$el);

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
				if(self.split) return;
				self.left = new UGrid({parent: self.$el, area: "left", size: left});
				self.right = new UGrid({parent: self.$el, area: "right", size: right});
				self.split = true;
				if(fn) fn(self);
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
				if(self.split) return;

				self.up = new UGrid({parent: self.$el, area: 'up', size: up});
				self.down = new UGrid({parent: self.$el, area: 'down', size: down});
				self.split = true;
				if(fn) fn(self);
			});
		};

		this.saturate = function(ufront){
			$(function(){
				if(self.split){
					console.error("split grid can't contain content");
					return;
				} else {
					self.$el.html(ufront.$el);
				}
			});
		};
	}

	return UGrid;
});