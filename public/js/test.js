
var socket = io();

socket.on('message', function(msg){
 	console.log(msg);
  //document.getElementById("message").innerHTML = msg;
});

socket.on('connect', function(){
	var project = document.getElementById('project').value;
	socket.emit('hello', {project:project});
});