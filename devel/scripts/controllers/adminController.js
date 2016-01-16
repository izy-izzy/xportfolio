xportfolio.controller("adminController", function($scope, portfolioProjectsService, $state,$filter,$timeout,$interval,SweetAlert) {
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
        authenticated: false,
        writeEnabled: false,
    };


    $scope.testWritePermission = function(){
        var testWrite = portfolioProjectsService.testWrite();
        handleWriteTest(testWrite);
    }

    function handleWriteTest(promise){
        $.when(promise)
            .then(
                function (authData) {
                    $scope.user.writeEnabled = true;
                }, function (err) {
                    $scope.user.writeEnabled = false;
                }
            );
    }

    $scope.checkAuthentication = function(){
        var authData = portfolioProjectsService.getAuth();
        if (authData) {
            $scope.user.loginData.email = authData.password.email;
            $scope.user.uid = authData.uid;
            $scope.user.token = authData.token;
            $scope.user.loginFailed = false;
            $scope.user.logoutFailed = false;
            $scope.user.authenticated = true;   
            $scope.testWritePermission();
        } else {
            if ($scope.user.authenticated){
                $scope.user.loginData.email = "";
                $scope.user.uid = "";
                $scope.user.token = "";
                $scope.user.loginFailed = false;
                $scope.user.logoutFailed = false;
                $scope.user.authenticated = false;
                SweetAlert.swal({
                    title: "Your session expired.",
                    type: "warning",
                    confirmButtonColor: "#DD6B55",
                });
            }
        }
    }
    $scope.checkAuthentication();
    $interval(function(){
        $scope.checkAuthentication();
    },20000);
 
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
                    $scope.$apply(function(){
                            $scope.user.uid = authData.uid;
                            $scope.user.token = authData.token;
                            $scope.user.loginFailed = false;
                            $scope.user.authenticated = true;
                            $scope.user.loginData.password = "";
                        }
                    );
                    $scope.allProjects = portfolioProjectsService.getAllProjectsObjects();
                    $scope.testWritePermission();
                }, function (err) {
                    $scope.$apply(function(){
                            $scope.user.loginFailed = true;
                            $scope.user.authenticated = false;
                        }
                    );
                    $scope.testWritePermission();
                }
            );
    }

    function hendleUnAuthResponse(promise){
        $.when(promise)
            .then(
                function (succ) {
                    $scope.$apply(function(){
                            $scope.user.loginFailed = false;
                            $scope.user.authenticated = false;
                            $scope.user.uid = "";
                            $scope.user.token = "";
                        }
                    );
                }, function (err) {
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

    $scope.projectActivationEnabled = function(){
        if ($scope.orderfilter == 'priority'){
            return true;
        }
    }

    $scope.setFilter = function(filter){
        $scope.orderfilter = filter;
        $scope.deactivateProjects(true);
    }

    $scope.toggleCategory = function(category){
        $scope.projectCategories[category] = !$scope.projectCategories[category];
    }

    $scope.toggleActiveProject = function(project){
        if($scope.projectActivationEnabled()){
            project.active = !project.active;
        }
    }

    $scope.setActiveProject = function(project){
        $scope.activeproject = project;
    }

    // if overwriteRequirements set to true then ...
    $scope.deactivateProjects = function(overwriteRequirements){
        angular.forEach($scope.allProjects, function(object,key){
            if (overwriteRequirements){
                object.active = false;
                object.admineditstart = false;
                object.admineditend = false; 
            } else {
                $scope.deactivateProject(object);
            }
        });
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
        var f1 = $filter('categoriesFilter')($scope.allProjects, $scope.projectCategories);
        var f2 = $filter('toArray')(f1);
        var f3 = $filter('orderBy')(f2, 'priority');
        angular.forEach(f3, function(project,key){
            if (project.admineditstart == true){
                toggling = true;
            };
            if (toggling){
                $scope.activateProject(project);
            } else {
                $scope.deactivateProject(project);
            };
            if (project.admineditend == true){
                toggling = false;
            };
        });
    }

    $scope.activateProject = function(project){
        if ($scope.projectActivationEnabled()){
            project.active = true;
        }
    }
    $scope.deactivateProject = function(project){
        if ($scope.projectActivationEnabled()){
            project.active = false;
        }
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
    }
    $scope.addPictureSettings = function(){
        var maxKey = 0;
        angular.forEach($scope.activeproject['pictures_width'], function(key,value){
            maxKey = Math.max(maxKey,key);
        });
        $scope.activeproject['pictures_width'].push({maxKey : 2});
    }

    $scope.getActiveProjectsImageWidths = function(){
        var outField = [];
        for(var x = 0; x < $scope.activeproject.images; x++) {
            outField.push(x);
        };
        return outField;
    }

    $scope.newProject = function(){
        SweetAlert.swal({   
            title: "ID of project",   
            text: "use only strings",   
            type: "input",   
            showCancelButton: true,   
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "ID" },
            function(inputValue){   
                var returnKey = $scope.addNewProject(inputValue);
                if (inputValue === false){
                    return false;
                }
                if (inputValue === "") {
                    swal.showInputError("ident of project can not be clear!");
                    return false;
                }
                if (returnKey === false){
                    swal.showInputError("Already exists!");
                    return false;
                } else {
                    swal("Project Created!", "The ident of project is set to: " + inputValue, "success");
                    return true;
                }
            return true;
        });
    }

    $scope.addNewProject = function(id){
        if ($scope.allProjects.hasOwnProperty(id)){
            return false;
        }
        
        $scope.projectToAdd = {
            "name": "name of " + id,
            "perex":"",
            "priority": 9999,
            "technology":"",
            "description":"",
            "contribution":"",
            categories: {
                "design" : 1,
                "front-end": 1,
                "back-end": 1,
                "3d" : 1
            },
            "images":0,
            "pictures_width": {
                "0" : 0
            },
            "thumbs" : 0,
            "width" : 0,
            "height": 0,
            "hreflink" : "",
            developer : {
                "name" : "",
                "link" :""
            },
            "active": false,
            "admineditstart": false,
            "admineditend": false
        };
        $scope.allProjects[id] = $scope.projectToAdd;
        $scope.saveProjects();
    }

    $scope.removeProject = function(project){
        SweetAlert.swal({
            title: "Do you want to remove project " + project.name,
            text: "You will not be able to recover this project!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm){
                angular.forEach($scope.allProjects, function(key,value){
                    if (key === project){
                        $scope.allProjects[value] = null;
                        $scope.saveProjects();
                    }
                });
                swal("Deleted!", "Project " + project.name + " has been deleted.", "success"); 
            } else {
                swal("Uff!", "Project " + project.name + " still lives!", "error"); 
            }
        });
    }
});

xportfolio.filter('categoriesFilter', function () {
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

