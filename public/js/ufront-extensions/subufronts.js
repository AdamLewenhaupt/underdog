define([], function (){

	return function (main, options){

		if (main.hasAttr("rendable")) {

			main.onInit('view', function (view){

				(options.subs || []).forEach(function (sub){

					main.onRend(function (){
						console.log("rendering");
						console.log(sub.ufront.$el);
						view.$el.find(sub.el).html(sub.ufront.$el);
					});
				});
			});

		} else {
			console.error("'sub ufronts' require rendable");
		}

	};

});