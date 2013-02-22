/*
In this package all unfront-extensions will be stored.
*/

define([
	 "ufront-extensions/loader"
	,"ufront-extensions/persistent" 
	,"ufront-extensions/defaults"
	,"ufront-extensions/rendable"], 
	function(loader, persistent, defaults, rendable){
		return {
			attributes: {
			loader: loader,
			persistent: persistent,
			defaults: defaults,
			rendable: rendable
			}
		}
	});