define([], function(){
	return function(main, options){
		
		var tmp = main.Model.extend({
			defaults: options
		});

		main.Model = tmp;
	}
});