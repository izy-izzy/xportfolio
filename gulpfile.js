var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var coffee = require('gulp-coffee');

gulp.task('default', ['sass', 'scripts', 'watch']);

gulp.task('watch', function(){
	gulp.watch([
		'/devel/sass/*.scss',
		'/devel/sass/*/*.scss'
		], ['sass']);
	gulp.watch([
		'/devel/scripts/*.coffee',
		'/devel/scripts/*/*.coffee',
		'/devel/scripts/*.js',
		'/devel/scripts/*/*.js',
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

gulp.task('coffee', function() {
  return gulp.src('./devel/scripts/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./devel/scripts/'))
});

gulp.task('scripts', ['coffee'], function() {
	return gulp.src([
		'./devel/bower_components/js-polyfills/polyfill.min.js',
		'./devel/bower_components/jquery/dist/jquery.min.js',
		'./devel/bower_components/bootstrap/dist/js/bootstrap.min.js',
		'./devel/bower_components/firebase/firebase.js',
		
		'./devel/bower_components/jquery-bridget/jquery.bridget.js',
		'./devel/bower_components/get-style-property/get-style-property.js',
		'./devel/bower_components/get-size/get-size.js',
		'./devel/bower_components/eventEmitter/EventEmitter.js',
		'./devel/bower_components/eventie/eventie.js',
		'./devel/bower_components/doc-ready/doc-ready.js',
		'./devel/bower_components/matches-selector/matches-selector.js',
		'./devel/bower_components/fizzy-ui-utils/utils.js',
		'./devel/bower_components/outlayer/item.js',
		'./devel/bower_components/outlayer/outlayer.js',

		'./devel/bower_components/masonry/masonry.js',

		'./devel/bower_components/imagesloaded/imagesloaded.js',

		'./devel/bower_components/isotope/dist/isotope.pkgd.js',
		'./devel/bower_components/angular/angular.min.js',
		'./devel/bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'./devel/bower_components/angularfire/dist/angularfire.min.js',

		'./devel/bower_components/angular-isotope/dist/angular-isotope.js',
		'./devel/bower_components/isotope-packery/packery-mode.pkgd.js',
		
		//'./devel/bower_components/angular-masonry/angular-masonry.js',

		'./devel/bower_components/angular-images-loaded/angular-images-loaded.js',
		'./devel/bower_components/angular-touch/angular-touch.min.js',

		'./devel/bower_components/angular-animate/angular-animate.min.js',	
		'./devel/bower_components/angulartics/dist/angulartics.min.js',
		'./devel/bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',	
		'./devel/_components/Snap_svg/dist/snap.svg.js',
		'./devel/_components/tympanus/svgicons/svgicons-config.js',
		'./devel/_components/tympanus/svgicons/svgicons.js',
		'./devel/scripts/coffee-scripts.js',
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