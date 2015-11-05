$(document).ready(function(){

	var drawer = require('./lib/Drawer.js');
	var dataModel = require('./model/dataModel.js');

	var canvas = configureCanvas();
	dataModel.project = document.getElementById('project').value;

	drawer.configure({canvas:canvas, dataModel:dataModel});

	var socket = io();

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
		socket.emit('hello', {project:dataModel.project});
	});


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

	        if(drawer){
	        	drawer.canvasResized();
	    	}
	    }

		window.addEventListener('resize', resizeCanvas, false);

		resizeCanvas();

		return canvas;
	}

});