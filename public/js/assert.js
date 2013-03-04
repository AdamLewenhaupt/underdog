define([], function(){
	return function assert (name, a){
		if(!(a instanceof Array)){
			if(!a){
				console.warn(name + ": assert failed");
				return false;
			} else return true;
		} else {
			a.forEach(function (e){
				if(!assert(name, e));
				return false;
			});
		}
	};
});