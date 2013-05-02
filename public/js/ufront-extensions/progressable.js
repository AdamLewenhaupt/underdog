define(["jquery-ui"], function ($ui){

	function progress(view, options){
		var $el = view.$el;

		
		options.targets.forEach(function (progress){

			$el.find(progress.el).progressbar({
				value: view.model.get(progress.trigger) || progress.progress
			});

			if(progress.trigger){

				view.model.on("change:"+progress.trigger, function (){

					$el.find(progress.el).progressbar('option', {

						value: view.model.get(progress.trigger)
					});
				});
			}
		});
	}

	return function(main, options){

		if(!options.targets) return console.error("No targets");

		if(main.hasAttr("rendable")){

			main.onRend(function (view){
				progress(view, options);
			});

		} else {
			main.onInit('model', function (model){
				model.on('provide', function (m){

					progress(m.View, options);
				});
			});

		}
	}
});