'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var getTask = require('lmn-gulp-tasks');

var config = {
  js: {
    src: './demos/scripts.js',
    dest: './build/bundle.js'
  },
  lint: {
    src: './src/**/*.js'
  },
  browser: {
    server: {
      baseDir: '.'
    },
    startPath: '/demos/index.html'
  }
};

gulp.task('auto-reload', getTask('auto-reload'));

gulp.task('js-quality', getTask('js-quality', config.lint));

gulp.task('js', ['js-quality'], getTask('browserify', config.js));

gulp.task('js-watch', getTask('browserify', {
  src: config.js.src,
  dest: config.js.dest,
  watch: true
}));

gulp.task('build', ['js']);

gulp.task('default', ['build'], function () {
  browserSync.init([
    'demo/**/*.js',
  ], config.browser);
  gulp.watch(['./src/**/*.js', './demos/**/*.js'], ['js']);
});
