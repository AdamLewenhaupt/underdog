define([
		"ufront/ufront",
		"user",
		"community",
		"jquery",
		"io",
		"ufront-router",
		"ufronts/notification-center"
	], 

	function (UFront,
			 User,
			 Community,
			 $,
			 IO,
			 UFrontRouter,
			 NotificationCenter){

	var Profile = new UFront({
		type: "profile",
		className: "profile",

		events: {
			"keypress .login .auth": "login",
			"click .login .signup-btn": "signup",
			"click .login .login-btn": "login",
			"click .control .get-member-btn": "join",
			"click .control .del-member-btn": "leave",
			"click .control .logout-btn": "logout",
			"click .control .create-btn": "createFeed",
			"click .control .save-btn": "saveFeed"
		},

		attributes: {

			defaults: {
				auth: false,
				isMember: false,
				editing: false
			},

			rendable: {
				template: (
					"<% if(!auth){ %>"+
						"<div class='login'>"+
							"<h1>Please login to view your profile</h1>"+
							"<div class='auth'>"+
								"<input autocomplete='off' type='text' name='username' />"+
								"<input autocomplete='off' type='password', name='password' />"+
								"<div class='login-btn' >Login</div>"+
								"<div class='signup-btn' >Or signup</div>"+
							"</div>"+
						"</div><% }"+
					"else { %>"+
						"<div class='control'>"+
							"<% if(!isMember){ %><div class='get-member-btn' >Join community</div><% }"+
							"else { %><div class='del-member-btn' >Leave community</div><% } %>"+
							"<div class='recommend-btn'>Share community</div>"+
							"<div class='notification-center'></div>"+
							"<div class='logout-btn'>Logout</div>"+
							"<% if(!editing){ %><div class='create-btn'>Create Feed</div><% }"+
							"else { %><div class='save-btn'>Save Feed</div><% } %>"+
						"</div>"+
					"<% } %>"
					),

				triggers: ["auth", "isMember", "editing"]
			},

			buttons: {
				buttons: [
					  ".signup-btn"
					, ".login-btn"
					, ".get-member-btn"
					, ".del-member-btn"
					, ".recommend-btn"
					, ".logout-btn"
					, ".create-btn"
					, ".save-btn"
					]
			},

			"default-fields": {
				targets: [
					{
						el: "input[name='username']",
						default: "Username"
					},

					{
						el: "input[name='password']",
						default: "Password",
						isPassword: true
					}
				]
			},

			"subufronts": {
				subs: [
					{
						el: ".notification-center",
						ufront: new NotificationCenter
					}
				]
			}
		},

		extend: function (main){

			main.onInit('model', function (model){

				IO.on("client:logout", function (){
					model.set("auth", false);
				})

				User.onAuth(function (name){
					model.set({
						name: name, 
						auth: true
					});

					Community.onChange(function (data){
						model.set("isMember", User.communities().indexOf(data.id) !== -1);
					});

					if(Community.id())
						model.set("isMember", User.communities().indexOf(Community.id()) !== -1);
				});
			});

			main.View.createFeed = function (){

				if(UFrontRouter.has("hotspot")) {
					var hot = UFrontRouter.get("hotspot");
					hot.createFeed();
					this.model.set("editing", true);
				}

			}

			main.View.saveFeed = function (){

				var self = this;

				if(UFrontRouter.has("hotspot")) {
					var hot = UFrontRouter.get("hotspot");
					hot.saveFeed(function (succ){

						if(succ)
							self.model.set("editing", false);
					});
				}
			}

			main.View.logout = function () {
				User.logout();
			}

			main.View.join = function (){

				var id = User.id(),
					self = this;

				$.ajax({
					type: "post",
					url: "/community/" + Community.id() + "/add/" + id,

					success: function (){
						self.model.set("isMember", true);
					}
				});
				
			};

			main.View.leave = function (){

				var id = User.id(),
					self = this;

				$.ajax({
					type: "post",
					url: "/community/"+Community.id()+"/del/"+id,

					success: function (){
						self.model.set("isMember", false);
					}
				});

			};
	
			main.View.login = function (e){

				var fields = this.$el.find(":input");

				if(e.keyCode === 13){
					var username = $(fields[0]).val(),
						password = $(fields[1]).val();

					User.auth(username, password);

				} else if (!e.keyCode) {
					
					var username = $(fields[0]).val(),
						password = $(fields[1]).val();

					User.auth(username, password);
				}
			};

			main.View.signup = function (e){

				var $el = this.$el,
					view = this;

				$el.find(".login").animate({

					opacity: 0

				}, 500, function (){
					$(this).remove();
					$el.html(
						"<div class='signup'><form>"+
								"<input autocomplete='off' type='text' name='username' />"+
								"<input autocomplete='off' type='password', name='password' />"+
								"<button class='signup-submit'>Join the fun</div>"+
						"</form></div>"
						);

					main.reloads["default-fields"]();

					$el.find("form").submit(function (){
						
						var $this = $(this);

						$.ajax({
							type: "post",
							url: "/persistent/user",
							data: {
								name: $this.children("input[name='username']").val(),
								password: $this.children("input[name='password']").val()
							},

							success: function (data){
								if(data.error) return console.log(error);
								$el.find(".signup").animate({

									opacity: 0

								}, 500, function (){

									view.render();				
								});
							}
						});

						return false;
					});

					$el.find(".signup-submit").button();
				});
			};
		}
	});

	return Profile.Create;

});