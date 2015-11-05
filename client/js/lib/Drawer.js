(function(){ 

	var Particle = require('./Particle.js');

	var canvas = null;
	var project = null;
	var context = null;
	var results = [];
	var redrawAngles = true;
	var projectWidth = 0;
	var centerX = 0;
	var centerY = 0;
	var resultsDistance = 0;
	var particles = [];


	var drawer = {
		configure: function(options){
			canvas = options.canvas;
			project = options.dataModel.project;
			context = options.canvas.getContext("2d");
			results = options.dataModel.results;
			particles = options.dataModel.particles;
			redrawAngles = true;

			drawer.drawProject();
			drawer.drawResults();
		},

		drawCircle: function(x, y, w, color, text){

			var ctx = context;

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
		},

		drawProject: function(){

			var w = canvas.width/40;
			var x = (canvas.width/2) - (w/2);
			var y = canvas.height/2;

			drawer.drawCircle(x,y,w,"#FF0000",project);

			centerX = x;
			centerY = y;
			projectWidth = w;
		},

		pushParticle: function(result){
			var polarity = Math.round(Math.random()) * 2 - 1;
			var randomX = Math.random() * 5 * polarity;
			var randomY = Math.random() * 5 * polarity;

			var newParticle = Particle.create(centerX+randomX, centerY+randomY, 0, 0, 0);
			newParticle['result'] = result;

			var resultAngle = Math.atan2(result.y, result.x);
			var middlePoint = {
				x: (centerX+result.x)/2,
				y: (centerY+result.y)/2
			}

			var randomCurveLength = Math.random()*20;
			var middlePointAngle = resultAngle + (polarity*0.8);
			middlePoint.x = Math.cos(middlePointAngle) * randomCurveLength + middlePoint.x;
			middlePoint.y = Math.sin(middlePointAngle) * randomCurveLength + middlePoint.y;

			newParticle.middlePoint = middlePoint;
			newParticle.addSpring({x:middlePoint.x, y: middlePoint.y}, 0.02, 3);

			particles.push(newParticle);
		},

		drawParticles: function(){
			for (var i = 0; i < particles.length; i++) {
				var particle = particles[i];

				if(particle.middlePoint && particle.distanceTo({x:particle.middlePoint.x, y: particle.middlePoint.y}) <=10){
					particle.springs.splice(0, 1);
					particle.addSpring({x:particle.result.x, y:particle.result.y}, 0.05, 3);
					particle.middlePoint = null;
				}

				if(particle.distanceTo({x:centerX, y:centerY}) >= resultsDistance){
					particles.splice(i, 1);
					continue;
				}

				particle.update();

				drawer.drawCircle(particle.x, particle.y, 4,"#FF0000");
			};
		},

		drawResults: function(){

			context.clearRect(0, 0, canvas.width, canvas.height);

			var angle = Math.PI*2;

			if(redrawAngles){
				var angleIncrement = (Math.PI*2)/results.length;
				resultsDistance = (canvas.width + canvas.height)/10;

				var currentAngle = 0;

				for (var i = 0; i < results.length; i++) {
					var result = results[i];
					result.angle = currentAngle;

					result.x = Math.cos(result.angle) * resultsDistance + centerX;
					result.y = Math.sin(result.angle) * resultsDistance + centerY;

					currentAngle += angleIncrement;
				}

				redrawAngles = false;
			}

			for (var i = 0; i < results.length; i++) {
				var result = results[i];

				drawer.drawCircle(result.x, result.y, projectWidth, result.color, result.name);

			};

			drawer.drawProject();
			drawer.drawParticles();

			requestAnimationFrame(drawer.drawResults);
		},

		addResult: function(result){

			redrawAngles = true;

			results.push(result);
		},

		canvasResized: function(){
			redrawAngles = true;
		}
	}

	module.exports = drawer;

})();