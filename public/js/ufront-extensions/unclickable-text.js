define([], function(){
	return function(main, options){
		main.onInit('view', function(view){
			if(options.targets){
				options.targets.each(function(t){
					view.$el.find(t).addClass('unclickable-text');
				});
			} else {
				view.$el.addClass('unclickable-text');
			}
		});
	}
});