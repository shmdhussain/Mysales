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
	
	myApp.run(function($rootScope){
		$rootScope.message = {'toshow':false,'message':'','class':''}; 
	});
	
	 // MODAL ADJUSTMENT
	fnModalScrollfix = (function() {
		var $=jQuery;
		var $this = $('.modal.in');
		var $headHeight = $('.modal.in  .modal-header').outerHeight();
		var $footHeight = $('.modal.in  .modal-footer').outerHeight(); 
		var $modalHeight = window.innerHeight; //$(window).height();
		
		if($headHeight == null || $headHeight == -1){$headHeight = '0'}
		if($footHeight == null || $footHeight == -1){$footHeight = '0'}
		
		var $bodyHeight = $modalHeight - (parseInt($headHeight) + parseInt($footHeight)) + 'px';
		$('.modal.in  .modal-body').css({
			'height':$bodyHeight
		});
		console.log("$$headHeight: "+$headHeight);
		console.log("$footHeight: "+$footHeight);
		console.log("$bodyHeight: "+$bodyHeight);
		console.log("$modalHeight: "+$modalHeight);
		if( 1){ // if portrait mobile
			$('.modal.in').css({'overflow-y':'hidden', '-webkit-overflow-scrolling':'auto'});
			$('.modal.in').find('.modal-header').css({
				'-webkit-overflow-scrolling':'auto'
			});
			$('.modal.in').find('.modal-body').css({
				'height':$bodyHeight,
				'overflow-y':'scroll',
				'padding-bottom':'15px',
				'-webkit-overflow-scrolling':'touch'
			});
			$('.modal.in').find('.modal-footer').css({
				'box-sizing':'border-box',
				'margin':'0',
				'position':'static',
				'width':'100%',
				'-webkit-overflow-scrolling':'auto'
			});            
		}
		else{ 
			$('.modal.in').css({'overflow-y':'scroll', '-webkit-overflow-scrolling':'touch'});
			$('.modal.in').find('.modal-header').css({
				'-webkit-overflow-scrolling':'auto'
			});
			$('.modal.in').find('.modal-body').css({
				'height':'auto',
				'overflow-y':'hidden',
				'padding-bottom':'15px',
				'-webkit-overflow-scrolling':'auto'
			});
			$('.modal.in').find('.modal-footer').css({
				'box-sizing':'content-box',
				'margin':'0',
				'position':'static',
				'width':'auto',
				'-webkit-overflow-scrolling':'auto'
			});
		}
   });
jQuery(window).on("resize", function() {
   fnModalScrollfix();
});