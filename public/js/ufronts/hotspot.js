define([
		"ufront/ufront"
	], 

	function (UFront){

		var Hotspot = new UFront({
			type: "hotspot",
			
			className: "hotspot"
		});

		return Hotspot.Create;
});