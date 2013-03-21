define(["ufront/ufront", "router"], function (UFront, Router){

	var Fame = new UFront({

		type: "fame",
		className: "fame",

		events: {
			"click .progress" : "inc",
			"click .level": "inc"
		},

		attributes: {

			defaults: {
				progress: 10,
				fame: 1
			},

			rendable: {
				template: "<div class='progress' /><div class='level' >Fame <%= fame %></div>",
				triggers: ["fame"]
			},

			pushable: {
				id: "fame",

				attributes: [
					{ name: "fame" },
					{ name: "progress" }
				]
			},

			progressable: {

				targets: [{
					el: ".progress",
					progress: 10,
					trigger: "progress"
				}]
			},

			"unclickable-text": {}
		},

		extend: function (main){

			main.View.inc = function (){
				this.model.set("progress", this.model.get("progress") + 10);
			};
		}

	}).Create;

	return Fame;
});