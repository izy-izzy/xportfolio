xportfolio.directive('imageonload', function($animate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, $animate) {
            element.bind('load', function($animate) {
                //alert('image is loaded');
                jQuery(element).addClass('loaded');
            });
        }
    };
});