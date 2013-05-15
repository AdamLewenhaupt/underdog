define(["io"], function (IO){

	var id = 0;

	return function(main, options){

		main.Model.pushID = false;

		main.onInit('model', function (model){

			if(options.id){
				model.pushID = options.id;
			} else if(model.id) {
				model.pushID = model.id;
			} else 
				return;

			IO.emit('pushable', model.pushID);

			if(options.attributes){
				options.attributes.forEach(function (attr){

					// {id}:down-change:{attr}
					IO.on(model.pushID + ':down-change:' + attr.name, function (data){
						model.trigger("push", data);
						switch(attr.type){
							case Array:
								model.attributes[attr.name] = model.get(attr.name).concat(data);
								model.trigger("change:"+attr.name, { isPush: true });
								break;

							case Object:

								if(!attr.parse)
									break;

								attr.parse(model.attributes[attr.name], data);
								model.trigger("change:"+attr.name, {isPush: true });
								break;

							default:

								var d = attr["down-parse"] ? attr["down-parse"](data, model) : data;
								model.attributes[attr.name] = d;
								model.trigger("change:" + attr.name, {isPush: true });
								break;
						}
							
					});

					//Push changes to server.
					model.on("change:"+attr.name, function (data){
						var data = data || {},
							parse = attr["up-parse"];

						if(data.isPush)
							return;
						else { 
							var value = model.get(attr.name);
							IO.emit(model.pushID + ':up-change:' + attr.name, parse ? parse(value, model) : value);
						}
					});

				});
			}
		});
	}
});
