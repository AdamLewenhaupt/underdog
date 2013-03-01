define([], function(){

	return function(main, options){

		if(!options.url && !main.type) console.error((main.type+": "||"")+"no url in persistent UFront");
		main.Model.urlRoot = "/persistent" + (options.url || ("/" + main.type)) + "/";
		
		main.onInit('self', function(self){

			self.Model.on('change', function(){
				self.Model.save();
			});

		});
	}

});