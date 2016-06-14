import gulp from 'gulp';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import path from 'path';

const mochaRun = (file) => {
  let source = 'src/**/__test__/**/*.js';

  if (file) {
    if (file.path.indexOf('__test__') !== -1) {
      source = file.path;
    } else {
      const parts = file.path.split(path.sep);
      const filename = parts.pop(1);
      const dir = parts.join(path.sep);
      source = `${dir}/__test__/${filename.split('.')[0]}*.js`;
    }
  }

  console.log(`Running ${source}`);
  gulp.src(source, { read: false })
    .pipe(mocha({
      require: ['./resources/mochaSetup.js'],
      reporter: 'spec'
    }))
    .on('error', error => {
      if (error.stack) {
        gutil.log(error);
      }
      process.exit(1);
    });
};

const eslintRun = () =>
  gulp.src([
    'gulp/**/*.js',
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js'
  ], { base: './' })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

export default {
  eslintRun,
  mochaRun
};
