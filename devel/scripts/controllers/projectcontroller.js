xportfolio.controller("projectController", function($state, $scope, $stateParams, portfolioProjectsService) {
    $scope.projectId = $stateParams.projectID;
    $scope.project = portfolioProjectsService.getProject($scope.projectId);

    $scope.project.$loaded(function(){
  	    if ($scope.project.name == undefined){
	    	$state.go('error404');
	    }
	});

    $scope.projectThumb = function(project){
    	return "./images/"+project.image_prefix+"_thumb"+".jpg";
    }

});