define(["jquery-ui"], function ($ui){
	return function(main, options){

		if(!options.targets) return console.error("No targets");

		main.onInit('model', function (model){
			model.on('provide', function (m){

				var $el = m.$el;

				options.targets.forEach(function (progress){

					$el.find(progress.el).progressbar({
						value: progress.progress
					});

					if(progress.trigger){
						model.on("change:"+progress.trigger, function (){

							$el.find(progress.el).progressbar('option', {

								value: model.get(progress.trigger)
							});
						});
					}
				});
			});
		});
	}
});