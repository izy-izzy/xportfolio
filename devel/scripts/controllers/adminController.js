xportfolio.controller("adminController", function($scope, portfolioProjectsService, $state,$filter,$timeout) {
    $scope.allProjects = portfolioProjectsService.getAllProjectsObjects();

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

    $scope.user = {
        loginData: {
            email: "",
            password:""
        },
        uid: "",
        token: "",
        loginFailed: false,
        logoutFailed: false,
        authenticated: false
    };

    /*var ref = new Firebase("https://xportfolio.firebaseio.com");
    var authData = ref.getAuth();
    $timeout(function(){
        if (authData) {
            console.log("Authenticated user with uid:", authData.uid);
        } 
        console.log(authData);
    },10000);*/
    
    
    
    $scope.logoutofFireBase = function(){
        var logoutPromise = portfolioProjectsService.unAuth();
        hendleUnAuthResponse(logoutPromise);
    }

    $scope.logintoFireBase = function(){
        var loginPromise = portfolioProjectsService.authWithPassword($scope.user.loginData);
         handleAuthResponse(loginPromise);
    }

    function handleAuthResponse(promise) {
        $.when(promise)
            .then(
                function (authData) {
                    console.log(authData);
                    $scope.$apply(function(){
                            $scope.user.uid = authData.uid;
                            $scope.user.token = authData.token;
                            $scope.user.loginFailed = false;
                            $scope.user.authenticated = true;
                            $scope.user.loginData.password = "";
                        }
                    );
                    $scope.allProjects = portfolioProjectsService.getAllProjectsObjects();

                    console.log($scope.user);
                }, function (err) {
                    $scope.$apply(function(){
                            $scope.user.loginFailed = true;
                            $scope.user.authenticated = false;
                        }
                    );
                }
            );
    }

    function hendleUnAuthResponse(promise){
        $.when(promise)
            .then(
                function (succ) {
                    console.log(succ);
                    $scope.$apply(function(){
                            $scope.user.loginFailed = false;
                            $scope.user.authenticated = false;
                            $scope.user.uid = "";
                            $scope.user.token = "";
                        }
                    );
                    console.log($scope.user);
                }, function (err) {
                    console.log(err);
                    $scope.$apply(function(){
                            $scope.user.logoutfailed = true;
                            $scope.user.authenticated = true;
                        }
                    );
                }
            );
    }
        
    $scope.filterTypes = ['priority','name'];
    $scope.orderfilter = 'priority';

    $scope.setFilter = function(filter){
        $scope.orderfilter = filter;
    }

    $scope.toggleCategory = function(category){
        $scope.projectCategories[category] = !$scope.projectCategories[category];
    }

    $scope.toggleActiveProject = function(project){
        project.active = !project.active;
    }

    $scope.setActiveProject = function(project){
        $scope.activeproject = project;
    }

    $scope.deactivateProject = function(project){
        project.active = false;
        project.admineditstart = false;
        project.admineditend = false;
    }
    $scope.toggleAdminEditStart = function(project){
        angular.forEach($scope.allProjects, function(object,key){
            object.admineditstart = false;
        });
        project.admineditstart = true;
        $scope.reToggleAllProjects();
    }
    $scope.toggleAdminEditEnd = function(project){
        angular.forEach($scope.allProjects, function(object,key){
            object.admineditend = false;
        });
        project.admineditend = true;
        $scope.reToggleAllProjects();
    }
    $scope.reToggleAllProjects = function(){
        var toggling = false;
        var f1 = $filter('customFilter')($scope.allProjects, $scope.projectCategories);
        var f2 = $filter('toArray')(f1);
        var f3 = $filter('orderBy')(f2, 'priority');
        angular.forEach(f3, function(project,key){
            if (project.admineditstart == true){
                toggling = true;
            };
            if (toggling){
                project.active = true;
            } else {
                project.active = false;
            };
            if (project.admineditend == true){
                toggling = false;
            };
        });
    }

    $scope.adminModeProjectMove = {};
    $scope.adminModeProjectMove.value = 1;

    $scope.adminModeProjectChange = function(value){
        $scope.adminModeProjectMove.value = $scope.adminModeProjectMove.value + value;
    }

    $scope.anyProjectActive = function(){
        var out = false;
        angular.forEach($scope.allProjects, function(project,key){
            if (project.active){
                out = true;
            }
        });
        return out;
    }

    $scope.movePriority = function(){
        angular.forEach($scope.allProjects, function(project,key){
            if (project.active){
                project.priority = parseInt(project.priority) + $scope.adminModeProjectMove.value;
            }
        });
    };

    $scope.reloadProjects = function(){
        $state.go($state.current, {}, {reload: true});
    };

    $scope.saveProjects = function(){
        $scope.allProjects.$save();
        $scope.reloadProjects(); 
    }

    $scope.removePictureSettings = function(key){
        var index = $scope.activeproject['pictures_width'].indexOf(key);
        $scope.activeproject['pictures_width'].splice(index, 1); 
        console.log($scope.activeproject);
    }
    $scope.addPictureSettings = function(){
        var maxKey = 0;
        angular.forEach($scope.activeproject['pictures_width'], function(key,value){
            console.log(key, value);
            maxKey = Math.max(maxKey,key);
        });
        $scope.activeproject['pictures_width'].push({maxKey : 2});
    }
});

xportfolio.filter('customFilter', function () {
    return function (items, projectCategories) {
        var filtered = {};
        angular.forEach(items, function(project,projectValue){
            angular.forEach(projectCategories, function(key,value){
                if (project.categories.hasOwnProperty(value) && project.categories[value] == 1 && !filtered.hasOwnProperty(projectValue) && key == 1 ){
                    filtered[projectValue] = project;
                }
            });
        });
        return filtered;
    };
});

xportfolio.filter('toArray', function() { 
    return function(objects) {
        var outArray = [];
        angular.forEach(objects, function(project,projectValue){
            outArray.push(project);
        });
        return outArray;
    }

});

