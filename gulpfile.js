var gulp = require('gulp');
var bump = require('gulp-bump');

gulp.task('upgrade_version', gulp.series((done) => {
    gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
    console.log('upgrade is done');
    done();
}));






