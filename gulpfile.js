var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var environments = require('gulp-environments');

var development = environments.development;
var production = environments.production;
 
gulp.task('compress', function() {
  return gulp.src('client/js/index.js')
  	.pipe(development(browserify({debug:true})))
  	.pipe(production(browserify({debug:false})))
  	.pipe(production(uglify()))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('start', function () {
  nodemon({
    script: 'server/app.js'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default',['compress', 'start']);