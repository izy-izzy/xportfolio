xportfolio.controller("portfolioController", function($scope, portfolioProjectsService, $state) {
    console.log("portfolio");

    $scope.projects = portfolioProjectsService.getAllProjects();

    $scope.$emit('iso-method', {name:'packery', params:null});

    $scope.projectXY = function(project){
    	return "x-" + project.width; // + " y-"+project.height;
    }

    $scope.projectThumb = function(project){
    	return "./images/"+project.image_prefix+"_thumb"+".jpg";
    }

    $scope.showProject = function(index){
        $state.go("project", {projectID:index});
    }
});