define(["underscore"], function(_){

	return function(main, options){

		if(!options.url && !main.type) console.error((main.type+": "||"")+"no url in persistent UFront");
		main.model.url = options.url || ("/" + main.type);
		main.onInit('self', function(self){
			if(self.model.id)
				self.model.fetch();
		});
	}

});