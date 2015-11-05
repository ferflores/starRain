var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('gulp-browserify');
var environments = require('gulp-environments');

var development = environments.development;
var production = environments.production;
 
gulp.task('browserify', function() {
  return gulp.src('client/js/index.js')
  	.pipe(development(browserify({debug:true})))
  	.pipe(production(browserify({debug:false})))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('start', function () {
  nodemon({
    script: 'server/app.js'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default',['browserify', 'start']);