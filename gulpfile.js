var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat'); //currently not used
var nodemon = require('gulp-nodemon');
var browserify = require('gulp-browserify');
 
gulp.task('compress', function() {
  return gulp.src('client/js/index.js')
  	.pipe(browserify({debug:true}))
    //.pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('start', function () {
  nodemon({
    script: 'server/app.js'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default',['compress', 'start']);