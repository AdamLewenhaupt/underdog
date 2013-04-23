define([
		"ufront/ufront",
		"router"
	], 

	function (UFront, Router){

		var Hotspot = new UFront({
			type: "hotspot",
			
			className: "hotspot",

			events: {
			},

			extend: function (main){

				main.onInit('model', function (model){
					model.on('.menu:change', function (value){
					});
				});

			},

			attributes: {

				rendable: {

					targets: [],

					template: 
						"<div class='menu'>"+
							"<input type='radio' name='content-type' value='feed' id='hotspot_menu_feed' checked /><label for='hotspot_menu_feed' >Feed</label>"+
							"<input type='radio' name='content-type' value='reviews' id='hotspot_menu_reviews' /><label for='hotspot_menu_reviews' >Reviews</label>"+
						"</div>"+
						"<div class='content' />"

				},

				buttonsets: {
					sets: [".menu"]
				}
			}
		});

		return Hotspot.Create;
});