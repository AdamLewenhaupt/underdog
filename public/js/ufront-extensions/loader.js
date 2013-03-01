define(["jquery"], function($){

	function resize($cover, $target, $img){
		var pos = $.extend({

				width: $target.outerWidth(),
				height: $target.outerHeight()

			}, $target.position());

			$cover.css({
				left: pos.left,
				top: pos.top,
				width: pos.width,
				height: pos.height
			});

			if(pos.width - pos.height > 0){
				
				$img.css({
					height: pos.height,
					width: "auto"
				});
			} else {
				$img.css({
					width: pos.width,
					height: "auto",
					top: pos.width - ($cover.height() / 2)
				});
			}
	}

	var position = {
		static: "absolute",
		fixed: "fixed",
		relative: "absolute",
		absolute: "absolute"
	}

	return function loader(main, options){

		if(!options.callBack) console.error((main.type+": "||"")+"no callback");

		main.onInit('view', function(view){

			view.model.on('provide', function(){
				var img = $("<img/>")
						.css({
							"background-color": "white"
						}).attr("src", "/images/loading.gif");

				var cover = $("<div/>")
						.css({
							position: position[view.$el.css("position")],
							"background-color": "white",
							"text-align": "center"
						}).html(img);

				view.$el.addClass('loading');
				view.$el.after(cover);
				
				resize(cover, view.$el, img);

				view.$el.resize(function(){
					resize(cover, view.$el, img);
				});

				if(typeof(options.callBack) === "string")
					options.callBack = main[options.callBack];

				options.callBack(function(){

					cover.animate({
						opacity: 0
					}, 500, function(){
						cover.remove();
					});

					view.$el.removeClass('loading');
				});

			});
		});

	}
});