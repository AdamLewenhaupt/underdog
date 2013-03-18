define([
	  "ufront/ugrid"
	, "ufronts/chat"
	, "ufronts/menu"
	, "ufronts/hotspot"
	, "ufronts/stat"
	, "ufronts/motd"
	, "ufronts/title"
	, "ufronts/profile"], 

	function (
		  UGrid
		, Chat
		, Menu
		, Hotspot
		, Stat
		, MOTD
		, Title
		, Profile){

	return function () {

	var communityChat = new Chat({
		view: {
			className: 'community-chat'
		}
	});

	var hotspot = new Hotspot;

	var profile = new Profile;

	var growthStat = new Stat;

	var fameStat = new Stat;
	
	var background = new UGrid({ class: "background" });

	var motd = new MOTD;

	var title = new Title;

	var menu = new Menu ({
		items: {
			community: function (){
			},

			members: function (){
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
			hotspot.$el.html("#5134fcb5a7214c9e22000001");

			//Define Title, (Member)OTD and fame.
			background.up.left.splitH(80, function (grid){

				grid.up.splitH(function (grid){

					title.provide(grid.up);

					motd.provide(grid.down);
					motd.$el.html("Member of the day");
				});

				fameStat.provide(grid.down);
				fameStat.$el.html("Fame");

			});

		});

		// <<< Define bottom >>>
		background.down.splitV(20, function (grid){

			menu.provide(grid.left);

			// Define social bottom.
			background.down.right.splitV(function (grid){

				communityChat.provide(grid.left);

				profile.provide(grid.right);				
			});
		});
	});

	};

});