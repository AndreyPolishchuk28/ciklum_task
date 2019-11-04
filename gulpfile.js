const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache')

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/index.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*'
    },
    watch: {
        html: 'src/index.html',
        js: 'src/js/index.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*'
    },
    clean: './build/'
};

/************ C A L L B A C K S **************/

const htmlBuild = () => {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html, {allowEmpty:true}));
};

const imgBuild = () => {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img, {allowEmpty:true}));
};

const scssBuild = () => {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                overrideBrowserslist: ['>0.2%'],
                cascade: false
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
};

const jsBuild = () => {
    return gulp.src(path.src.js)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(path.build.js))
};

const watcher = (done) => {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    gulp.watch(path.watch.html, gulp.task('htmlBuild')).on('change', browserSync.reload);
    gulp.watch(path.watch.img, gulp.task('img')).on('change', browserSync.reload);
    gulp.watch(path.watch.style, scssBuild).on('change', browserSync.reload);
    gulp.watch(path.watch.js, jsBuild).on('change', browserSync.reload);
    gulp.watch(path.watch.img, gulp.task('img')).on('change', browserSync.reload);
    done();
};

const cleanBuild = () => {
    return gulp.src(path.clean,{allowEmpty: true, read:false})
        .pipe(clean());
};


/************ T A S K S **************/

gulp.task('htmlBuild', htmlBuild);
gulp.task('imgBuild', imgBuild);
gulp.task('scssBuild', scssBuild);
gulp.task('jsBuild', jsBuild);
gulp.task('clean', cleanBuild);
gulp.task('build', gulp.series(
    cleanBuild,
    htmlBuild,
    scssBuild,
    jsBuild,
    imgBuild,
    watcher
));

