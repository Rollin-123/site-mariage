// Initialize modules
const { src, dest, watch, series, task } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

// Html Task
task(
    'htmlTask',
    series(
        function () {
            // Gets .html and .nunjucks files in pages
            return (
                src('app/pages/**/*.+(html|nunjucks)')
                    // Renders template with nunjucks
                    .pipe(
                        nunjucksRender({
                            path: ['app/templates/'],
                        })
                    )
                    // output files in app folder
                    .pipe(dest('dist'))
            );
        } /*,
      function() {
        return src('dist/*.+(html|nunjucks)')
        .pipe(dest('dist'));
      },
      function () {
        return del('dist/', { force:true });
      }*/
    )
);

// Sass Task
task('scssTask', function () {
    return src('app/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
});

// JavaScript Task
task('jsTask', function () {
    return src('app/js/script.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
});

// Copy other
// task(
//     'assetsTask',
//     series(function () {
//         return src(['favicon.ico']).pipe(dest('dist'));
//     })
// );

// Browsersync
task('browserSyncServe', function (cb) {
    browsersync.init({
        server: {
            baseDir: 'dist/',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
});

task('browserSyncReload', function (cb) {
    browsersync.reload();
    cb();
});

task('copy-assets', series('htmlTask', 'scssTask', 'jsTask'));
//task('copy-assets', series('htmlTask', 'scssTask', 'jsTask', 'assetsTask'));

// task(
//     'deploy',
//     series('copy-assets', function () {
//         return src(['dist/**/*']).pipe(
//             dest('/var/www/digital-x-sarl.com/html')
//         );
//     })
// );

// Watch Task
// function watchTask() {
//     watch(
//         ['app/scss/**/*.scss', 'app/**/*.js', 'images/*'],
//         series(scssTask, jsTask, imgTask, browserSyncReload)
//     );
// }
task('watchTask', function () {
    watch(
        ['*.html', 'app/pages/**/*.html'],
        series('htmlTask', 'browserSyncReload')
    );
    watch(
        ['app/scss/**/*.scss', 'app/js/**/*.js'],
        series('scssTask', 'jsTask', 'browserSyncReload')
    );
    //watch(['*.ico'], series('assetsTask', 'browserSyncReload'));
});

// Default Gulp Task
exports.default = series('copy-assets', 'browserSyncServe', 'watchTask');
