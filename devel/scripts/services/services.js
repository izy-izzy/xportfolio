xportfolio.service('portfolioProjectsService', function($firebaseArray, $firebaseObject) {
    this.getProject = function(index) {
            return $firebaseObject(new Firebase("https://xportfolio.firebaseio.com/projects/"+index));
        }
    this.getAllProjects = function() {
            return $firebaseArray(new Firebase("https://xportfolio.firebaseio.com/projects/"));
        }
});