define(["jquery-ui"], function($ui){
	return function (main, options){

		if(!options.sets){
			console.warn("No explicit selections");
			return;
		}

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
});