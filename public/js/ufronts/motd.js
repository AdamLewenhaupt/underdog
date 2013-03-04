define([
		"ufront/ufront"
	], 

	function (UFront){

		var MOTD = new UFront({
			type: "motd",
			
			className: "motd"
		});

		return MOTD.Create;
});