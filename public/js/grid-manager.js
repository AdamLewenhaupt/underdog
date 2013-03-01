/*
Author: Adam Lewenhaupt
Synopsis:
The grid-manager is responsible for all grid micro-management aswell
as providing a api that ufronts can connect to.

The grid-manager is also responsible for telling components that
depend on it when it is loaded.
*/

define(["ufront/ugrid"], function(UGrid){

	function crtCB(ls, i){
		return function(ugrid){
			(ls[i]||[]).forEach(function(fn){
				fn(ugrid);
			});
			ls[i] = false;
		};
	}

	return function GridManager(layers){

		layers = layers || 1;

		var self = this;

		self._layers = [];
		self._inits = [];

		for(i = 0; i < layers; i++){
			self._layers.push(new UGrid({ zindex: i, init: crtCB(self._inits, i) }));
			self._inits.push([]);
		}

		self.layer = function(n){
			return self._layers[n];
		}

		self.onInit = function(n, fn){
			if(self._inits[n])
				self._inits[n].push(fn);
			else 
				fn(self._layers[n]);
		}

		self.layers = layers;
	};
});