define(["jquery-ui"], function($ui){

	return function(main, options){

		// Get the name of the width / height
		// attributeers in the given UFront.
		var width = options.width || "width",
			height = options.height || "height";

		// Make the bounds of the view change according
		// to the model.
		main.onInit('view', function(view){

			view.model.on('provide', function(){
				view.$el.resizable({
					ghost: true,
					stop: function(){
						view.model.set({
							width: view.$el.width(),
							height: view.$el.height()
						});
					}
				});
			});
		});

	}

});