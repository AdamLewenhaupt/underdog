define(["jquery"], function ($){

	function run (view, options){

		options.targets.forEach(function (target){

			var $target = view.$el.find(target.el);

			if(target.isPassword) {

				$target.attr("placeholder", target.default);

			} else {

				$target.on('focus', function (){
					if($target.val() === target.default){ 
						$target.val("");
						$target.removeClass("default-input"); 
					}
				});

				$target.on('blur', function (){
					if($target.val() === ""){
						$target.addClass("default-input");
						$target.val(target.default);
					}
				});

				$target.addClass("default-input");
				$target.val(target.default);
			}

		});

		view.ufront.reloads["default-fields"] = function (){
			run(view, options);
		}
	}

	return function(main, options){

		if(!options.targets) return console.error("No targets");

		if(main.hasAttr("rendable")) {

			main.onRend(function (view){ run(view, options); });

		} else {

			main.onInit('view', function (view){

				run(view, optinos);
			});
		}
	};

});