
myApp.factory('userDataObj', function($http) {
    var userDataObj={'sessionId':null,'loginSucceeded':false,'username':null};
    return userDataObj;
});
myApp.factory('logoutReset', function(userDataObj) {
	return function(){
		userDataObj={'sessionId':null,'loginSucceeded':false,'username':null};
		sessionStorage.setItem('sessionId', '');
		sessionStorage.setItem('username', '');
	}
});
myApp.factory('AuthenticationService', function($q, $http, $location,userDataObj,$rootScope,logoutReset) {
    return {
		login:function(uid,pwd){
			var url='http://localhost:8080/login?username='+uid+'&password='+pwd;
			
			// Make an AJAX call to check if the user is logged in
			$http.get(url).success(function(userdata){ 
				console.log("user data: "+userdata);
				// Authenticated 
				userDataObj={'sessionId':userdata.sessionId,'loginSucceeded':true,'username':uid};
				b=userdata;
				if (userdata.sessionId) {
					console.log("user data success: "+userdata);
					sessionStorage.setItem('sessionId', userdata.sessionId);
					sessionStorage.setItem('username', uid);
					$rootScope.message = {'toshow':false,'message':'','class':''}; 
					$location.url('/home');
				}
				// Not Authenticated 
				else {
					$rootScope.message = {'toshow':true,'message':'Credential is incorrect','class':'error'}; 
					$location.url('/login'); 
				} 
			}); 
		},
		checkLogin:function(){
			var deferred = $q.defer(); 
			if(1){
				userDataObj={'sessionId':sessionStorage.getItem('sessionId'),'loginSucceeded':true,'username':sessionStorage.getItem('username')};
				deferred.resolve(userDataObj);	
				console.log("success");
			}
			else{
				deferred.reject(userDataObj);
				console.log("failure " +userDataObj.sessionId);
				$location.url('/login'); 
			}
			return deferred.promise; 
		},
		logout:function(){
			logoutReset();
			$location.url('/login'); 
		}
	};
});

