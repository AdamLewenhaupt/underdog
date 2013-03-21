define(["jquery-ui"], function($ui){
	return function (main, options){

		if(!options.buttons){
			console.warn("No explicit buttons");
			return;
		}

		if(main.hasAttr("rendable")){

			main.onRend(function (view){
				options.buttons.forEach(function (btn){
					view.$el.find(btn).button();
				});
			});

		} else {

			console.warn("Place rendable before buttons for improved behavior");

			main.onInit('model', function (model){
				model.on('provide', function (m){
					options.buttons.forEach(function (btn){
						m.$el.find(btn).button();
					});
				});
			});

		}
	}
});