define(["ufront/ufront"], function(UFront){

	function parseInput(text) {
		var result;
		result = text.replace(/([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)/gi, "<a href='$1'>$1</a>");
		return result;
	}

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

					if(text !== ""){
						this.model.set("text", parseInput(text));
						msg.val("");
					}
					
					return false;

				}
			};

			main.onInit('self', function(self){
				self.$el.html("<textarea class='msg' placeholder= 'Enter message'></textarea>");
			});
		}

	}).Create;

	return Input;

})