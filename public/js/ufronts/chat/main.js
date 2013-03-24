define(["ufronts/chat/input"
		,"ufronts/chat/rooms"
		,"ufronts/chat/view" 
		,"ufront/ufront"
		,"ufront/ugrid"
		,"underscore"
		], 

	function(Input, Rooms, View, UFront, UGrid, _){

	var Chat = new UFront({
		type: "chat",
		className: "chat",

		attributes: {

			defaults: {

				rooms: [],

				loggs: {}
			},

			pushable: {
				attributes: [
					{ 
						name: "loggs"
					},

					{
						name: "rooms",

						"down-parse": function (data) {

							var result = _.map(data, function (room){
								return { name: room }
							});

							return result;
						}
					}],

					id: "community-chat"
			}
		},

		extend: function (main){

			main.childs = {
				view: new View,
				rooms: new Rooms,
				input: new Input
			};

			for(var c in main.childs){
				main.childs[c].host = main;
			}

			main.onInit('model', function (model){

				//What to do when text is submited.
				main.childs.input.Model.on("change:text", function (_model){
					var text = _model.get("text"),
						logg = model.get("loggs")[main.childs.view.Model.get("loggName")];

					logg.push({ sender: "Me", message: text });
					model.trigger('change:loggs');
				});

				model.get("rooms").forEach(function (room){
					model.get("loggs")[room.name] = [];
				});

				//Set the default chat-room.
				main.childs.view.Model.set("loggName", Object.keys(model.get("loggs"))[0]);

				//Push the chat rooms to the rooms ufront.
				model.on("change:rooms", function (){
					main.childs.rooms.Model.set("rooms", model.get("rooms"))
				});

				//This event is triggered when a new room is selected.
				main.childs.rooms.Model.on(".selector:change", function (room){

					main.childs.view.Model.set("logg", model.get("loggs")[room]);
					main.childs.view.Model.set("loggName", room);
				});

				//Push the changed logg to the view ufront.
				model.on("change:loggs", function (){
					main.childs.view.Model.set("logg", model.get("loggs")[main.childs.view.Model.get("loggName")]);
					main.childs.view.Model.trigger("change:logg");
				});
			});

			main.onInit('view', function (view){

				view.grid = new UGrid({

					parent: view.$el

				}).splitV(70, function (self){

					self.left.splitH(80, function (self){

						main.childs.view.provide(self.up);
						main.childs.input.provide(self.down);

					});

					main.childs.rooms.provide(self.right);
				});
			});
		}
	});

	return Chat.Create;
})
