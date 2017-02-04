// Define dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var parker = require('gulp-parker');
var browserSync = require('browser-sync').create();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

// Compile sass to compressed css and add vendor prefixes
gulp.task('styles', function() {
  gulp.src('app/sass/main.scss')
    .pipe(sass())
    .on('error', function(error) {
      console.log('\n ✖ ✖ ✖ ✖ ✖ ERROR ✖ ✖ ✖ ✖ ✖ \n \n' + error.message + '\n \n');
    })
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox >= 20']
    }))
    .pipe(nano())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

// Concatenate files and minify to output to scripts.min.js
gulp.task('scripts', function() {
  gulp.src(['./js/script1.js', './js/script2.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .on('error', function(error) {
      console.log('\n ✖ ✖ ✖ ✖ ✖ ERROR ✖ ✖ ✖ ✖ ✖ \n \n' + error.message + '\n \n');
    })
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// // CSS analysis tool
// gulp.task('parker', function() {
//   return gulp.src('./css/main.css')
//     .pipe(parker());
// });

// Static server + watching scss, js, html files
gulp.task('serve', ['styles', 'scripts'], function() {
  browserSync.init({
    server: './app/'
  });
  gulp.watch('app/sass/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('app/js/**/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('app/*.html').on('change', browserSync.reload);
});


// Build

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});


gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});




gulp.task('build', ['html', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});


// default task
gulp.task('default', ['serve']);