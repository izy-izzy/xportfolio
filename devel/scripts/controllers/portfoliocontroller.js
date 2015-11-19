xportfolio.controller("portfolioController", function($scope, portfolioProjectsService, $state, $timeout) {
    console.log("portfolio");

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
    });

    $timeout(function(){
        $scope.$emit('iso-option', {filter: '.all'});
        $scope.$emit('iso-option', {layoutMode: 'packery'});
        $scope.$emit('iso-method', {name:'layout', params:null});
    },500);

    jQuery('body').on('DOMNodeInserted', '.project-box', function () {
        $scope.rollOut(jQuery(this)[0].id);
        console.log(jQuery(this)[0].id);
    });

    $scope.rollOut = function(id){
        $timeout(function(){
            jQuery("#"+id).addClass("loaded");
        },700);
        $timeout(function(){
            jQuery("#"+id).stop().animate({
                'opacity' : 1
            },500);
            jQuery("#"+id).find('.loader').animate({
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

