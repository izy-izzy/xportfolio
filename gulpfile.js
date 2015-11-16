var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['sass', 'scripts', 'watch' ]);

gulp.task('watch', function(){
	gulp.watch([
		'./devel/sass/*.scss',
		'./devel/sass/*/*.scss'
		], ['sass']);
	gulp.watch([
		'./devel/scripts/*.js',
		'./devel/scripts/*/*.js',
		], ['scripts']);
	});

gulp.task('sass', function () {
  return gulp.src('./devel/sass/style.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', 
    	function(e) {
    		gutil.log(e);
    		this.emit('end');
    	})
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('scripts', function() {
	return gulp.src([		
		'./devel/bower_components/jquery/dist/jquery.min.js',
		'./devel/bower_components/bootstrap/dist/js/bootstrap.min.js',
		'./devel/bower_components/firebase/firebase.js',
		'./devel/bower_components/angular/angular.min.js',
		'./devel/bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'./devel/bower_components/angularfire/dist/angularfire.min.js',
		'./devel/bower_components/isotope/dist/isotope.pkgd.min.js',
		'./devel/bower_components/masonry/dist/masonry.pkgd.min.js',
		'./devel/bower_components/angular-isotope/dist/angular-isotope.min.js',
		'./devel/bower_components/angular-animate/angular-animate.min.js',	
		'./devel/bower_components/angulartics/dist/angulartics.min.js',
		'./devel/bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',	
		'./devel/_components/Snap_svg/dist/snap.svg.js',
		'./devel/_components/tympanus/svgicons/svgicons-config.js',
		'./devel/_components/tympanus/svgicons/svgicons.js',
		'./devel/scripts/app.js',
		'./devel/scripts/*/*.js'
		])
	.pipe(concat('app.min.js'))
	//disable for devel 
	/*
	.pipe(sourcemaps.init())
	.pipe(uglify({mangle: false}).on('error', 
    	function(e) {
    		gutil.log(e);
    		this.emit('end');
    	}))
	.pipe(sourcemaps.write('./'))
	*/
	.pipe(gulp.dest('./public/js/'))
});