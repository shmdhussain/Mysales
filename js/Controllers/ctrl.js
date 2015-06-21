myApp.controller('parentCtrl',['$scope','$window','$location',function ($scope,$window,$location) {

	$scope.accprop={open:true,closeother:false}
}]);

var a,b,c;
myApp.controller("loginCtrl", ['$scope','AuthenticationService','$location','userDataObj', function($scope, AuthenticationService,$location,userDataObj) {
	console.log("LoginCtrl");
	$scope.login = function() {
		AuthenticationService.login($scope.username,$scope.password);
	};
	a=userDataObj;
	userDataObj={'sessionId':null,'loginSucceeded':false};
	sessionStorage.setItem('sessionId', '');
	console.log("userdataPromise data: "+userDataObj);
}]);

myApp.controller("homeCtrl", ['$scope','AuthenticationService','userdata','$location', function($scope, AuthenticationService,userdata,$location) {
	console.log("homeCtrl");
	console.log("userdata: "+userdata.sessionId);
}]);

