define(["ufront/ufront"], function (UFront){

	var Fame = new UFront({

		type: "fame",
		className: "fame",

		events: {
			"click .progress" : "inc",
			"click .level": "inc"
		},

		attributes: {

			defaults: {
				progress: 10
			},

			progressable: {

				targets: [{
					el: ".progress",
					progress: 10,
					trigger: "progress"
				}]
			},

			rendable: {
				template: "<div class='progress' /><div class='level' >Fame 1</div>",
				triggers: []
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