const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const bs = require('browser-sync').create();
const del = require('del');
const imagemin = require('gulp-imagemin');

const sourceDir = './src';
const distDir = './docs';

const runSass = () =>
  gulp
    .src(`${sourceDir}/scss/main.scss`)
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest(`${distDir}/css`))
    .pipe(bs.stream());

const copyHtml = () =>
  gulp
    .src(`${sourceDir}/**/*.html`)
    .pipe(gulp.dest(distDir, { base: sourceDir }));

const copyImages = () =>
  gulp
    .src(`${sourceDir}/img/**/*.*`)
    .pipe(
      imagemin([imagemin.jpegtran({ progressive: true })], { verbose: true })
    )
    .pipe(gulp.dest(`${distDir}/img`, { base: sourceDir }));

const runClean = () => del([distDir]);

const runBuild = gulp.series(runClean, runSass, copyHtml, copyImages);

const reload = done => {
  bs.reload();
  done();
};

gulp.task('bs', () => {
  bs.init({
    server: {
      baseDir: distDir
    }
  });
  gulp.watch(`${sourceDir}/scss/**/*.scss`, runSass);
  gulp.watch(`${sourceDir}/**/*.html`, gulp.series(copyHtml, reload));
  gulp.watch(`${sourceDir}/img/**/*.*`, gulp.series(copyImages, reload));
});

gulp.task('serve', gulp.series(runBuild, 'bs'));
gulp.task('build', runBuild);
