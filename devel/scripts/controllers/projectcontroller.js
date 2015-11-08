xportfolio.controller("projectController", function($scope, $stateParams, portfolioProjectsService) {
    $scope.projectId = $stateParams.projectID;
    $scope.project = portfolioProjectsService.getProject($scope.projectId);
    console.log("project:", $scope.projectId, $scope.project);

    $scope.projectThumb = function(project){
    	return "./images/"+project.image_prefix+"_thumb"+".jpg";
    }

});