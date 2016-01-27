var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');


gulp.task('default', function () {
    return gulp
        .src([
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'ts-helpers.js',
            'dist/bundle.js'
        ])
        .pipe(concat('bundle-all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});