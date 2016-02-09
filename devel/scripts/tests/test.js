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
    inject(function(_$controller_, $rootScope){
      $controller = _$controller_;
      $rootScope.settings = {
        fireBaseHttp : 'https://xportfolio.firebaseio.com',
        apiaryTestHttp : 'http://private-d39ab-xportfolio.apiary-mock.com/questions'
      }
  }));

  describe('Controllers test', function() {
    it('Existence of controllers', function() {
      var $scope = {};
      var introController = $controller('introController', { $scope: $scope });
      var error404Controller = $controller('error404Controller', { $scope: $scope });
      var bioController = $controller('bioController', { $scope: $scope });
    });
  });
});