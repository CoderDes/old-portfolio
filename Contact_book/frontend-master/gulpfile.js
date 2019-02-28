const gulp = require('gulp');
const sass = require('gulp-sass');

const path = {
	scss: './assets/scss'
}
 
gulp.task('sass', () => {
  return gulp.src(`${path.scss}/main.scss`)
  	.pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('sass:watch', () => {
  gulp.watch(`${path.scss}/*/*.scss`, ['sass']);
});


gulp.task('default', ['sass', 'sass:watch']);