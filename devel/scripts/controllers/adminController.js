xportfolio.controller("adminController", function($scope, portfolioProjectsService) {
    $scope.allProjects = portfolioProjectsService.getAllProjects();

    $scope.projectCategories = {};

    $scope.allProjects.$loaded(function(){
        angular.forEach($scope.allProjects, function(object, key){
            angular.forEach(object.categories, function(category,key){
                if (!$scope.projectCategories.hasOwnProperty(key)){
                    $scope.projectCategories[key] = 1;
                }
            });
        })
    });

    $scope.filterTypes = ['priority','name'];
    $scope.orderfilter = 'priority';

    $scope.toggleCategory = function(category){
        $scope.projectCategories[category] = !$scope.projectCategories[category];
    }

    $scope.setActiveProject = function(project){
        $scope.activeproject = project;
        console.log($scope.activeproject,$scope.activeproject.pictures_width);
    }
});

xportfolio.filter('customFilter', function () {
    return function (items, projectCategories) {
        var filtered = [];
        angular.forEach(items, function(project,projectValue){
            angular.forEach(projectCategories, function(key,value){
                if (project.categories.hasOwnProperty(value) && project.categories[value] == 1 && filtered.indexOf(project) == -1 && key == 1 ){
                    filtered.push(project);
                }
            });
        });
        return filtered;
    };
});

