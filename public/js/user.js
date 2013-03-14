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
		, _onAuth = [];

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
						IO.emit("auth", { name: data.user });

						if(data.assigned)
							setCookie("a_user", data.assigned, 30);

						_auth = true;
						_name = data.user;

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
		}
	};

	self.auth();

	return self;

});