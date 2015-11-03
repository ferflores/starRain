function Drawer(options){
	this.canvas = options.canvas;
	this.project = options.project;
	this.context = options.canvas.getContext("2d");
}

Drawer.prototype.drawProject = function(){
	var ctx = this.context;

	var w = this.canvas.width/20;
	var x = (this.canvas.width/2) - (w/2);
	var y = this.canvas.height/2;
	ctx.fillStyle = "rgb(200,0,0)";
	ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
	ctx.fill();

	ctx = canvas.getContext("2d");
	ctx.font = '12pt Calibri';
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.fillText(this.project, x, y+3);
}

Drawer.prototype.init = function(){
	this.drawProject();
}