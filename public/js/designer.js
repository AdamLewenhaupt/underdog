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
	, "ufronts/fame"
	, "ufront/staterouter"], 

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
		, Fame
		, StateRouter){

	return function () {

	var upStateRouter;

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
				upStateRouter.setState("community", 400);
			},

			Members: function (){
				upStateRouter.setState("members", 400);
			}
		}
	});

	// Setup grid structure.
	// Define top and bottom.
	background.splitH(60, function(){

		var membersGrid = new UGrid({ noParent: true, init: function (){

			membersGrid.$el.html("this is a meber test page");
		} });

		var communityGrid = new UGrid({ noParent: true, init: function (){

			upStateRouter = new StateRouter(background.up, {
				"community": communityGrid,
				"members": membersGrid
			}, "community");
		} });

		// <<< Define top >>>
		communityGrid.splitV(30, function (grid){

			var leftGrid = new SUGrid({
				parent: grid.left.$el,

				init: function (){
					grid.left.children.push(leftGrid);
				}
			});

			//Define Title, (Member)OTD and fame.
			leftGrid.splitH(100, "down", function (grid){

				var up = new UGrid({
					parent: grid.up.$el,
					init: function () {
						grid.up.children.push(up);
					}
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