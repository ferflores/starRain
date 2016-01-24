var io = null;
var roomUpdates = {};

var utils = {
	getAvailableRooms: function(){
		var rooms = [];
		var now = new Date();
		var fiveMinutes = 5 * 60000;
		var fiveMinutesAgo = new Date(now - fiveMinutes);

		for (var room in roomUpdates) {
		    if (roomUpdates.hasOwnProperty(room)) {
		        if(roomUpdates[room] > fiveMinutesAgo){
		        	rooms.push(room);
		        }
		    }
		}

		return rooms;
	}
};

var clientComm = {
	init : function(app){

		io = require("socket.io").listen(app);

		io.on('connection', function(socket){
			socket.on('getRooms', function(){
				socket.emit('roomsUpdate', utils.getAvailableRooms());
			});

			socket.on('click-room', function(room){
				var rooms = utils.getAvailableRooms();

				for (var i = 0; i < rooms.length; i++) {
					socket.leave(rooms[i]);
				}
				
				socket.join(room);
			});
		});
	},

	processRequest: function(room, result){
		io.to(room).emit('message', result);
		roomUpdates[room] = new Date();
	}
}

module.exports = clientComm;
