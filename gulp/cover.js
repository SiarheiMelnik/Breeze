import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import { mochaRun } from './utils/runners';

gulp.task('cover', () => {
  const source = 'src/**/*.js';
  const exclude = '!src/**/__test__/**/*.js';

  return gulp.src([source, exclude])
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: require('isparta').Instrumenter
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      mochaRun()
      .pipe(istanbul.writeReports({
        dir: './coverage',
        reporters: ['lcov'],
        reportOpts: { dir: './coverage' }
      }));
    });
});
