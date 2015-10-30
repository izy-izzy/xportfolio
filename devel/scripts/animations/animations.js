xportfolio.animation('.slide', [function() {
  return {
    enter: function(element, doneFn) {
      jQuery(element).css("left",'-100px');
      jQuery(element).animate({"left": 0},5000);
      jQuery(element).fadeIn(5000, doneFn);
      
    },
    leave: function(element, doneFn) {
      jQuery(element).css("left",'auto');
      jQuery(element).fadeOut(5000, doneFn);
      jQuery(element).animate({"right": -100},5000);
    }
  }
}]);