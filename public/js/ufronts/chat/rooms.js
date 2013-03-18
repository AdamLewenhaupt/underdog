define(["ufront/ufront", "jquery-libs/scrollbar", "jquery"], function(UFront, $scrl, $){
	
	var Rooms = new UFront({
		type: 'rooms',
		className: 'rooms',

		attributes: {

			defaults: { 
				rooms: {}
			},

			rendable: {
				template: 
					"<div class='selector'>"+
						"<% var _i = 0; _.each(rooms, function(r){ _i++; %><input type='radio' name='room' value='<%= r.name %>' id='#_selector_<%= _i %>' <% if(_i === 1){ %> checked <% } %> /><label for='#_selector_<%= _i %>' ><%= r.name %></label><% }); %>"+
					"</div>",

				triggers: [
					"rooms"
				]
			},

			buttonsets: {
				sets: [".selector"]
			},

			"unclickable-text": {}
		}

	}).Create;

	return Rooms;
})