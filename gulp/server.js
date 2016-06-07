import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('server', done => {
  runSequence('server-hot', 'server-nodemon', done);
});
