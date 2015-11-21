xportfolio.factory("mobileDetectionFactory", function($detection) {
  return {
  	isMobile : function() {
  		return $detection.isiOS() || $detection.isAndroid() || $detection.isWindowsPhone() || $detection.isBB10();
  	}
   }
});