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
					"<img src='/images/temp-logo.png' />"+
					"<div class='wrapper' >"+
						"<h1><%= name %></h1>"+
						"<div class='fame-container'><div class='progress' /><div class='level'>Fame <%= fame %></div></div>"+
					"</div>",

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
				},

				buttons: {
					buttons: ["img"]
				}
			}
		});

		return Title.Create;
});
