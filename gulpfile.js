var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var gutil = require('gulp-util');

gulp.task('default', ['less', 'watch', 'scripts']);

gulp.task('watch', function(){
	gulp.watch([
		'./devel/less/*.less',
		'./devel/less/*/*.less'
		], ['less']);
	gulp.watch([
		'./devel/scripts/*.js',
		'./devel/scripts/*/*.js',
		], ['scripts']);
	});

gulp.task('less', function () {
  return gulp.src('./devel/less/style.less')
    .pipe(less().on('error', 
    	function(e) {
    		gutil.log(e);
    		this.emit('end');
    	})
    )
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('scripts', function() {
	return gulp.src([		
		'./devel/bower_components/jquery/dist/jquery.js',
		'./devel/bower_components/firebase/firebase.js',
		'./devel/bower_components/angular/angular.js',
		'./devel/bower_components/angular-ui-router/release/angular-ui-router.js',
		'./devel/bower_components/angularfire/dist/angularfire.js',
		'./devel/bower_components/isotope/dist/isotope.pkgd.js',
		'./devel/bower_components/masonry/dist/masonry.pkgd.js',
		'./devel/bower_components/angular-isotope/dist/angular-isotope.js',
		'./devel/bower_components/angular-animate/angular-animate.js',	
		'./devel/scripts/app.js',
		'./devel/scripts/*/*.js'
		])
	.pipe(concat('app.min.js'))
	/*.pipe(uglify().on('error', 
    	function(e) {
    		gutil.log(e);
    		this.emit('end');
    	}))*/
	.pipe(gulp.dest('./public/js/'))
});