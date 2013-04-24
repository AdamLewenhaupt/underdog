define([], function (){

	var _id,
		_onChange = [];

	return {

		id: function (){
			return _id;
		},

		setCommunity: function (data){

			_id = data.id;
			_onChange.forEach(function (fn){

				fn(data);
			});
		},

		onChange: function (fn){
			_onChange.push(fn);
		}
	};
});