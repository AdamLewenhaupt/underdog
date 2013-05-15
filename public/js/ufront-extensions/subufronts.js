define([], function (){

	return function (main, options){

		console.log("runs");

		if (main.hasAttr("rendable")) {

			console.log("has");

			main.onInit('view', function (view){

				console.log("applies");
				console.log(main.onRend);

				(options.subs || []).forEach(function (sub){

					console.log("curr:", sub);

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