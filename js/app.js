	// Create a new module
	var myApp = angular.module('myApp', ['ngRoute','ui.bootstrap']);
	 
	
	
	
	// configure existing services inside initialization blocks.
	myApp.config(function($locationProvider,$routeProvider) {
		$routeProvider
		.when('/login', {
		   templateUrl:'partials/login.html',
		   controller:'loginCtrl'
		   // resolve:{
						// alldata:function(getalldata){
							// return getalldata.dataObj;
						// }
		          // }
		  })
		.when('/home', {
		  templateUrl:'partials/home.html',
		  controller:'homeCtrl',
		  resolve:{
						userdata:function(AuthenticationService){
							return AuthenticationService.checkLogin();
						}
		          }
		  })
		  .otherwise({
		      redirectTo:'/login'
		  });

		
	  // Configure existing providers
	  //$locationProvider.hashPrefix('!');
	});
	
	
