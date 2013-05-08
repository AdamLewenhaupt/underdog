define(["ufront/ufront", "priority-queue", "jquery-ui"], 
	function (UFront, PriorityQueue, $ui){

	var NotificationCenter = new UFront({

		type: "notification-center",
		className: "notification-center",

		attributes: {

			defaults: {

				queue: new PriorityQueue({ low: true }),
				notifying: false,
				current: false
			},

			pushable: {

				id: "notification-center",

				attributes: [
					{
						name: "notifications",
						type: Object,

						"down-parse": function (data, model){
							model.get("queue").push(data.data, data.priority);
						}
					}
				]
			},

			rendable: {
				template: "<div class='note' style='<%= current.css %>position:relative;width:100%;height:100%;'><%= current.html %></div>",
				triggers: ["current"],

				onRend: function (view){

					var $note = view.$el.find(".note"),
						color = $note.css("background-color"),
						highlight = "#FFFFFF";

					$note.animate({

						backgroundColor: highlight

					}, 400, function (){

						$note.animate({
							backgroundColor: color
						}, 50);
					});
				}
			}
		},

		extend: function (main){

			main.onInit('model', function (model){

				model.on('change:queue', function (){

					if(!model.get("notifying")) {

						model.set("notifying", true);
						model.show(model.get("queue").pop());
					}
				});

				model.get("queue").push({

					html: "This is a test notification",
					css: { color: "white", "background-color": "#4DBF4D" },
					duration: 10

				}, 1);

				model.trigger("change:queue");

			});

			main.Model.show = function (note){

				var model = this;

				if(note.duration){

					setTimeout(function (){

						model.trigger("next");
						
					}, note.duration);
				}

				var css = "";

				for(attr in note.css)
					css += (attr + ":" + note.css[attr] + ";")

				model.set("current", {

					html: note.html,
					css: css
				});

			};
		}

	}).Create;

	return NotificationCenter;
});