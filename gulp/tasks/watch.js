/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import gulp from 'gulp';

import { paths } from '../configuration';
import { reloadServer } from './server';
import compileFonts from './fonts';
import compileImages from './images';
import compileScripts from './scripts';
import compileStyles from './styles';
import compileTemplates from './templates';

function watch() {
  const watchFor = {
    fonts: [compileFonts, reloadServer],
    images: [compileImages, reloadServer],
    scripts: [compileScripts, reloadServer],
    styles: [compileStyles],
    templates: [compileTemplates, reloadServer],
  };
  Object.keys(watchFor).forEach((path) =>
    gulp.watch(paths[path].watch, gulp.series(...watchFor[path]))
  );
}

export default watch;
