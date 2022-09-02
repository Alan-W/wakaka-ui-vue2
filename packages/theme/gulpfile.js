const { src, dest } = require('gulp')
const scss = require('gulp-sass')(require('sass'))
// const autoprefixer = require('gulp-autoprefixer');

function compile() {
  return src('./src/*.scss')
  .pipe(scss())
  // .pipe(autoprefixer({
  //   browsers: ['ie > 9', 'last 2 versions'],
  //   cascade: false
  // }))
  .pipe(dest('./lib'))
}

exports.build = compile;