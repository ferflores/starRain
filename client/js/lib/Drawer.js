function Drawer(options){
	this.canvas = options.canvas;
	this.project = options.dataModel.project;
	this.context = options.canvas.getContext("2d");
	this.results = options.dataModel.results;
	this.redrawAngles = true;
	Drawer._self = this;
}

Drawer._self = null;

Drawer.prototype.drawCircle = function(x, y, w, color, text){

	_this = Drawer._self;

	var ctx = _this.context;

	ctx.moveTo(x,y);
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
	ctx.fill();

	if(text){
		ctx = canvas.getContext("2d");
		ctx.font = '8pt Calibri';
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.fillText(text, x, y+w);
	}
}

Drawer.prototype.drawProject = function(){
	_this = Drawer._self;

	var w = _this.canvas.width/40;
	var x = (_this.canvas.width/2) - (w/2);
	var y = _this.canvas.height/2;

	_this.drawCircle(x,y,w,"#FF0000",_this.project);

	_this.centerX = x;
	_this.centerY = y;
	_this.width = w;
}

Drawer.prototype.drawResults = function(){
	_this = Drawer._self;

	_this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);

	var distance = (_this.canvas.width + _this.canvas.height)/10;

	var angle = Math.PI*2;

	if(_this.redrawAngles){
		var angleIncrement = (Math.PI*2)/_this.results.length;

		var currentAngle = 0;

		for (var i = 0; i < _this.results.length; i++) {
			var result = _this.results[i];
			result.angle = currentAngle;

			result.x = Math.cos(result.angle) * distance + _this.centerX;
			result.y = Math.sin(result.angle) * distance + _this.centerY;

			currentAngle += angleIncrement;
		}

		_this.redrawAngles = false;
	}

	for (var i = 0; i < _this.results.length; i++) {
		var result = _this.results[i];

		_this.drawCircle(result.x, result.y, _this.width, result.color, result.name);

	};

	_this.drawProject();

	requestAnimationFrame(_this.drawResults);
}

Drawer.prototype.addResult = function(result){
	_this = Drawer._self;

	_this.redrawAngles = true;

	_this.results.push(result);
}

Drawer.prototype.canvasResized = function(){
	Drawer._self.redrawAngles = true;
}

Drawer.prototype.init = function(){
	Drawer._self.drawProject();
}