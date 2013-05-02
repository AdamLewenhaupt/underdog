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
					fame: 1,
					progress: 0
				},

				rendable: {
					template: 
					"<h1><%= name %></h1>"+
					"<div class='fame-container'><div class='progress' /><div class='level'>Fame <%= fame %></div></div>",

					triggers: [
						"name",
						"fame",
						"progress"
					]				
				},

				pushable: {
					id: "title",

					attributes: [
						{ name: "name" }, 
						{ name: "fame" },
						{ name: "progress" }
					]
				},

				progressable: {

					targets: [{
						el: ".progress",
						progress: 0,
						trigger: "progress"
					}]
				}
			}
		});

		return Title.Create;
});
