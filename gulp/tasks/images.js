/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';
import newer from 'gulp-newer';
import size from 'gulp-size';

import { paths, isDevelopment } from '../configuration';

const imageminConfig = [
  imagemin.gifsicle({
    interlaced: true,
  }),
  imagemin.mozjpeg({
    quality: 80,
  }),
  imagemin.optipng(),
  imagemin.svgo({
    plugins: [
      {
        removeViewBox: false,
      },
    ],
  }),
  imageminWebp({
    quality: 80,
  }),
];

function compileImages() {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(gulpIf(!isDevelopment, imagemin(imageminConfig)))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'compileImages',
    })))
    .pipe(gulp.dest(paths.images.dest));
}

export default compileImages;
