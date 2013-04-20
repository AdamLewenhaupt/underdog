define(["ufront/ufront", "router"], function (UFront, Router){

	var Fame = new UFront({

		type: "fame",
		className: "fame",

		attributes: {

			defaults: {
				progress: 0,
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
					progress: 0,
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