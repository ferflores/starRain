$(document).ready(function(){

	var drawer = require('./lib/Drawer.js');
	var dataModel = require('./model/dataModel.js');
	var events = require('./events.js');
	var availableRooms = [];

	var canvas = configureCanvas();

	drawer.configure({canvas:canvas, dataModel:dataModel});

	var socket = io();

	events.configure(
		{
			socket: socket,
			canvas: canvas,
			dataModel: dataModel,
			drawer: drawer
		});

	socket.on('message', function(result){
		var resultFound = null;

	 	for (var i = 0; i < dataModel.results.length; i++) {
	 		if(dataModel.results[i].name == result){
	 			resultFound = dataModel.results[i];
	 			break;
	 		}
	 	}

	 	if(!resultFound){
	 		drawer.addResult(
	 			{
	 				name: result,
	 				angle:0,
	 				color:'#CCCCCC',
	 				x:0,
	 				y:0
	 			});
	 	}else{
	 		drawer.pushParticle(resultFound);
	 	}
	});

	socket.on('connect', function(){
		queryRooms();
		resizeCanvas();
	});

	socket.on('roomsUpdate', function(rooms){
		updateRooms(rooms);
	});

	function updateRooms(rooms){
		$('#roomList').empty();

		$.each(rooms, function(i,e){
			var newRoom = $('#roomList').append('<li class="roomOption" id="'+ e +'">'+e+'</li>');

			events.addClickRoomHandler(e);
		});
	}

	function queryRooms(){
		socket.emit('getRooms');
		setTimeout(queryRooms, 3000);
	}

	function configureCanvas(){
		var canvas = document.getElementById('canvas');

		window.addEventListener('resize', resizeCanvas, false);

		return canvas;
	}

	function resizeCanvas() {

		var canvas = document.getElementById('canvas');
		var container = $(".canvas-container");

		canvas.width = container.width();
		canvas.height = container.height();

		if(drawer){
			drawer.canvasResized();
		}
	}

});
