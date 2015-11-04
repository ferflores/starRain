var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
 
gulp.task('compress', function() {
  return gulp.src('client/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'));
});
