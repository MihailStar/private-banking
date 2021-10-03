/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import { paths } from '../configuration';
import webpackConfig from '../../webpack.config.babel';

function compileScripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

export default compileScripts;
