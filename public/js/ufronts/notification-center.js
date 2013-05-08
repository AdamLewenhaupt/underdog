define(["ufront/ufront", "priority-queue"], 
	function (UFront, PriorityQueue){

	var NotificationCenter = new UFront({

		type: "notification-center",
		className: "notification-center",

		attributes: {

			defaults: {

				queue: new PriorityQueue({ low: true })
			},

			pushable: {

				id: "notification-center",

				attributes: [
					{
						name: "notifications",
						type: Object,

						"down-parse": function (data, model){
							model.get("queue").push(data.data, data.priority);
						}
					}
				]
			},

			rendable: {
				template: "<div>Test</div>"
			}
		}

	}).Create;

	return NotificationCenter;
});