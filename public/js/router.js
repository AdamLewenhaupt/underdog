define(["backbone"], function (Backbone){

	function empty(){

	}

	var Workspace,
		onInit = [],
		inited = false,
		router,
		flags = {};

	return {
		flags: function (){
			return flags;
		},

		init: function (targets){

			Backbone.history.start();

			Workspace = Backbone.Router.extend({ routes: targets });

			router = new Workspace;

			var init = Backbone.history.fragment;
			if(init !== ""){
				router.navigate("");
				flags.community = init;
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
		}
	};
});