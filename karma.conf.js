// Karma configuration
// Generated on Fri Nov 20 2015 18:25:51 GMT+0100 (Střední Evropa (běžný čas))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
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

        './devel/bower_components/angular-adaptive-detection/angular-adaptive-detection.min.js',

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

        './devel/bower_components/angular-mocks/angular-mocks.js',

        './devel/scripts/coffee-scripts.js',
        './devel/scripts/app.js',
        './devel/scripts/animations/*.js',
        './devel/scripts/directives/*.js',
        './devel/scripts/services/*.js',
        './devel/scripts/factories/*.js',
        './devel/scripts/controllers/*.js',
        './devel/scripts/tests/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    //browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
