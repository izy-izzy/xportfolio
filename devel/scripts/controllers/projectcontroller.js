xportfolio.controller("projectController", function($state, $scope, $stateParams, portfolioProjectsService,$timeout) {
    $scope.projectId = $stateParams.projectID;
    console.log($scope.projectId);
    $scope.project = portfolioProjectsService.getProject($scope.projectId);
    $scope.allProjects = portfolioProjectsService.getAllProjects();

    $scope.$emit('iso-option', {layoutMode: 'packery'});
    $scope.$emit('iso-method', {name:'layout', params:null});

    $scope.project.$loaded(function(){
        console.log($scope.project);
  	    if ($scope.project.name == undefined){
	    	$state.go('error404');
	    }
	});

    $timeout(function(){
        $scope.$emit('iso-option', {layoutMode: 'packery'});
        $scope.$emit('iso-method', {name:'layout', params:null});
    }, 1000);

    $timeout(function(){
        //angular.element(".isotope-container").addClass('show');
    }, 1250);


    $scope.projectImage = function(index){
    	return "./images/projects/"+$scope.project.image_prefix+"_"+index+".jpg";
    }

    $scope.projectImagesCount = function(){
        var arrayOut = [];
        if ($scope.project.images != undefined && $scope.project.images > 0){
            for (var i = 0; i < $scope.project.images; i++) {
                arrayOut.push(i);
            };
        } 
        return arrayOut;
    }

    $scope.getPictureClass = function(index){
        var w = 2;
        if ($scope.project.pictures_width && $scope.project.pictures_width[index]){
             w = $scope.project.pictures_width[index]; 
        } 
        return "x-" + w;
    }

    $scope.showPictureDetail = function(index){
        $state.go("projectimage", {'projectID':$scope.projectId, 'imageID':index});
    }

    $scope.goToProject = function(way){
        $scope.project.id;
        var indexOfThis = -1;
        for (var x = 0; x < $scope.allProjects.length; x++){
            if ($scope.allProjects[x].$id == $scope.project.$id){
                indexOfThis = x;
                break;
            }
        }
        var nextProjectIndex = -1;
        if (indexOfThis == $scope.allProjects.length-1){
            nextProjectIndex = 0;
        } else {
            nextProjectIndex = indexOfThis+1;
        }
        var prevProjectIndex = -1;
        if (indexOfThis == 0){
            prevProjectIndex = $scope.allProjects.length-1;
        } else {
            prevProjectIndex = indexOfThis-1;
        }
        
        var nextProjectID = $scope.allProjects[nextProjectIndex].$id;

        var prevProjectID = $scope.allProjects[prevProjectIndex].$id;


        if (way == 'next'){
            $state.go("project", {'projectID':nextProjectID});
        } else {
            $state.go("project", {'projectID':prevProjectID});
        }
    }
    
});