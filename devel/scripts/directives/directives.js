xportfolio.directive('imageonload', function($animate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, $animate, $timeout) {
            element.bind('load', function($animate) {
                jQuery(element).addClass('loaded');
                setTimeout(function(){
                    scope.$emit('iso-method', {name:'layout', params:null});
                },250);
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