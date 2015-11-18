xportfolio.controller("portfolioController", function($scope, portfolioProjectsService, $state, $timeout) {
    console.log("portfolio");

    $scope.projects = portfolioProjectsService.getAllProjects();

    $timeout(function(){
        $scope.$emit('iso-option', {layoutMode: 'packery'});
        $scope.$emit('iso-method', {name:'layout', params:null});
    },500);
        
    $scope.projectXY = function(project){
    	return "x-" + project.width; // + " y-"+project.height;
    }

    $scope.projectThumb = function(project){
    	return "./images/projects/"+project.image_prefix+"_thumb"+".jpg";
    }

    $scope.showProject = function(index){
        $state.go("project", {projectID:index});
    }

});

