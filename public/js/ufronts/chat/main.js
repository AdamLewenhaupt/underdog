define(["ufronts/chat/input"
		,"ufronts/chat/rooms"
		,"ufronts/chat/view" 
		,"ufront/ufront"
		,"ufront/ugrid"
		,"underscore"
		,"ufront/sugrid"
		,"user"
		,"io"
		], 

	function(Input, Rooms, View, UFront, UGrid, _, SUGrid, User, IO){

	function parseInput(text) {
		var result;
		result = text.replace(/([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)/gi, "<a href='$1'>$1</a>");
		return result;
	}

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
				view: new View({ host: main }),
				rooms: new Rooms({ host: main }),
				input: new Input({ host: main })
			};

			main.onInit('model', function (model){

				//What to do when text is submited.
				main.childs.input.Model.on("change:text", function (_model){
					var text = _model.get("text"),
						logg = main.childs.view.Model.get("logg"),
						last = _.last(logg);

					var parsed = parseInput(text);

					if(last && last.sender === "Me") {
						last.message += "<br/>" + parsed;
					} else {						
						logg.push({ sender: "Me", message: parsed });
					}

					main.childs.view.Model.trigger('change:logg');

					User.onAuth(function (user){
						IO.chat(model.get("loggs")[main.childs.view.Model.get("loggName")], { sender: user, message: text });
					});
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

					main.childs.view.Model.set("loggName", Object.keys(model.get("loggs"))[0]);
					main.childs.view.Model.set("logg", model.get("loggs")[main.childs.view.Model.get("loggName")]);
				});
			});

			main.onInit('view', function (view){

				view.grid = new UGrid({

					parent: view.$el

				}).splitV(70, function (self){

					var ioGrid = new SUGrid({

						parent: self.left.$el
					});

					ioGrid.splitH(32, "down", function (self){
						
						main.childs.view.provide(self.up);
						main.childs.input.provide(self.down);
					});

					main.childs.input.View.$el.find(".msg").on('focus', function(){
						ioGrid.resize(64, 200);
					});

					main.childs.input.View.$el.find(".msg").on('blur', function(){
						ioGrid.resize(32, 200);
					});

					main.childs.rooms.provide(self.right);
				});
			});
		}
	});

	return Chat.Create;
})
