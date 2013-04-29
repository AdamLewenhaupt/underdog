define([], function (){

	var ufronts = {};

	return {

		has: function (id){
			return ufronts[id];
		},

		add: function (id, ufront) {
			ufronts[id] = ufront;
		},

		get: function (id){
			return ufronts[id];
		}
	}

});