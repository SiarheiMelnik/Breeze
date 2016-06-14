import gulp from 'gulp';
import { mochaRun } from './utils/runners';

gulp.task('mocha-watch', () => {
  gulp.watch(
    ['src/browser/**', 'src/common/**', 'src/server/**'],
    mochaRun()
  );
});
