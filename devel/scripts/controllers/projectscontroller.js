xportfolio.controller("projectsController", function($scope, portfolioProjectsService, $state, $timeout) {
    console.log("projectsController");

    $scope.checked = true;
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
        console.log($scope.projects);
    });

    $timeout(function(){
        $scope.$emit('iso-option', {filter: '.all'});
        $scope.$emit('iso-option', {layoutMode: 'packery'});
        $scope.$emit('iso-method', {name:'layout', params:null});
        //$scope.$emit('iso-option', {sortBy : 'random' });
    },500);

    angular.element('body').on('DOMNodeInserted', '.project-box', function () {
        if (angular.element(this)[0].id != ""){
            $scope.rollOut(angular.element(this)[0].id);
            //console.log("DOMNodeInserted: id:", angular.element(this)[0].id);
        }
    });

    $scope.rollOut = function(id){
        $timeout(function(){
            angular.element("#"+id).addClass("loaded");
        },700);
        $timeout(function(){
            angular.element("#"+id).stop().animate({
                'opacity' : 1
            },500);
            angular.element("#"+id).find('.loader').animate({
                'width' : 100,
                'opacity' : 1
            },Math.floor((Math.random()*2000)+50));
        },200);
    }
        
    $scope.projectClass = function(project){
        var classString = "all";
        angular.forEach(project.categories, function(value,key){
            classString = classString + " " + key;
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

