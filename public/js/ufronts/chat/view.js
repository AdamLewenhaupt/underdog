define(["jquery", "ufront/ufront", "io", "user"], function($, UFront, IO, User){

	function parseLogg(logg){ 

		var name = false;

		if (User.isAuth()) {

			name = User.name();
		}

		var out = [];
		for(var i = 0; i < logg.messages.length; i++)
			out.push({
				sender: name === logg.names[i] ? "Me" : logg.names[i],
				message: logg.messages[i]
			});

		return out;
	}

	function notStr(x) {
		return (typeof(x) !== "string");
	}

	var View = new UFront({
		type: "view",
		className: "view",

		attributes: {
			defaults: {
				logg: []
			},

			rendable: {
				template:
					"<ul>"+
						"<% _.each(logg, function(l){ %><li><div class='sender'><%= l.sender %></div> <div class='message'><p><%= l.message %></p></div></li><% }); %>"+
					"</ul>",

				triggers: [{ name: "logg", when: notStr }],

				onRend: function (view){

					var $ul = view.$el.find("ul");

					$ul.find("li").each(function (){
						
						var $this = $(this),
							$p = $this.find("p"),
							$sender = $this.find(".sender");

						$this.css("height", $p.height() + 4);
						$sender.css("height", parseInt($this.css("font-size")) + 4);

						$(window).on("resize", function (){

							$this.css("height", $p.height() + 4);
							$sender.css("height", parseInt($this.css("font-size")) + 4);
						});
					});

					$ul.scrollTop($ul[0].scrollHeight);
				}
			}
		},

		extend: function (main){

			main.onInit('model', function (model){

				User.onAuth(function (name){

					IO.chatUpdate(function (update){

						console.log(update.data.sender === name);
						if(update.data.sender === name) return;

						if(update.room === model.get("logg-hash")){

							model.get("logg").push(update.data);
							model.trigger("change:logg");
						}
					});
				});
				
				model.on("change:logg", function (){
				
					if(typeof(model.get("logg")) === "string"){

						model.set("logg-hash", model.get("logg"));

						IO.request("chatlog", model.get("logg"), function (err, logg){
							if(err) {
								console.log(err);
								model.set("logg", []);
							} else
								model.set("logg", parseLogg(logg));
						});
					}
				});
			});
		}

	}).Create;

	return View;
})