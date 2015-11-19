xportfolio.controller("projectImageController", function($state, $scope, $stateParams, portfolioProjectsService,$timeout) {
	console.log('projectImageController');
	$scope.projectId = $stateParams.projectID;
	$scope.imageId = $stateParams.imageID;
    $scope.project = portfolioProjectsService.getProject($scope.projectId);

    $scope.getImage = function(index){
    	return "./images/projects/"+$scope.project.image_prefix+"_"+$scope.imageId+".jpg";
    }

    $scope.goToImage = function(way){
    	var imagesCount = $scope.project.images - 1;
    	var nextImage = -1;
    	var prevImage = -1;
    	if ($scope.imageId >= imagesCount) {
    		nextImage = 0;
    	} else {
    		nextImage = parseInt($scope.imageId) + 1;
    	}
    	if ($scope.imageId <= 0) {
    		prevImage = imagesCount;
    	} else {
    		prevImage = parseInt($scope.imageId) - 1;
    	}
		if (way == 'next'){
            $state.go("projectimage", {'projectID':$scope.projectId, 'imageID':nextImage});
        } else {
            $state.go("projectimage", {'projectID':$scope.projectId, 'imageID':prevImage});
        }
    }

});