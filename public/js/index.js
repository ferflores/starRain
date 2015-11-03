$(document).ready(main);


function main(){

	var canvas = configureCanvas();
	var project = document.getElementById('project').value;

	var socket = io();

	socket.on('message', function(msg){
	 	console.log(msg);
	});

	socket.on('connect', function(){
		
		socket.emit('hello', {project:project});
	});

	var drawer = new Drawer({canvas:canvas, project:project});

	drawer.init();
}

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
