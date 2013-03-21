define([
		"ufront/ufront"
		, "router"
	], 

	function (UFront, Router){

		var Title = new UFront({
			type: "title",
			
			className: "title",

			attributes: {

				defaults: {
					name: "Unknown community",
					users: 0
				},

				rendable: {
					template: "<h1><%= name %></h1><br/><h2>Members: <%= users %></h2>",

					triggers: [
						"name",
						"users"
					]				
				},

				pushable: {
					id: "title",

					attributes: [
						{ name: "name" }, 
						{ name: "users" }
					]
				}
			}
		});

		return Title.Create;
});
