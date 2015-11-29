var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var bower = require('gulp-bower');
var env = require('gulp-env');
var environments = require('gulp-environments');
var watch = require('gulp-watch');

var development = environments.development;
var production = environments.production;

gulp.task('install', function(){
	return bower();
});

gulp.task('compress', function() {

 return gulp.src('client/js/index.js')
    .pipe(development(browserify({debug:true})))
    .pipe(production(browserify({debug:false})))
    .pipe(production(uglify()))
    .pipe(gulp.dest('public/js/'));

});

gulp.task('public-css', function(){
    return gulp.src('client/css/*')
       .pipe(gulp.dest('public/css/'));
});

gulp.task('start', function () {
  nodemon({
    script: 'server/app.js',
    ext: 'js',
    watch: ['./server/']
  })
});

gulp.task('set-env', function () {
    env({
        file: ".env"
    });
});

gulp.task('watch', function() {
  watch('client/js/*.js', ['compress'], function(){
    console.log('compress task due to changes');
  });
  
  watch('client/css/*.css', ['public-css'], function(){
   console.log('public-css task due to changes');
  });
});

gulp.task('default',['set-env', 'compress', 'public-css', 'start', 'watch']);
