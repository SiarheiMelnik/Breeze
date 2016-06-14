import gulp from 'gulp';
import { eslintRun } from './utils/runners';

gulp.task('eslint', () => eslintRun());
