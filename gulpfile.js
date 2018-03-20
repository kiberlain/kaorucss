var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var stripCssComments = require('gulp-strip-css-comments');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var processors = [autoprefixer({ browsers: ['last 2 versions'] })];

gulp.task('build-dev', function() {
  return gulp
    .src('./src/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('kaoru.css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-prod', ['build-dev'], function() {
  return gulp
    .src('./dist/kaoru.css')
    .pipe(stripCssComments({ preserve: false }))
    .pipe(postcss(processors))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['build-dev', 'build-prod']);

gulp.task('default', ['build']);
