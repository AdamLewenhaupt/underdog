define(["ufront/ufront", "user", "community", "jquery"], function (UFront, User, Community, $){

	var Profile = new UFront({
		type: "profile",
		className: "profile",

		events: {
			"keypress .login .auth": "login",
			"click .login .signup-btn": "signup",
			"click .login .login-btn": "login",
			"click .control .get-member-btn": "join",
			"click .control .del-member-btn": "leave"
		},

		attributes: {

			defaults: {
				auth: false,
				isMember: false
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
						"</div>"+
					"<% } %>"
					),

				triggers: ["auth", "isMember"]
			},

			buttons: {
				buttons: [
					  ".signup-btn"
					, ".login-btn"
					, ".get-member-btn"
					, ".del-member-btn"
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
			}
		},

		extend: function (main){

			main.onInit('model', function (model){

				User.onAuth(function (name){
					model.set({
						name: name, 
						auth: true
					});

					Community.onChange(function (data){
						console.log(User.communities());
						console.log(data.id);
						model.set("isMember", User.communities().indexOf(data.id) !== -1);
					});
				});
			});

			main.View.join = function (){

				var id = User.id(),
					communities = User.communities(),
					self = this;

				communities.push(Community.id());

				$.ajax({
					type: "put",
					url: "/persistent/user/" + id,
					data: {
						communities: communities
					},

					success: function (){
						self.model.set("isMember", true);
					}
				});
				
			};

			main.View.leave = function (){

				var id = User.id(),
					communities = User.communities(),
					self = this;

				var index = communities.indexOf(Community.id());

				if(index !== -1) {

					communities.splice(index, 1);

					var data = {
							communities: communities.length ? communities : ["-"] 
						};

					console.log(data);

					$.ajax({
						type: "put",
						url: "/persistent/user/" + id,
						data: data,

						success: function (){
							self.model.set("isMember", false);
						}
					})
				}

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