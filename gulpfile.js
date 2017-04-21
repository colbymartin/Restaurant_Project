let gulp = require('gulp');

let sass = require('gulp-sass');

gulp.task('default', ['html', 'css', 'js']);

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(gulp.dest('public'));
});

gulp.task('css', function () {
    gulp.src('style.scss')
        .pipe(sass())
        .pipe(gulp.dest('public'));
});

gulp.task('js', function () {
    gulp.src('*.js')
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
    gulp.watch('*.html', ['html']);
    gulp.watch('*.scss', ['css']);
    gulp.watch('*.js', ['js']);
});
