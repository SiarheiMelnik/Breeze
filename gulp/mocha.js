import gulp from 'gulp';
import { mochaRun } from './utils/runners';

gulp.task('mocha', () => mochaRun());
