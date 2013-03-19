define(["ufront/ufront", "user"], function (UFront, User){

	var Profile = new UFront({
		type: "profile",
		className: "profile",

		events: {
			"keypress .login .auth": "login",
			"click .login .signup": "signup"
		},

		attributes: {

			defaults: {
				auth: false
			},

			rendable: {
				template: (
					"<% if(!auth){ %>"+
						"<div class='login'>"+
							"<h1>Please login to view your profile</h1>"+
							"<div class='auth'>"+
								"<input autocomplete='off' type='text' name='username' />"+
								"<input autocomplete='off' type='password', name='password' />"+
								"<div class='signup' >Or signup</div>"+
							"</div>"+
						"</div><% }"+
					"else { %>"+
						"<div class='identified' ><h1>This is the best profile ever...<br/>"+
						"Oh and also your name is: <span><%= name %></span></h1></div>"+
					"<% } %>"
					),

				triggers: ["auth"]
			},

			buttons: {
				buttons: [".signup"]
			},

			"default-fields": {
				targets: [
					{
						el: "input[name='username']",
						default: "Username"
					}
				]
			}
		},

		extend: function (main){

			main.onInit('model', function (model){

				User.onAuth(function (name){
					model.set({name: name, auth: true });
				});
			});
	
			main.View.login = function (e){

				var fields = this.$el.find(":input");

				if(e.keyCode === 13){
					var username = $(fields[0]).val(),
						password = $(fields[1]).val();

					User.auth(username, password);
				}
			};

			main.View.signup = function (e){

				var $el = this.$el;

				$el.find(".login").animate({

					opacity: 0

				}, 500, function (){
					$(this).remove();
				});
			};

		}
	});

	return Profile.Create;

});