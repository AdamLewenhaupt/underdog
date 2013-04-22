/*
The user modules handles all authentication and user information.
*/

define(["io", "jquery"], function (IO, $){

	function setCookie(c_name,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}

	function getCookie(c_name){
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
		  	x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  	y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  	x=x.replace(/^\s+|\s+$/g,"");
		  	if (x==c_name){
		    	return unescape(y);
		    }
		}
	}

	var   _name
		, _auth = false
		, _onAuth = []
		, _communities
		, _id;

	var self = {

		auth: function (name, pass){

			var assigned = getCookie("a_user"),
				data = {};

			if(assigned) data.id = assigned;
			else if(name && pass) {
				data.username = name;
				data.password = pass;
			} else {
				return;
			}

			$.ajax({
				type: "post",
				url: "/login",

				data: data,

				success: function (data){
					if(data.auth){
						console.log(data);
						IO.emit("auth", { name: data.user.name });

						if(data.assigned)
							setCookie("a_user", data.assigned, 30);

						_auth = true;
						_name = data.user.name;
						_communities = data.user.communities;
						_id = data.user.id;

						_onAuth.forEach(function (fn){
							fn(_name);
						});
					}
				}
			});
		},

		onAuth: function (fn){
			if(_auth) fn(_name);
			else _onAuth.push(fn);
		},

		isAuth: function (){
			return _auth;
		},

		name: function (){
			return _name;
		},

		communities: function (){
			return _communities;
		},

		id: function (){
			return _id;
		}

	};

	self.auth();

	return self;

});