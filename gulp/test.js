import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', done => {
  runSequence('eslint', 'mocha', 'build-webpack', done);
});
