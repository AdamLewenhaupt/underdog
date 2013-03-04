/*
In this package all unfront-extensions will be stored.
*/

define([
	 "ufront-extensions/loader"
	,"ufront-extensions/persistent" 
	,"ufront-extensions/defaults"
	,"ufront-extensions/rendable"
	,"ufront-extensions/unclickable-text"
	,"ufront-extensions/resizeable"
	,"ufront-extensions/buttons"], 
	
	function(loader
	, persistent
	, defaults
	, rendable
	, unclickableText
	, resizeable
	, buttons){
		return {
			attributes: {
			loader: loader,
			persistent: persistent,
			defaults: defaults,
			rendable: rendable,
			"unclickable-text": unclickableText,
			resizeable: resizeable,
			buttons: buttons
			}
		}
	});