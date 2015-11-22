xportfolio.animation('.reveal-animation', function() {
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      element.fadeIn(1000, done);
      return function() {
        element.stop();
      }
    },
    leave: function(element, done) {
      element.fadeOut(1000, done)
      return function() {
        element.stop();
      }
    }
  }
})
