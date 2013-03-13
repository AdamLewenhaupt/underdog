define(["ufront/ufront"], function(UFront){

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

				triggers: ["logg"],

				onRend: function (view){
					var $ul = view.$el.find("ul");
					$ul.scrollTop($ul[0].scrollHeight);
				}
			},

			extend: function (main){

				main.onInit('model', function (model){
					model.on("change:logg", function (){
						console.log("changed");
					});
				});
			}
		}

	}).Create;

	return View;
})