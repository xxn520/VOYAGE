const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const staticPaths = ['img/*', 'fonts/*', 'js/vendor/*', 'css/vendor/*']

// 用 htmlmin 模拟模板引擎，去掉空格，解决 inline-block 元素间距。
gulp.task('minify', () =>
	gulp.src('*.html')
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest('dist'))
	    .pipe(browserSync.stream())
)

// css 前缀、重命名、压缩。
gulp.task('css', () =>
	gulp.src('css/*.styl')
        .pipe(stylus({ compress: true }))
		.pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(browserSync.stream())
)

// js 重命名、压缩。
gulp.task('js', () => {
	gulp.src('js/*.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'))
		.pipe(browserSync.stream())
})

// 静态资源的拷贝
gulp.task('static', () => {
	staticPaths.forEach((path) => {
		const dest = path.replace(/\/\*/, '')
		gulp.src(path)
			.pipe(gulp.dest(`dist/assets/${dest}`))
			.pipe(browserSync.stream())
	})
})

// 开启 browserSync 服务，并监听文件变化
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    })

    gulp.watch("*.html", ['minify'])
    gulp.watch("js/*.js", ['js'])
  	gulp.watch("css/*.styl", ['css'])
  	gulp.watch(staticPaths, ['static'])
})

gulp.task('default', ['static', 'css', 'js', 'minify', 'serve'])
