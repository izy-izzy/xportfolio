xportfolio.controller("projectsController", function($scope, portfolioProjectsService, $state, $timeout) {
    $scope.projects = portfolioProjectsService.getAllProjects();

    $scope.$emit('iso-option', {layoutMode: 'packery'});
    $scope.$emit('iso-method', {name:'layout', params:null});
    
    $scope.projectCategories = [];
    $scope.projectCategories.push("all");

    $scope.projects.$loaded(function(){
        angular.forEach($scope.projects, function(object, key){
            angular.forEach(object.categories, function(category,key){
                if ($scope.projectCategories.indexOf(key) == -1){
                    $scope.projectCategories.push(key);
                }
            });
        })
        //console.log($scope.projects);
    });

    $timeout(function(){
        $scope.$emit('iso-option', {filter: '.all'});
        $scope.$emit('iso-option', {layoutMode: 'packery'});
        $scope.$emit('iso-method', {name:'layout', params:null});
    },500);

    $scope.projectClass = function(project){
        var classString = "all";
        angular.forEach(project.categories, function(value,key){
            if (value === 1){
                classString = classString + " " + key;
            }
        })
        classString = classString + " x-" + project.width;
    	return classString;
    }
    $scope.projectY = function(project){
        return "y-"+project.height;
    }

    $scope.projectThumb = function(project){
    	return "./images/projects/"+project.image_prefix+"_thumb"+".jpg";
    }

    $scope.showProject = function(index){
        $state.go("project", {projectID:index});
    }
});

