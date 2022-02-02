const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const terser = require('gulp-terser');
const headerComment = require('gulp-header-comment');

const files = {
  scssPath: 'src/scss/**/*.scss',
  jsPath: 'src/js/**/*.js'
}

function scssTask() {
  return src(files.scssPath)
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(dest('dist/css/'));
}

function jsTask() {
  var dateFormat = new Date();
  var comment = '<%= pkg.author %>' + ' - ' + dateFormat.toLocaleDateString() + ' - ' + dateFormat.getHours() + ':' + dateFormat.getMinutes();
  return src(files.jsPath)
    .pipe(terser())
    // .pipe(concat('JS.cbyk.geral.min.js'))
    .pipe(headerComment(`
            ${comment}
            License: <%= pkg.license %>
            Gerado em <%= moment().format('YYYY') %>
        `))
    .pipe(dest('dist/js')
    ); // coloca o JS final na pasta dist
}

function cacheBustTask() {
  var cbString = new Date().getTime();
  return src(['*.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}

function watchTask() {
  watch([files.scssPath, files.jsPath, 'scripts'],
    { interval: 1000, usePolling: true }, // Faz o docker funcionar
    series(
      parallel(scssTask, jsTask),
      cacheBustTask
    )
  );
}
exports.default = series(
  parallel(scssTask, jsTask),
  cacheBustTask,
  watchTask
);
