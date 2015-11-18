xportfolio.service('portfolioProjectsService', function($firebaseObject) {
    this.getProject = function(index) {
            return $firebaseObject(new Firebase("https://xportfolio.firebaseio.com/projects/"+index));
        }
    this.getAllProjects = function() {
            return $firebaseObject(new Firebase("https://xportfolio.firebaseio.com/projects/"));
        }
});