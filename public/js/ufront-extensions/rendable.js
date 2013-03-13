define([], function(){
	return function(main, options){

		//Assert required options.
		if(!options.template) console.error((main.type+": "||"")+"no template");

		main.View.template = _.template(options.template);
		main.View.render = function(){
			this.$el.html(this.template(this.model.attributes));
			if(options.onRend) options.onRend(this);
		};

		main.onInit('view', function(view){
			view.render();

			if(options.triggers){
				options.triggers.forEach(function(a){
					view.model.on('change:' + a, function(){
						view.render();
						view.model.trigger("render");
					});
				});
			}
		});
	}
});