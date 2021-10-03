/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const isDevelopment =
  process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development';

const directory = {
  src: './src',
  dest: './dist',
};

const paths = {
  fonts: {
    src: `${directory.src}/fonts/**/*.{eot,svg,ttf,woff,woff2}`,
    dest: `${directory.dest}/fonts`,
    get watch() {
      return this.src;
    },
  },
  images: {
    src: [
      `${directory.src}/images/**/*.{gif,ico,jpg,png,svg,webp}`,
      `!${directory.src}/images/sprite/**/*.svg`,
      `${directory.src}/components/**/*.{gif,ico,jpg,png,svg,webp}`,
    ],
    dest: `${directory.dest}/images`,
    get watch() {
      return this.src;
    },
  },
  scripts: {
    src: `${directory.src}/scripts/main.ts`,
    dest: `${directory.dest}/scripts`,
    watch: [
      `${directory.src}/scripts/**/*.ts`,
      `${directory.src}/components/**/*.ts`,
    ],
  },
  styles: {
    src: `${directory.src}/styles/main.scss`,
    dest: `${directory.dest}/styles`,
    watch: [
      `${directory.src}/styles/**/*.scss`,
      `${directory.src}/components/**/*.scss`,
    ],
  },
  templates: {
    src: `${directory.src}/*.pug`,
    dest: `${directory.dest}`,
    watch: [
      `${directory.src}/*.pug`,
      `${directory.src}/templates/**/*.pug`,
      `${directory.src}/components/**/*.pug`,
    ],
  },
};

const isProductionMinimized = {
  styles: true,
  templates: true,
};

export { isDevelopment, directory, paths, isProductionMinimized };
