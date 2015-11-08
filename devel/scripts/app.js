var xportfolio = angular.module('xportfolio', [
  'firebase',
  'ui.router',
  'iso.directives',
  'ngAnimate',
  'angulartics',
  'angulartics.google.analytics'
]);

xportfolio.config(function($stateProvider, $urlRouterProvider, $analyticsProvider) {
  
  //$locationProvider.html5Mode(true);

  $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
  $analyticsProvider.withAutoBase(true);

  $urlRouterProvider.otherwise("/intro");
  
  $stateProvider
    .state('intro', {
      url: "/intro",
      templateUrl: "templates/intro.html"
    })
    .state('portfolio', {
      url: "/portfolio",
      templateUrl: "templates/portfolio.html",
    })
    .state('bio', {
      url: "/bio",
      templateUrl: "templates/bio.html",
    })
    .state('project', {
      url: "/project/:projectID",
      templateUrl: "templates/project.html",
    });
});

