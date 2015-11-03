

var clientComm = {
	io: null,
	init : function(app){
		_this = this;

		_this.io = require("socket.io").listen(app);

		_this.io.on('connection', function(socket){
			//console.log(socket);

			socket.on('hello', function(data){
				socket.join(data.project);
			});
		});
	},

	processRequest: function(room, result){
		this.io.to(room).emit('message', result);
	}
}

module.exports = clientComm;