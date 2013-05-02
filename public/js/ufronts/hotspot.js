define([
		"ufront/ufront",
		"router",
		"jquery",
		"io",
		"community",
		"underscore"
	], 

	function (UFront, Router, $, IO, Community, _){

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

						$el.find(".content .choose-embed .icont iframe")
							.attr("src", embed);
					}
					
					return false;
				};

				main.onInit('model', function (model){
					
					model.on('change:feeds', function (){
						if(model.get("feeds").length > 0)
							model.set("feedIndex", 0);
					});

					model.on('change:feedIndex', function (){

						var current = model.get("feeds")[model.get("feedIndex")];

						if(typeof current === "string") {
							$.ajax({
								type: "get",
								url: "/persistent/feed/" + current,
								success: function (data){
									if(!data.err){
										model.get("feeds")[model.get("feedIndex")] = data;
										model.set("feed", data);
									}
								}
							});
						} else {
							model.set("feed", current);
						}

					});
				});

				main.onInit('self', function (self){

					self.Model.on('.menu:change', function (val){
						self.View.$el.find(".content").animate({
							opacity: 0
						}, 200, function (){
							if(val === "feed")
								self.Model.set("feeding", true);
							else
								self.Model.set("feeding", false);
							this.animate({
								opacity: 1
							}, 200);
						});
					});

					self.saveFeed = function (fn){

						var cid = Community.id();

						if(cid) {
							var $el = self.View.$el,
								data = {
									title: $el.find("input[name='title']").val(),
									content: $el.find("textarea").val(),
									embed: $el.find("input[name='url']").val(),
									cid: cid
								};

							IO.emit("community:save-feed", data);
							IO.on("community:save-feed-res", function (success){
								if(success)
									self.Model.set("editing", false);
								fn(success);
							});

						} else {
							fn(false);
						}
					};

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

					editing: false,
					feeds: [],
					feedIndex: -1,
					feed: false,
					feeding: true // Haha
				},

				pushable: {

					id: "hotspot",

					attributes: [
						{ 
							name: "feeds"
						}
					]
				},

				rendable: {

					triggers: ["editing", "feed", "feeding"],

					template: 
						"<div class='menu'>"+
							"<input type='radio' name='content-type' value='feed' id='hotspot_menu_feed' <% if(feeding){ %>checked<% } %>/><label for='hotspot_menu_feed' >Feed</label>"+
							"<input type='radio' name='content-type' value='reviews' id='hotspot_menu_reviews' <% if(! feeding){ %>checked<% } %> /><label for='hotspot_menu_reviews' >Reviews</label>"+
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
								"<div class='write-description'>"+
									"<input type='text' name='title' />"+
									"<textarea></textarea>"+
								"</div>"+
							"<% } else { %>"+
								"<% if (feeding) { %>"+
									"<div class='embed'>"+
										"<iframe src='<%= feed.embed %>' />"+
									"</div>"+
									"<div class='description'>"+
										"<h1><%= feed.title %></h1>"+
										"<p><%= feed.content %></p>"+
									"</div>"+
								"<% }%>"+
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
						},

						{
							el: "textarea",
							default: "Your awesome text"
						},

						{
							el: "input[name='title']",
							default: "The title goes here"
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