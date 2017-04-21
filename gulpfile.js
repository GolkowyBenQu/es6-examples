'use strict'

const gulp = require('gulp')
const newer = require('gulp-newer')
const htmlclean = require('gulp-htmlclean')
const concat = require('gulp-concat')
const deporder = require('gulp-deporder')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const assets = require('postcss-assets')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
const cssnano = require('cssnano')
const babel = require('babelify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')

const folder = {
  src: 'src/',
  build: 'build/'
}

gulp.task('html', () => {
  const out = folder.build + 'html/'
  return gulp.src(folder.src + 'html/**/*')
    .pipe(newer(out))
    .pipe(htmlclean())
    .pipe(gulp.dest(out))
})

gulp.task('js', ['html'], () => {
  const bundler = browserify(folder.src + 'js/index.js').transform(babel)

  return bundler.bundle()
    .on('error', err => {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest(folder.build + 'js/'))

});

gulp.task('css', ['html'], () => {
  const postCssOpts = [
    assets({ loadPaths: ['images/'] }),
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
    mqpacker
  ];

  postCssOpts.push(cssnano);

  return gulp.src(folder.src + 'scss/main.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.build + 'css/'));

});

gulp.task('run', ['html', 'js', 'css'])

gulp.task('default', ['run'])