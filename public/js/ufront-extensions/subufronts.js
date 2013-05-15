define([], function (){

	return function (main, options){

		if (main.hasAttr("rendable")) {

			main.onInit('view', function (view){

				(options.subs || []).forEach(function (sub){

					view.$el.find(sub.el).html(sub.ufront.$el);

					main.onRend(function (){
						view.$el.find(sub.el).html(sub.ufront.$el);
					});
				});
			});

		} else {
			console.error("'sub ufronts' require rendable");
		}

	};

});