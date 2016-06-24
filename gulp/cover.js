import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import { mochaRun } from './utils/runners';

gulp.task('cover', () => {
  const source = 'src/**/*.js';

  return gulp.src(source)
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
