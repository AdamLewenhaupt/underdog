define(["ufront/ufront"], function(UFront){

	var Input = new UFront({

		type: "input",
		className: "input",

		events: {
			"keypress .msg": "send"
		},

		extend: function(main){

			main.View.send = function (e){

				$el = this.$el;

				$target = $(e.currentTarget);

				if(e.keyCode === 13){
					var msg = $el.find(".msg"),
						text = msg.val();
					this.model.attributes.text = text;
					this.model.trigger("change:text", this.model);
					msg.val("");
				}
			};

			main.onInit('self', function(self){
				self.$el.html("<textarea class='msg' placeholder= 'Enter message'></textarea>");
			});
		}

	}).Create;

	return Input;

})