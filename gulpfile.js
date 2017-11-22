/**
 * Created by lollipop on 2017/11/21
 */

/**
 *module dependence
 */

const join = require('path').join,
    fs = require('fs'),
    pump = require('pump'),
    minimist = require('minimist');

//argv
const argv = minimist(process.argv.slice(2));
const jsFileName = argv.file || 'index';


/**
 * plugins
 */
const gulp  = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    $ = require('gulp-load-plugins')();

//dist folder
const distDir = join(__dirname, 'dist'),
//src folder
srcDir = join(__dirname, 'src'),
//views folder
viewDir = join(srcDir, 'views'),
//www folder
wwwDir = join(srcDir, 'www'),
//scss folder
scssDir = join(srcDir, 'scss');

//compile pug template file to html
gulp.task('compile:pug', () => {
    return gulp.src(join(viewDir, 'index.pug'))
        .pipe($.pug({locals: require(join(srcDir, 'data/data.js'))}))
        .pipe(gulp.dest(wwwDir))
});

//compile pug watch
gulp.task('compile:pug:watch', () => {
    gulp.watch(join(viewDir, '**/*.pug'), ['compile:pug']);
    gulp.watch(join(srcDir, 'data/data.js'), ['compile:pug']);
});

//compile scss to css
gulp.task('compile:scss', () => {
    return gulp.src(join(scssDir, 'index.scss'))
        .pipe(sourcemaps.init())
        .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(join(wwwDir,'styles')))
});

//compile scss watch
gulp.task('compile:scss:watch', () => {
    gulp.watch(join(scssDir, '**/*.scss'), ['compile:scss'])
});

/**
 * 图片base64
 */
gulp.task('base64', () => {
    return gulp.src(join(wwwDir, 'styles', 'index.css'))
        .pipe($.base64({
            extensions: ['svg', 'png', '\.jpg#datauri$/i'],
            maxImageSize: 15*1024,
            deleteAfterEncoding: false,
            debug: true
        }))
        .pipe(gulp.dest('./src/www/styles'));
});

//compile base64 watch
gulp.task('base64:watch', () => {
    gulp.watch(join(wwwDir, 'styles', 'index.css'), ['base64'])
});

//web server
gulp.task('ws', ['compile:pug:watch', 'compile:scss:watch', 'base64:watch'], err => {});

//rename file
gulp.task('rename', () => {
    gulp.src(join(distDir, `js/${jsFileName}.js`))
        .pipe($.rename(`js/${jsFileName}.min.js`))
        .pipe(gulp.dest(join(wwwDir)))
});

gulp.task('uglify', (cb) => {
    pump([
            gulp.src(join(wwwDir), `js/${jsFileName}.js`),
            $.uglify(),
            gulp.dest(join(distDir, 'js'))
        ],
        cb
    );
});

gulp.task('compress', ['uglify','rename'],err=>{});
