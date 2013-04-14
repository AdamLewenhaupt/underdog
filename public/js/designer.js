define([
	  "ufront/ugrid"
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

			hotspot.provide(grid.right);

			//Define Title, (Member)OTD and fame.
			background.up.left.splitH(80, function (grid){

				grid.up.splitH(function (grid){

					title.provide(grid.up);

					motd.provide(grid.down);
					motd.$el.html("Member of the day");
				});

				fame.provide(grid.down);

			});

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