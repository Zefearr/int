var gulp = require('gulp'),
watch = require('gulp-watch'), 
webpack = require('webpack'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin');
 
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



// gulp.task('prevDist', function(){
//   browserSync.init({
//       notify: false, 
//       server: {    
//        baseDir: 'docs'    
//     }  
//   }); 
// })

// gulp.task('deleteDist', ['icons'], function(){
// return del('./docs'); 
// })    


// gulp.task('moveModels',  ['deleteDist'],  function(){
// return gulp.src('./app/assets/models/**.fbx')
//   .pipe(gulp.dest('./docs/assets/models'));
// })
// gulp.task('moveTextures', ['deleteDist'],  function(){
//   return gulp.src('./app/assets/images/**/*.png')
//       .pipe(gulp.dest('./docs/assets/images/'));
//   })
// gulp.task('useminTrigger', ['deleteDist'], function(){
// gulp.start('usemin')
// }) 
// gulp.task('usemin', ['styles', 'scripts'], function(){
// return gulp.src('./app/index.html')
//   .pipe(usemin({
//       css: [function(){return rev()}, function(){return cssnano()}],
//       js: [function(){return rev()}, function(){return uglify()}] 
//   }))
//   .pipe(gulp.dest('./docs'));
// })
// gulp.task('build', ['deleteDist', 'useminTrigger', 'moveModels', 'moveTextures']);    

gulp.task('build', function(){console.log('test')});

gulp.task('optimizeImages', function(){
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/sprites'])
    .pipe(imagemin({
      progressive:true,
      interlaced:true,
      multipass: true
    }))
    .pipe(gulp.dest('./dist/assets/images')); 
}); 
gulp.task('deleteDist', function() {
  return del('./dist');
});
gulp.task('usemin', function(){
  return gulp.src('./app/index.html')
    .pipe(usemin())
    .pipe(gulp.dest('./dist'));
});
gulp.task('build',  gulp.series('deleteDist', 'optimizeImages', 'usemin'));  

