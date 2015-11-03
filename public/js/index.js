$(document).ready(function(){


	var canvas = configureCanvas();
	dataModel.project = document.getElementById('project').value;

	var socket = io();

	socket.on('message', function(result){
		var existingResult = false;

	 	for (var i = 0; i < dataModel.results.length; i++) {
	 		if(dataModel.results[i].name == result){
	 			existingResult = true;
	 			break;
	 		}
	 	}

	 	if(!existingResult){
	 		dataModel.results.push({name: result})
	 	}

	});

	socket.on('connect', function(){
		socket.emit('hello', {project:dataModel.project});
	});

	var drawer = new Drawer({canvas:canvas, project:dataModel.project});

	drawer.init();


	function configureCanvas(){
		var canvas = document.getElementById('canvas');

		function resizeCanvas() {

			var container = $("#container");

			container.width(window.innerWidth);
			container.height(window.innerHeight);

			var mainDiv = $("#main");

	        mainDiv.width(container.width());
	        mainDiv.height(container.height()-70);

	        canvas.width = mainDiv.width();
	        canvas.height = mainDiv.height();
	    }

		window.addEventListener('resize', resizeCanvas, false);

		resizeCanvas();

		return canvas;
	}

});