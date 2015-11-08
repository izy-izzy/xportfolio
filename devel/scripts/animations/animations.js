xportfolio.animation('.slide', [function() {
  return {
    enter: function(element, doneFn) {
      jQuery(element).fadeIn(500, doneFn);
    },
    leave: function(element, doneFn) {
      jQuery(element).fadeOut(500, doneFn);
    }
  }
}]);