define([
	  "ufront/ugrid"
	, "ufront/sugrid"
	, "ufronts/chat"
	, "ufronts/menu"
	, "ufronts/hotspot"
	, "ufronts/stat"
	, "ufronts/motd"
	, "ufronts/title"
	, "ufronts/profile"
	, "ufronts/fame"], 

	function (
		  UGrid
		, SUGrid
		, Chat
		, Menu
		, Hotspot
		, Stat
		, MOTD
		, Title
		, Profile
		, Fame){

	return function () {

	var hotspot = new Hotspot;

	var profile = new Profile;

	var growthStat = new Stat;

	var fame = new Fame;
	
	var background = new UGrid({ class: "background" });

	var motd = new MOTD;

	var title = new Title;

	var menu = new Menu ({
		items: {
			Community: function (){
			},

			Members: function (){
				background.up.clean({opacity: 0});
			}
		}
	});

	// Setup grid structure.
	// Define top and bottom.
	background.splitH(60, function(){

		// <<< Define top >>>
		background.up.splitV(30, function (grid){

			var leftGrid = new SUGrid({
				parent: grid.left.$el
			});

			//Define Title, (Member)OTD and fame.
			leftGrid.splitH(100, "down", function (grid){

				var up = new UGrid({
					parent: grid.up.$el
				})

				up.splitH(function (grid){

					title.provide(grid.up);

					motd.provide(grid.down);
					motd.$el.html("Member of the day");
				});
			
				fame.provide(grid.down);
			});

			hotspot.provide(grid.right);
		});

		// <<< Define bottom >>>
		background.down.splitV(20, function (grid){

			menu.provide(grid.left);

			// Define social bottom.
			background.down.right.splitV(function (grid){

				var communityChat = new Chat({
					view: {
						className: 'community-chat'
					}
				});

				communityChat.provide(grid.left);

				profile.provide(grid.right);				
			});
		});
	});

	};

});