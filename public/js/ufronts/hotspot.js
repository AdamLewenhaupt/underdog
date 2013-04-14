define([
		"ufront/ufront",
		"router"
	], 

	function (UFront, Router){

		var Hotspot = new UFront({
			type: "hotspot",
			
			className: "hotspot",

			events: {
				"click .loader": "load"
			},

			extend: function (main){

				main.View.load = function (){
					Router.navigate("514adbd63311f5b91b000001", true);
				}
			},

			attributes: {

				rendable: {

					targets: [],

					template: "<div class='loader' >Load test community</div>"
				},

				buttons: {

					buttons: [".loader"]
				},

				"unclickable-text": {}
			}
		});

		return Hotspot.Create;
});