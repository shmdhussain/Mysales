
myApp.factory('userDataObj', function($http) {
    var userDataObj={'sessionId':null,'loginSucceeded':false};
    return userDataObj;
});
myApp.factory('AuthenticationService', function($q, $http, $location,userDataObj) {
    return {
		login:function(uid,pwd){
			var url='http://localhost:8080/login?username='+uid+'&password='+pwd;
			
			// Make an AJAX call to check if the user is logged in
			$http.get(url).success(function(userdata){ 
				console.log("user data: "+userdata);
				// Authenticated 
				userDataObj=userdata;
				b=userdata;
				if (userdata.sessionId) {
					console.log("user data success: "+userdata);
					sessionStorage.setItem('sessionId', userdata.sessionId);
					$location.url('/home');
				}
				// Not Authenticated 
				else {
					//$rootScope.message = 'You need to log in.'; 
					$location.url('/login'); 
				} 
			}); 
		},
		checkLogin:function(){
			var deferred = $q.defer(); 
			if(sessionStorage.getItem('sessionId')){
				userDataObj={'sessionId':sessionStorage.getItem('sessionId'),'loginSucceeded':true};
				deferred.resolve(userDataObj);	
				console.log("success");
			}
			else{
				deferred.reject(userDataObj);
				console.log("failure " +userDataObj.sessionId);
				$location.url('/login'); 
			}
			return deferred.promise; 
		}
	};
});

