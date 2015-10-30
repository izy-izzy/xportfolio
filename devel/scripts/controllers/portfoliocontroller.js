xportfolio.controller("portfolioController", function($scope, portfolioProjects) {
    console.log("portfolio");

    $scope.projects = portfolioProjects;

    $scope.$emit('iso-method', {name:'packery', params:null});

    console.log($scope.projects);

    $scope.projectXY = function(project){
    	return "x-" + project.width; // + " y-"+project.height;
    }

    $scope.projectThumb = function(project){
    	return "./images/"+project.image_prefix+"_thumb"+".jpg";
    }
});