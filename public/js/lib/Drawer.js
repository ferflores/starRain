function Drawer(options){
	this.canvas = options.canvas;
	this.project = options.dataModel.project;
	this.context = options.canvas.getContext("2d");
	this.results = options.dataModel.results;
}

Drawer.prototype.drawCircle = function(x, y, w, color, text){
	var ctx = this.context;

	ctx.moveTo(x,y);
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
	ctx.fill();

	if(text){
		ctx = canvas.getContext("2d");
		ctx.font = '12pt Calibri';
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.fillText(text, x, y+w);
	}
}

Drawer.prototype.drawProject = function(){

	var w = this.canvas.width/40;
	var x = (this.canvas.width/2) - (w/2);
	var y = this.canvas.height/2;

	this.drawCircle(x,y,w,"#FF0000",this.project);

	this.centerX = x;
	this.centerY = y;
	this.width = w;
}

Drawer.prototype.drawResults = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	var distance = 100;

	for (var i = 0; i < this.results.length; i++) {
		var result = this.results[i];

		result.angle = Math.random()*Math.PI*2;

		result.x = Math.cos(result.angle) * distance + this.centerX;
		result.y = Math.sin(result.angle) * distance + this.centerY;

		this.drawCircle(result.x, result.y, this.width, result.color, result.name);

	};

	this.drawProject();
}

Drawer.prototype.init = function(){
	this.drawProject();
}