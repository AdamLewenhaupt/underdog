define([], function(){
	return function(main, options){

		main._onRend = [];
		main.onRend = function(fn){
			main._onRend.push(fn);
		}

		//Assert required options.
		if(!options.template) console.error((main.type+": "||"")+"no template");

		main.View.template = _.template(options.template);

		main.View.render = function(){
			var view = this;
			
			this.$el.html(this.template(this.model.attributes));

			main._onRend.forEach(function (fn){
				fn(view);
			});

			if(options.onRend) options.onRend(this);

			if(options.ready) {
				options.ready(this);
				delete options.ready; //Called once.
			}
		};

		main.onInit('view', function(view){

			view.render();

			if(options.triggers){
				options.triggers.forEach(function(a){
					if(typeof(a) === "string"){
						view.model.on('change:' + a, function(){
							view.render();
							view.model.trigger("render");
						});
					} else {
						
						view.model.on('change:' + a.name, function (){
							if(a.when ? a.when(view.model.get(a.name)) : true) {
								view.render();
								view.model.trigger("render");
							}
						});
					}
				});
			}
		});
	}
});