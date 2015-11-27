var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var bower = require('gulp-bower');
var env = require('gulp-env');
var environments = require('gulp-environments')

var development = environments.development;
var production = environments.production;

gulp.task('install', function(){
	return bower();
});

gulp.task('compress', function() {

  production(console.log("test"));

 return gulp.src('client/js/index.js')
    .pipe(development(browserify({debug:true})))
    .pipe(production(browserify({debug:false})))
    .pipe(production(uglify()))
    .pipe(gulp.dest('public/js/'));

});

gulp.task('start', function () {
  nodemon({
    script: 'server/app.js'
  })
});

gulp.task('set-env', function () {
    env({
        file: ".env"
    });
});

gulp.task('default',['set-env', 'compress', 'start']);