define(["jquery"], function ($){

	return function(main, options){

		if(!options.targets) return console.error("No targets");

		main.onInit('view', function (view){

			options.targets.forEach(function (target){

				var $target = view.$el.find(target.el);

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

			});
		});
	};

});