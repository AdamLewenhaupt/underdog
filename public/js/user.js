/*
The user modules handles all authentication and user information.
*/

define(["io", "jquery"], function (IO, $){

	return {

		initialize: function (){
			$.ajax({
				type: "post",
				url: "/login",

				data: {
					username: "spinno",
					password: "pass"
				},

				success: function (data){
					if(data.success){
						IO.emit("auth");
					}
				}
			});
		}
	};

});