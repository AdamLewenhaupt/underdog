define(["ufront/ufront", "priority-queue", "jquery-ui", "jquery"], 
	function (UFront, PriorityQueue, $ui, $){

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

						"down-parse": function (data, model){
							model.get("queue").push(data.data, data.priority);
							model.trigger("change:queue");
						}
					}
				]
			},

			rendable: {
				template: "<div class='note' style='<%= current.css %>position:relative;width:100%;height:100%;'><%= current.html %></div>",
				triggers: ["current"],

				onRend: function (view){

					var $note = view.$el.find(".note");
					$note.effect("pulsate", {times: 1}, 1000);
				},

				ready: function (view){
				
					view.model.on("render-next", function (){

							var $note = view.$el.find(".note");

							$note.animate({opacity:0}, 1000, function (){
								view.model.trigger("next");
							});
						
					});

				}
			}
		},

		extend: function (main){

			main.onInit('view', function (view){

				var $note = view.$el.find(".note");

				view.model.on("render-next", function (){

					$(function (){
						$note.hide(function (){
							console.log("hello");
							view.model.trigger("next");
						});
					})
					
				});
			});

			main.onInit('model', function (model){

				model.on('change:queue', function (){

					if(!model.get("notifying")) {

						model.set("notifying", true);
						model.show(model.get("queue").pop());
					}
				});

				model.on("next", function (){

					var queue = model.get("queue");

					if(!queue.empty()) {
						model.show(queue.pop());
					} else {
						model.set("current", false);
						model.set("notifying", false);
					}

				});

			});

			main.Model.show = function (note){

				var model = this;

				if(note.duration){

					setTimeout(function (){

						model.trigger("render-next");
						
					}, note.duration * 1000);
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