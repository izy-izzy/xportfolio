var xportfolio = angular.module('xportfolio', ['firebase','ui.router', 'iso.directives', 'ngAnimate']);

xportfolio.config(function($stateProvider, $urlRouterProvider) {
  
  //$locationProvider.html5Mode(true);

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
    .state('contact', {
      url: "/contact",
      templateUrl: "templates/contact.html"
    })
    .state('aboutme', {
      url: "/aboutme",
      templateUrl: "templates/aboutme.html",
    });
});