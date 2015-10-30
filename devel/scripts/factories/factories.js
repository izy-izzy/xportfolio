// this factory returns a synchronized array of chat messages
xportfolio.factory("portfolioProjects", ["$firebaseObject",
  function($firebaseObject) {
    var ref = new Firebase("https://xportfolio.firebaseio.com/projects/");
    return $firebaseObject(ref);
  }
]);