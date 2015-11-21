describe('Karma/Jasmine run test', function() {
  it('test\'s if the Karma and Jasmine works.', function() {
    var run = true;
    expect(run).toEqual(true);
  });
});

describe('Controllers Test', function() {
  beforeEach(module('xportfolio'));

  var $controller;

  beforeEach(
    inject(function(_$controller_){
      $controller = _$controller_;
  }));

  describe('Controllers test', function() {
    it('Existence of controllers', function() {
      var $scope = {};
      //var $scope = $rootScope.$new();
      var introController = $controller('introController', { $scope: $scope });
      /*var portfolioController = $controller('portfolioController', { $scope: $scope });
      var projectController = $controller('projectController', { $scope: $scope });
      var projectImageController = $controller('projectImageController', { $scope: $scope });*/
      var error404Controller = $controller('error404Controller', { $scope: $scope });
      var bioController = $controller('bioController', { $scope: $scope });

      /*$scope.passTest();
      expect($scope.pass).toEqual(true);*/
    });
  });
});