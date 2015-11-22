xportfolio.service('portfolioProjectsService', function($firebaseArray, $firebaseObject) {
    this.getProject = function(index) {
            return $firebaseObject(new Firebase("https://xportfolio.firebaseio.com/projects/"+index));
        }
    this.getAllProjects = function() {
            return $firebaseArray(new Firebase("https://xportfolio.firebaseio.com/projects/").orderByChild("priority"));
        }

});

xportfolio.service('apiaryConnectionService', function($http, $q){
  return {
    getTestData: function(){
      return $http.get('http://private-d39ab-xportfolio.apiary-mock.com/questions');
    }
  }
});