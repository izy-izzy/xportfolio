xportfolio.controller("introController", function($scope, apiaryConnectionService) {
	apiaryConnectionService.getTestData()
	.then(function (response) {
		//console.log("data:", response);
	}, function (response) {
		//console.log("Unable to load test data.");
	});
});