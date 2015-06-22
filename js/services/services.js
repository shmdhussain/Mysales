
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
				a=userDataObj.sessionId;
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
			if(sessionStorage.getItem('sessionId')){
				userDataObj={'sessionId':sessionStorage.getItem('sessionId'),'loginSucceeded':true,'username':sessionStorage.getItem('username')};
				deferred.resolve(userDataObj);	
				console.log("success");
				console.log("userDataObj.sessionId: "+userDataObj.sessionId);
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

myApp.factory('Salesdata', function($q, $http, $location,userDataObj,$rootScope,logoutReset) {
    return {
		TotalSalesPerMan:function(){
			console.log("userDataObj.sessionId: "+userDataObj.sessionId);
			console.log("userDataObj.sessionId session storage: "+sessionStorage.getItem('sessionId'));
			var url='http://localhost:8080/salesmandata?sessionid='+sessionStorage.getItem('sessionId');
			console.log("url: "+url);
			var deferred = $q.defer(); 
			// Make an AJAX call to check if the user is logged in
			$http.get(url).success(function(TotalSalesPerManData){ 
				console.log("TotalSalesPerManData: "+TotalSalesPerManData.resultDescription);
				if(TotalSalesPerManData.resultDescription=='SUCCESS'){
					deferred.resolve(TotalSalesPerManData);
				}
				else{
					deferred.reject('User is not Logged In');
				}
			}); 
			return deferred.promise;
		},
		TotalSalesPerMonth:function(){
			var url='http://localhost:8080/lastyeardata?sessionid='+sessionStorage.getItem('sessionId');
			var deferred = $q.defer(); 
			// Make an AJAX call to check if the user is logged in
			$http.get(url).success(function(TotalSalesPerMonthData){ 
				console.log("TotalSalesPerMonthData: "+TotalSalesPerMonthData);
				if(TotalSalesPerMonthData.resultDescription=='SUCCESS'){
					deferred.resolve(TotalSalesPerMonthData);
					console.log("promise END");
				}
				else{
					deferred.reject('User is not Logged In');
				}
			}); 
			console.log("END");
			return deferred.promise;
		},
		TopFiveSalesOrder:function(){
			var url='http://localhost:8080/topsalesorders?sessionid='+sessionStorage.getItem('sessionId');
			var deferred = $q.defer(); 
			// Make an AJAX call to check if the user is logged in
			$http.get(url).success(function(TopFiveSalesOrderData){ 
				console.log("TopFiveSalesOrderData: "+TopFiveSalesOrderData);
				if(TopFiveSalesOrderData.resultDescription=='SUCCESS'){
					deferred.resolve(TopFiveSalesOrderData);
				}
				else{
					deferred.reject('User is not Logged In');
				}
			}); 
			return deferred.promise;
		},
		TopFiveSalesMan:function(){
			var url='http://localhost:8080/topsalesmen?sessionid='+sessionStorage.getItem('sessionId');
			var deferred = $q.defer(); 
			// Make an AJAX call to check if the user is logged in
			$http.get(url).success(function(TotalSalesPerManData){ 
				console.log("TotalSalesPerManData: "+TotalSalesPerManData);
				if(TotalSalesPerManData.resultDescription=='SUCCESS'){
					deferred.resolve(TotalSalesPerManData);
				}
				else{
					deferred.reject('User is not Logged In');
				}
			}); 
			return deferred.promise;
		}
	};
});

