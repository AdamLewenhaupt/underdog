define(["backbone", "underscore", "io"], function (Backbone, _, IO){

	var Workspace,
		onInit = [],
		inited = false,
		router;

	return {

		init: function (targets, handles){

			Backbone.history.start();

			Workspace = Backbone.Router.extend(_.extend({ routes: targets }, handles));

			router = new Workspace;

			for(var key in targets) {
				if(router[targets[key]]) {
					router.on("route:"+targets[key], router[targets[key]]);
				}
			}

			var init = Backbone.history.fragment;
			if(init !== ""){
				IO.emit("community", init);
				router.navigate("");
			}	

			onInit.forEach(function (fn){
				fn();
			});

			inited = true;
		},

		onInit: function (fn){
			if(inited) fn();
			else
				onInit.push(fn);
		},

		navigate: function (path, trigger){
			router.navigate(path, { trigger: trigger });
		}
	};
});
