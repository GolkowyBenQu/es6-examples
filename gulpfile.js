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

gulp.task('copy:html', () => {
  const out = folder.build
  return gulp.src(folder.src + 'html/**/*')
    .pipe(newer(out))
    .pipe(htmlclean())
    .pipe(gulp.dest(out))
})

gulp.task('build:js', ['copy:html'], () => {
  const bundler = browserify(folder.src + 'js/index.js').transform(babel)

  return bundler.bundle()
    .on('error', err => {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest(folder.build + 'js/'))

})

gulp.task('build:css', ['copy:html'], () => {
  const postCssOpts = [
    assets({loadPaths: ['images/']}),
    autoprefixer({browsers: ['last 2 versions', '> 2%']}),
    mqpacker
  ]

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
})

gulp.task('copy:images', () => {
  gulp.src(folder.src + 'images/**/*')
    .pipe(gulp.dest(folder.build + 'images'))

  gulp.src(folder.src + 'fonts/**/*')
    .pipe(gulp.dest(folder.build + 'fonts'))
})

gulp.task('watch', () => {
  gulp.watch(folder.src + 'html/**/*', [ 'copy:html' ])
  gulp.watch(folder.src + 'js/index.js', [ 'build:js' ])
  gulp.watch(folder.src + 'scss/main.scss', [ 'build:css' ])
  gulp.watch(folder.src + 'images/**/*', [ 'copy:images' ])
})

gulp.task('run', ['copy:html', 'build:js', 'build:css', 'copy:images'])

gulp.task('default', ['run'])