myApp.controller('parentCtrl',['$scope','$window','$location',function ($scope,$window,$location) {

	$scope.accprop={open:true,closeother:false}
}]);

var a,b,c;
myApp.controller("loginCtrl", ['$scope','AuthenticationService','$location','userDataObj', function($scope, AuthenticationService,$location,userDataObj) {
	angular.element("html").addClass("coverBg");
	modalreset();
	jQuery(".modal-backdrop").remove();
	jQuery(".modal").remove();
	console.log("LoginCtrl");
	$scope.login = function() {
		AuthenticationService.login($scope.username,$scope.password);
	};
	AuthenticationService.logout();
	console.log("userdataPromise data: "+userDataObj);
}]);

myApp.controller("homeCtrl", ['$scope','AuthenticationService','userdata','$location','$modal','$log','$timeout', function($scope, AuthenticationService,userdata,$location,$modal,$log,$timeout) {
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
	
	
	//openchart
	
	$scope.openchart = function (modalURL,classforModal) {
	
		jQuery("body").css({"position":"fixed","width":"100%","height":"100%"});
		jQuery("html").css({"position":"fixed","overflow-y":"hidden"});
		jQuery("html").addClass("mychart");
		$timeout(function(){
				console.log('jQuery(".mychart .modal-dialog").length: '+jQuery(".mychartmodal .modal-dialog").length);
				jQuery(".mychart .modal-dialog").css({"width":"100%","margin":"0px"});
				jQuery(".mychart .modal-content").css({"height":"100%","border":"none","border-radius":"0px","box-shadow":"none","-webkit-box-shadow":"none","-moz-box-shadow":"none"});
				fnModalScrollfix();
		},100);
		
		var modalInstance = $modal.open({
		  animation: true,
		  templateUrl: 'partials/'+modalURL,
		  windowClass:classforModal
		});
		modalInstance.opened.then(function (result) {
			
			
			
		  
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
		
		
		modalInstance.result.then(function (result) {
		 
		  modalreset();
		  
		}, function () {
			modalreset();
		  $log.info('Modal dismissed at: ' + new Date());
		});
	};
	
	
	
}]);

function modalreset(){
		// jQuery("body").css({"position":"static","width":"","height":""});
		// jQuery("html").css({"position":"static","overflow-y":""});
		jQuery("body").removeAttr("style");
		jQuery("html").removeAttr("style");
		jQuery("html").removeClass("mychart");
		
}