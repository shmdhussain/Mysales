myApp.controller('parentCtrl',['$scope','$window','$location',function ($scope,$window,$location) {

	$scope.accprop={open:true,closeother:false}
}]);

var a,b,c;
myApp.controller("loginCtrl", ['$scope','AuthenticationService','$location','userDataObj', function($scope, AuthenticationService,$location,userDataObj) {
	angular.element("html").addClass("coverBg");
	console.log("LoginCtrl");
	$scope.login = function() {
		AuthenticationService.login($scope.username,$scope.password);
	};
	AuthenticationService.logout();
	console.log("userdataPromise data: "+userDataObj);
}]);

myApp.controller("homeCtrl", ['$scope','AuthenticationService','userdata','$location','$modal','$log', function($scope, AuthenticationService,userdata,$location,$modal,$log) {
	console.log("homeCtrl");
	console.log("userdata: "+userdata.sessionId);
	angular.element("html").removeClass("coverBg");
	$scope.user={'username':null};
	$scope.user.username=userdata.username;
	$scope.mysupportmsg={'toshow':false,message:'Request is sent successfully'};
	$scope.open = function (size,modalURL,classforModal) {
		var modalInstance = $modal.open({
		  animation: true,
		  templateUrl: modalURL,
		  size: size,
		  windowClass:classforModal
		});
		modalInstance.result.then(function (result) {
		 
		  $scope.mysupportmsg.toshow = true;
		  
		}, function () {
		  $log.info('Modal dismissed at: ' + new Date());
		});
	};
	
	$scope.logout=function(){
		AuthenticationService.logout();
	};
	
	
}]);

