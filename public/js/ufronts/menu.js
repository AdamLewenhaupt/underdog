define(["ufront/ufront"], function (UFront){
	var Menu = new UFront({

		type: "menu",
		className: "menu",

		attributes: {

			defaults: {
				items: []
			},

			rendable: {
				template: (
					"<ul>"
						+"<% for(var i in items){ %><li name='<%= i%>'><%= i%></li><% } %>"
					+"</ul>"
					),

				triggers: [
					"items"
				]

			},

			buttons: {
				buttons: ["li"]
			},

			"unclickable-text": {}
		},

		extend: function (main){
			main.onInit('self', function (self, options){
				var items = options.items || [];

				self.Model.set('items', items);

				self.$el.find("li").each(function(){
					$this = $(this);
					$this.on('click', options.items[$this.attr("name")]);
				});
			});
		}
	});

	return Menu.Create;
});