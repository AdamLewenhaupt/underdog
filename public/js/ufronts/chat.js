define([
	"ufront/ufront"
	,"ufront/ugrid"
	], function (UFront, UGrid){

	var View = new UFront({
		type: "view",
		className: "view",

		attributes: {
			defaults: {
				logg: []
			}
		},

		rendable: {
			template:
				"<ul>"+
					"<% _.each(logg, function(l){ %><%= l.sender %>: <%= l.message %><% }); %>"+
				"</ul>",

			triggers: ["logg"]
		}

	}).Create;

	var Input = new UFront({

		type: "input",
		className: "input",

		events: {
			"keypress :input": "send"
		},

		extend: function(main){

			function _send($el){

				var msg = $el.find(".msg"),
					text = msg.val();

				msg.val("");
				return text;

			}

			main.View.send = function (e){

				$el = this.$el;

				$target = $(e.currentTarget);

				if(e.keyCode === 13){
					console.log(_send($el));
				}
			};

			main.onInit('view', function(view){

				view.$el.html("<input type='text' class='msg' />");
			});
		}

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
				rooms: new Rooms,
				input: new Input
			};

			for(var c in main.childs){
				main.childs[c].host = main;
			}

			main.onInit('view', function (view){

				view.grid = new UGrid({

					parent: view.$el

				}).splitV(70, function (self){

					self.left.splitH(80, function (self){

						main.childs.input.provide(self.down);

					});

					main.childs.rooms.provide(self.right);
				});
			});
		}
	});

	return Chat.Create;
});