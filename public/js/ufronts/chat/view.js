define(["jquery", "ufront/ufront", "io"], function($, UFront, IO){

	function parseLogg(logg){ 
		var out = [];
		for(var i = 0; i < logg.messages.length; i++)
			out.push({
				sender: logg.names[i],
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
						
						var $this = $(this);
						$this.css("height", $this.find("p").height() + 4);
					});

					$ul.scrollTop($ul[0].scrollHeight);
				}
			}
		},

		extend: function (main){

			main.onInit('model', function (model){
				
				model.on("change:logg", function (){
					
					if(typeof(model.get("logg")) === "string")
						IO.request("chatlog", model.get("logg"), function (err, logg){
							if(err) {
								console.log(err);
								model.set("logg", []);
							} else
								model.set("logg", parseLogg(logg));
						});
				});
			});
		}

	}).Create;

	return View;
})