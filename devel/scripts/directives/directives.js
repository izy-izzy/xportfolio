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
