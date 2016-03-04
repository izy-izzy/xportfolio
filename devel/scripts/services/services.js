xportfolio.service('portfolioProjectsService', function($firebaseArray, $firebaseObject, $rootScope) {

  this.firebaseObject = null;

  this.ConnectToFirebase = function(){
    if (this.firebaseObject === null){
      this.firebaseObject = new Firebase($rootScope.settings.fireBaseHttp);
    } 
  }

  this.getProject = function(id) {
    this.ConnectToFirebase();
    return $firebaseObject(this.firebaseObject.child('projects').child(id));
  }
  this.getAllProjects = function() {
    this.ConnectToFirebase();
    return $firebaseArray(this.firebaseObject.child('projects').orderByChild("priority"));
  }
  this.getAllProjectsObjects = function(){
    this.ConnectToFirebase();
    return $firebaseObject(this.firebaseObject.child('projects').orderByChild("priority"));
  }
  this.updateAll = function(data){
    this.ConnectToFirebase();
    this.firebaseObject.child('projects').update(data);
    return true;
  }
  this.authWithPassword = function(user) {
    this.ConnectToFirebase();
    var deferred = $.Deferred();
    this.firebaseObject.authWithPassword(user, function onAuth(err, user) {
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
    this.ConnectToFirebase();
    var deferred = $.Deferred();
    this.firebaseObject.unauth(function onAuth(value) {
        if (value == null) {
          deferred.resolve(true);
        } else {
          deferred.reject(false);
        }
    });
    return deferred.promise();
  }
  this.getAuth = function(){
    this.ConnectToFirebase();
    return this.firebaseObject.getAuth();
  }
  this.testWrite = function(){
    this.ConnectToFirebase();
    var deferred = $.Deferred();
    var testdata = $firebaseObject(this.firebaseObject.child('writetest'));
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