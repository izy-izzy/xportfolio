xportfolio.directive('imageonload', function($animate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, $animate, $timeout) {
            angular.element(element).animate({
                'opacity' : 1
            },500);
            element.bind('load', function($animate) {
                setTimeout(function(){
                    jQuery(element).addClass('loaded');
                },1000);
                scope.$emit('iso-method', {name:'layout', params:null});
            });
        }
    };
});

xportfolio.directive('myProjectloader', function() {
    return {
        template: '<div class="loader" id="loader-{{project.$id}}"></div>',
        link: function (scope, elm) {
            angular.element(angular.element(elm).find(".loader")).animate({
                'width' : 100,
                'opacity' : 1
            },Math.floor((Math.random()*2000)+50));
        }
    };
});