var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer')
    mediaQueries = require('gulp-group-css-media-queries')


gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(mediaQueries())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
    return gulp.src([
        'app/js/common.js'
    ])
    .pipe(concat('common.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/'))
});

gulp.task('css-libs', ['sass'], function(){
    return gulp.src([
            'app/css/libs.css',
            'app/css/animate.css',
            'app/css/style.css',
        ])
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function(){
    browserSync({              
        server: {
            baseDir: 'app/'
        },
        notify: false
    });
});

gulp.task('clean', function(){
    return del.sync('dist');
});

gulp.task('clear', function(){
    return cache.clearAll();
});

gulp.task('img', function(){
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});



gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){
    var buildCss = gulp.src([
        'app/css/libs.min.css',
        'app/css/style.css',
        'app/css/style.min.css',
        'app/css/animate.min.css',
        'app/css/owl.theme.default.min.css',
        'app/css/owl.carousel.min.css'
    ])
    .pipe(gulp.dest('dist/css'));
    var buildSass = gulp.src([
        'app/sass/**'
    ])
    .pipe(gulp.dest('dist/sass'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src([
                'app/*.*',
                'app/.htaccess',
            ])
        .pipe(gulp.dest('dist'));
    var buildLibs = gulp.src('app/libs/')
        .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['browser-sync', 'css-libs', 'scripts'], function(){
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});