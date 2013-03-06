define([
	"ufront/ufront"
	,"ufront/ugrid"
	], function (UFront, UGrid){

	var View = new UFront({
		type: "view",
		className: "view"
	}).Create;

	var Rooms = new UFront({
		type: 'rooms',
		className: 'rooms',

		attributes: {

			defaults: { 
				rooms: [
					{ name: "test" },
					{ name: "test" },
					{ name: "test" },
					{ name: "test" },
					{ name: "test" },
					{ name: "test" },
					{ name: "test" },
					{ name: "test" },
					{ name: "test" },
					{ name: "test" }
				]
			},

			rendable: {
				template: 
					"<ul>"+
						"<% _.each(rooms, function(r){ %><li><%= r.name %></li><% }); %>"+
					"</ul>",

				triggers: [
					"rooms"
				]
			},

			buttons: {
				buttons: ["li"]
			},

			"unclickable-text": {}
		}

	}).Create;

	var Chat = new UFront({
		type: "chat",
		className: "chat",

		extend: function (main){

			main.childs = {
				view: new View,
				rooms: new Rooms
			};

			main.onInit('view', function (view){

				view.grid = new UGrid({

					parent: view.$el

				}).splitV(70, function (self){

					main.childs.view.provide(self.left);
					main.childs.rooms.provide(self.right);
				});
			});
		}
	});

	return Chat.Create;
});