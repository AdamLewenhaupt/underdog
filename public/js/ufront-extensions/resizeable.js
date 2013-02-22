define([], function(){

	return function(main, options){

		// Get the name of the width / height
		// attributes in the given UFront.
		var width = options.width || "width",
			height = options.height || "height";

		// Make the bounds of the view change according
		// to the model.
		main.onInit('view', function(view){
			view.model.on("change:"+width, function(){
				main.View.$el.css("width", view.model.get(width));
			});

			view.model.on("change:"+height, function(){
				main.View.$el.css("height", view.model.get(height));
			});
		});

	}

});