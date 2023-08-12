"use strict";

const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
// const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const autoPrefixer = require("gulp-autoprefixer");
// const cssnano = require("cssnano");

function convertcss(done) {
  src("scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    // .pipe(postcss([autoprefixer(), cssnano()]))
    // .pipe(postcss([autoprefixer()]))
    .pipe(autoPrefixer())
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));

  done();
}

function translate() {
  watch("scss/**/*.scss", convertcss);
}

exports.convertcss = convertcss;
exports.translate = translate;
exports.default = series(convertcss, translate);
