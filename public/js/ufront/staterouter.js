define(["ufront/ugrid", "ufront/sugrid"], function (UGrid, SUGrid){

	function isGrid(val) {
		return val instanceof UGrid || val instanceof SUGrid;
	}

	function change(self, name){

		if(self.current && !isGrid(self.states[name]))
			self.current.unsubscribe();
		else if(self.current)
			self.current.$el.detach();

		if(isGrid(self.states[name])) {
			self.current = self.states[name];
			self.grid.$el.html(self.current.$el);
		} else {
			self.current = self.states[name];
			self.current.provide(self.grid);
		}
	}

	function setState (name, time, fn) {

		var self = this;

		if(this.states[name]) {
			if(time) {
				this.grid.$el.animate({ opacity: 0 }, time, function (){

					change(self, name);
					if(fn) fn(self.states[name]);
					self.grid.$el.animate({ opacity: 1 }, time);
				});
			} else {
				change(this, name);
			}
		} else {
			console.error("There is no such state");
		}
	}

	function StateRouter (grid, states, std){

		this.states = states;
		this.grid = grid;
		this.std = std;
		this.current;

		this.setState = setState;

		if(this.std) this.setState(this.std);
	}

	return StateRouter;
});