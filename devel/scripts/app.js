var xportfolio = angular.module('xportfolio', [
  'firebase',
  'ui.router',
  'ngAnimate',
  'angulartics',
  'angulartics.google.analytics',
  'iso.directives',
  'angular-images-loaded',
  'ngTouch',
  'adaptive.detection',
  'oitozero.ngSweetAlert',
  'ngAria'
]);

xportfolio.config(function($stateProvider, $urlRouterProvider,$locationProvider) {

  $urlRouterProvider.otherwise("/error404");
  $locationProvider.html5Mode(true);
  
  $stateProvider
    .state('intro', {
      url: "/",
      templateUrl: "templates/intro.html"
    })
    .state('projects', {
      url: "/projects",
      templateUrl: "templates/projects.html",
    })
    .state('bio', {
      url: "/bio",
      templateUrl: "templates/bio.html",
    })
    .state('project', {
      url: "/project/:projectID",
      templateUrl: "templates/project.html",
    })
    .state('projectimage', {
      url: "/project/:projectID/image/:imageID",
      templateUrl: "templates/projectimage.html",
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "templates/admin.html",
    })
    .state('error404',{
      url: "/error404",
      templateUrl: "templates/error404.html",
    });
}).run(function($rootScope, $state, settingsService) {
  $rootScope.$state = $state;
  settingsService.loadSettings().then(function(data) {
    $rootScope.settings = data;
  });    
 
});

