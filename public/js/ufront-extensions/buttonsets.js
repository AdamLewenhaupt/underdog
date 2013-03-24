define(["jquery-ui"], function($ui){
	return function (main, options){

		if(!options.sets){
			console.warn("No explicit selections");
			return;
		}

		if(main.hasAttr("rendable")) {

			main.onRend(function (view){

				var $el = view.$el;

				options.sets.forEach(function (bset){

					var $set = $el.find(bset);
					$set.buttonset();
					$set.on('change', function (e){
						view.model.trigger(bset+":change", $el.find(bset+" input[type='radio']:checked").val());
					});
				});
			});

		} else {

			main.onInit('model', function (model){
				model.on('provide', function (m){
					$(function (){
						options.sets.forEach(function (bset){

							var $set = m.$el.find(bset);

							$set.buttonset();

							$set.on('change', function (e){
								model.trigger(bset+":change", m.$el.find(bset+" input[type='radio']:checked").val());
							});
						});
					});
				});
			});
		}
	}
});
