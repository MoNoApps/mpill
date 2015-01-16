// Gulp dependencies
var gulp   = require('gulp');
var jshint = require('gulp-jshint');

// vars
var scripts = [
'./mpill.js',
'./test/*.js',
'./example/*.js'
];

gulp.task('lint', function() {
  gulp.src(scripts)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});
// Default
gulp.task('default', ['lint']);
