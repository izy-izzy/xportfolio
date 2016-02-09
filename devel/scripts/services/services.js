xportfolio.service('portfolioProjectsService', function($firebaseArray, $firebaseObject, $rootScope) {
  this.getProject = function(id) {
    return $firebaseObject(new Firebase($rootScope.settings.fireBaseHttp+"/projects/"+id));
  }
  this.getAllProjects = function() {
    return $firebaseArray(new Firebase($rootScope.settings.fireBaseHttp+"/projects/").orderByChild("priority"));
  }
  this.getAllProjectsObjects = function(){
    return $firebaseObject(new Firebase($rootScope.settings.fireBaseHttp+"/projects/").orderByChild("priority"));
  }
  this.updateAll = function(data){
    new Firebase($rootScope.settings.fireBaseHttp+"/projects/").update(data);
    return true;
  }
  this.authWithPassword = function(user) {
    var deferred = $.Deferred();
    var ref = new Firebase($rootScope.settings.fireBaseHttp);
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
    var ref = new Firebase($rootScope.settings.fireBaseHttp);
     ref.unauth(function onAuth(value) {
        if (value == null) {
          deferred.resolve(true);
        } else {
          deferred.reject(false);
        }
    });
    return deferred.promise();
  }
  this.getAuth = function(){
    var ref = new Firebase($rootScope.settings.fireBaseHttp);
    return ref.getAuth();
  }
  this.testWrite = function(){
    var deferred = $.Deferred();
    var testdata = $firebaseObject(new Firebase($rootScope.settings.fireBaseHttp+"/writetest/"));
    testdata.writeme = 0;
    testdata.$save().then(function(ref) {
        deferred.resolve(true);
      }, function(error) {
        deferred.reject(false);
    });
    return deferred.promise();
  }
});

xportfolio.service('apiaryConnectionService', function($http, $q, $rootScope){
  return {
    getTestData: function(){
      return $http.get($rootScope.settings.apiaryTestHttp);
    }
  }
});

xportfolio.service('settingsService', function($http, $q){
  return {
    loadSettings : function(){
      var deferred = $q.defer();
      $http.get('settings.json')
        .then(
          function success(response) {
            deferred.resolve(response.data);
          }, 
          function error(response) {
            deferred.reject;
          }
        );
      return deferred.promise;
    }
  }
});