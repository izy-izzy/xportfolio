xportfolio.service('portfolioProjectsService', function($firebaseArray, $firebaseObject) {
  this.getProject = function(index) {
    return $firebaseObject(new Firebase("https://xportfolio.firebaseio.com/projects/"+index));
  }
  this.getAllProjects = function() {
    return $firebaseArray(new Firebase("https://xportfolio.firebaseio.com/projects/").orderByChild("priority"));
  }
  this.getAllProjectsObjects = function(){
    return $firebaseObject(new Firebase("https://xportfolio.firebaseio.com/projects/").orderByChild("priority"));
  }
  this.updateAll = function(data){
    new Firebase("https://xportfolio.firebaseio.com/projects/").update(data);
    return true;
  }
  this.authWithPassword = function(user) {
    var deferred = $.Deferred();
    var ref = new Firebase("https://xportfolio.firebaseio.com");
    ref.authWithPassword(user, function onAuth(err, user) {
        if (err) {
            deferred.reject(err);
        }
        if (user) {
            deferred.resolve(user);
        }
    });
    return deferred.promise();
  }
  this.unAuth = function(){
    var deferred = $.Deferred();
    var ref = new Firebase("https://xportfolio.firebaseio.com");
     ref.unauth(function onAuth(value) {
      console.log(value);
        if (value == null) {
          deferred.resolve(true);
        } else {
          deferred.reject(false);
        }
    });
    return deferred.promise();
  }
});

xportfolio.service('apiaryConnectionService', function($http, $q){
  return {
    getTestData: function(){
      return $http.get('http://private-d39ab-xportfolio.apiary-mock.com/questions');
    }
  }
});