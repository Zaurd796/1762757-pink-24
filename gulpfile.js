import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from "postcss-csso";
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from "gulp-htmlmin";
import terser from 'gulp-terser';
import concat from "gulp-concat";
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";
import del from 'del';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
}

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
  .pipe(concat("main.min.js"))
  .pipe(terser())
  .pipe(gulp.dest("build/js"))
  .pipe(browser.stream());
}

// images

const optimizeImages = () => {
  return gulp.src(["source/img/**/*.{jpg,png}", "!source/img/favicon/*.{jpg,png}"])
  .pipe(squoosh())
  .pipe(gulp.dest("build/img"));
}

const copyImages = () => {
  return gulp.src(["source/img/**/*.{jpg,png}", "!source/img/favicon/*.{jpg,png}"])
  .pipe(gulp.dest("build/img"));
}

// Webp

const createWebp = () => {
  return gulp.src("source/img/content/*.{jpg,png}")
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest("build/img/content"));
}

// SVG

const svg = () => {
 return gulp.src(["source/img/*.svg", "!source/img/icons/*.svg"])
  .pipe(svgo())
  .pipe(gulp.dest("build/img"));
}



const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
  .pipe(svgo())
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: {xmlMode: true}
  }))
  .pipe(replace('&gt;', '>'))
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img/sprite"));
}

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2, woff}",
    "source/*.ico",
    "source/img/favicon/*.{png,svg}",
    "source/manifest.webmanifest"
  ],
  {
    base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
}

// Clean

const clean = () => {
  return del("build");
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
);

// Default


export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
