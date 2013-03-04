define(["jquery-ui"], function($ui){
	return function (main, options){

		if(!options.buttons){
			console.warn("No explicit buttons");
			return;
		}

		main.onInit('model', function (model){
			model.on('provide', function (m){
				$(function (){
					options.buttons.forEach(function (btn){
						m.$el.find(btn).button();
					});
				});
			});
		});
	}
});