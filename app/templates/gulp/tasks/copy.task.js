module.exports = function (gulp, config, $, args) {

    var merge = require('merge-stream');

    // Copy image files
    gulp.task('copy:images', ['clean:images'], function () {
        config.fn.log('Compressing and copying images');

        return gulp
            .src(config.resource.images)
            .pipe($.imagemin({optimizationLevel: 4}))
            .pipe(gulp.dest(config.build.dev + 'static/images'));
    });

    // Copy font files
    gulp.task('copy:fonts', ['clean:fonts'], function () {
        config.fn.log('Copying all fonts files');

        return copy(config.resource.fonts, config.build.dev + 'static/fonts');
    });

    // Copy javascript files
    gulp.task('copy:js', ['clean:js'], function () {
        config.fn.log('Copying all javascript files');

        var jsStream = gulp
            .src(config.js.app.source)
            .pipe(gulp.dest(config.build.dev + 'static'));

        // Also copy mock files if --mock is on
        if (args.mock) {
            var mockStream = gulp
                .src(config.js.test.stubs)
                .pipe(gulp.dest(config.build.dev + 'static/test'));
            return merge(jsStream, mockStream);
        } else {
            return jsStream;
        }
    });

    // Copy bower dependency files
    gulp.task('copy:vendor', ['clean:vendor'], function () {
        config.fn.log('Copying bower dependency files');

        return copy(config.bower.source + '/**/*', config.bower.target);
    });

    // Copy image files to prod folder
    gulp.task('copy:images:prod', function () {
        return copy(config.build.dev + 'static/images/**/*', config.build.prod + 'static/images');
    });

    // Copy fonts files to prod folder
    gulp.task('copy:fonts:prod', function () {
        return copy(config.build.dev + 'static/images', config.build.prod + 'static/images');
    });

    ////////

    function copy (src, dest) {
        return gulp
            .src(src)
            .pipe(gulp.dest(dest));
    }
};