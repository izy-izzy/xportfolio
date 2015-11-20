describe('IntroController', function() {
  beforeEach(module('xportfolio'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.passTest', function() {
    it('default jasmine and karma test', function() {
      var $scope = {};
      var controller = $controller('bioController', { $scope: $scope });
      $scope.passTest();
      expect($scope.pass).toEqual(true);
    });
  });
});