define([
		"ufront/ufront"
		, "router"
	], 

	function (UFront, Router){

		var Title = new UFront({
			type: "title",
			
			className: "title",

			extend: function (main){

				main.onInit('model', function (model){
					Router.onInit(function (){
						var id = Router.flags().community;
						if(id) {
							model.url = "/persistent/community/" + id;
							model.id = id;
							model.fetch();
						}
					});
				});
			},

			attributes: {

				defaults: {
					name: "Unknown community",
					users: []
				},

				rendable: {
					template: "<h1><%= name %></h1><br/><h2>Members: <%= users.length %></h2>",

					triggers: [
						"name",
						"users"
					]				
				}
			}
		});

		return Title.Create;
});