/**
 * Created by lollipop on 2017/11/21
 */

/**
 *module dependence
 */

const join = require('path').join,
    fs = require('fs'),
    pump = require('pump'),
    minimist = require('minimist'),
    _ = require('lodash');

//argv
const argv = minimist(process.argv.slice(2));
const jsFileName = argv.file || 'index';


/**
 * plugins
 */
const gulp  = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('pug'),
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

let fileArray = ['index','nair','leaveMsg'];
//compile pug template file to html
gulp.task('compile:pug', () => {
    _.each(fileArray, pugFileName => {
        let templateStr = fs.readFileSync(join(viewDir, `${pugFileName}.pug`), 'utf8'),
            htmlTemplate = pug.render(templateStr, {
                filename: join(viewDir, `head.pug`),
                locals : require(join(srcDir,'data/data.js'))
            });
        fs.writeFile(join(srcDir,`www/${pugFileName}.html`), htmlTemplate, err => {
            if(err) throw new Error(err);
            console.log(`${pugFileName} is saved`)
        })
    });
});

//compile pug watch
gulp.task('compile:pug:watch', () => {
    gulp.watch(join(viewDir, '**/*.pug'), ['compile:pug']);
    gulp.watch(join(srcDir, 'data/data.js'), ['compile:pug']);
});

//compile scss to css
gulp.task('compile:scss', () => {
    fileArray.forEach(pugFileName=>{
        return gulp.src(join(scssDir,`${pugFileName}.scss`))
            .pipe(sourcemaps.init())
            .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
            .pipe($.autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(join(wwwDir,'styles')))
    });
});

//compile scss watch
gulp.task('compile:scss:watch', () => {
    gulp.watch(join(scssDir, '**/*.scss'), ['compile:scss'])
});

/**
 * 图片base64
 */
gulp.task('base64', () => {
    return gulp.src(join(wwwDir, 'styles', '*.css'))
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
gulp.task('ws', ['compile:pug:watch', 'compile:scss:watch', 'base64:watch','compress'], err => {});

//rename file
gulp.task('rename',function(){
    gulp.src(join(distDir,`js/bundle.js`))
        .pipe($.rename(`js/bundle.min.js`))
        .pipe(gulp.dest(join(wwwDir)))
});

gulp.task('uglify', function (cb) {
    pump([
            gulp.src(join(srcDir,`scripts/bundle.js`)),
            $.uglify(),
            gulp.dest('dist/js')
        ],
        cb
    );
});

gulp.task('compress',['uglify','rename'],err=>{
});

