var gulp = require('gulp'),
watch = require('gulp-watch'), 
webpack = require('webpack'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', (error) => console.log(error.toString()))
    .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {    
      baseDir: 'app'   
   }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });
  watch('./app/assets/styles/**/*.css', gulp.parallel('waitForStyles'));
  watch('./app/assets/scripts/**/*.js', gulp.parallel('waitForScripts'));
});

gulp.task('waitForStyles', gulp.series('styles', function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}))

gulp.task('waitForScripts', gulp.series('scripts', function(cb) {
  browserSync.reload();
  cb()
})); 