define(["jquery"], function ($){


	function SUGrid(options){

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
			self.$el = $("<div class='su-grid' />");
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
							right: size
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

			if(zindex) style["z-index"] = zindex;

			self.$el.css(style);

			if(init) init(self);

		});

		this.split = false;

		this.splitV = function(y, align, fn){

			$(function (){

				self.up = new SUGrid({
					area: "up",
					align: align,
					size: y,
					parent: self.$el
				});

				self.down = new SUGrid({
					area: "down",
					align: align,
					size: y,
					parent: self.$el
				});

				self.split = true;

				if(fn) fn(self);
			});
		};

		this.splitH = function(x, align, fn){

			$(function (){

				self.left = new SUGrid({
					area: "left",
					align: align,
					size: x,
					parent: self.$el
				});

				self.right = new SUGrid({
					area: "right",
					align: align,
					size: x,
					parent: self.$el	
				});

				self.split = true;
				if(fn) fn(self);
			});
		};
	}

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
		
	}

	return SUGrid;

});