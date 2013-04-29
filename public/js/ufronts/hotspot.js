define([
		"ufront/ufront",
		"router",
		"jquery"
	], 

	function (UFront, Router, $){

		var Hotspot = new UFront({
			type: "hotspot",
			
			className: "hotspot",

			events: {
				"submit .content .choose-embed form": "loadEmbed"
			},

			extend: function (main){

				main.View.loadEmbed = function (e){

					var $el = this.$el,
						$target = $(e.currentTarget),
						$url = $el.find("input[name='url']"),
						url = $url.val();

					if(url !== ""){

						var embed = url.replace(/(.+)\/watch\?v=(.+)/gi, "$1/embed/$2");
						console.log(embed);

						$el.find(".content .choose-embed .icont iframe")
							.attr("src", embed);
					}
					
					return false;
				};

				main.onInit('model', function (model){
					model.on('.menu:change', function (value){
					});
				});

				main.onInit('self', function (self){

					self.createFeed = function (){
						self.Model.set("editing", true);
					};

					$(window).resize(function (){
						var $el = self.View.$el,
							total = $el.height(),
							left = total - $el.find(".menu").height();

							$el.find(".content").css("height", left);
					});
				});

			},

			attributes: {

				defaults: {

					editing: false
				},

				rendable: {

					triggers: ["editing"],

					template: 
						"<div class='menu'>"+
							"<input type='radio' name='content-type' value='feed' id='hotspot_menu_feed' checked /><label for='hotspot_menu_feed' >Feed</label>"+
							"<input type='radio' name='content-type' value='reviews' id='hotspot_menu_reviews' /><label for='hotspot_menu_reviews' >Reviews</label>"+
						"</div>"+
						"<div class='content'>"+
							"<% if(editing) { %>"+
								"<div class='choose-embed'>"+
									"<div class='icont'><iframe /></div>"+
									"<form>"+
										"<input type='text' name='url' />"+
										"<button class='load-embed-btn'>Load</button>"+
									"</form>"+
								"</div>"+
								"<div class='write-description' />"+
							"<% } else { %>"+
							"<% } %>"+
						"</div>",

					onRend: function (view){

						$(function (){
							var $el = view.$el,
							total = $el.height(),
							left = total - $el.find(".menu").height();

							$el.find(".content").css("height", left);
						});
						
					}

				},

				buttonsets: {
					sets: [".menu"]
				},

				"default-fields": {
					targets: [
						{
							el: "input[name='url']",
							default: "Embed url"
						}
					]
				},

				buttons: {
					buttons: [
						".load-embed-btn"
					]
				}
			}
		});

		return Hotspot.Create;
});