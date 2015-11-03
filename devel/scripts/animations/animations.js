xportfolio.animation('.slide', [function() {
  return {
    enter: function(element, doneFn) {
      jQuery(element).css("left",'-100px');
      jQuery(element).animate({"left": 0},500);
      jQuery(element).fadeIn(500, doneFn);
      
    },
    leave: function(element, doneFn) {
      jQuery(element).css("left",'auto');
      jQuery(element).fadeOut(250, doneFn);
      jQuery(element).animate({"right": -100},250);
    }
  }
}]);