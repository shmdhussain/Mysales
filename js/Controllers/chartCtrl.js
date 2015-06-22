myApp.controller('TotalSalesPerManCtrl', function ($scope, $modalInstance, data) {

  $scope.dataFromDB = data.data;
  $scope.labels = [];
  $scope.data=[];
  angular.forEach($scope.dataFromDB,function(value,index){
	$scope.labels.push(value[0]);
	$scope.data.push(value[1]);
  });
});

myApp.controller('TotalSalesPerMonthCtrl', function ($scope, $modalInstance, data) {
  $scope.dataFromDB = data.data;
  $scope.labels = [];
  $scope.data=[];
  $scope.series = [];
  angular.forEach($scope.dataFromDB,function(value,index){
	$scope.labels.push(value[0]);
	$scope.data.push(value[1]);
  });
   console.log("END 1");
});

myApp.controller('TopFiveSalesOrderCtrl', function ($scope, $modalInstance, data) {
  $scope.dataFromDB = data.data;
  $scope.labels = [];
  $scope.data=[];
  $scope.series = [];
  angular.forEach($scope.dataFromDB,function(value,index){
	$scope.labels.push(value[0]);
	$scope.data.push(value[1]);
  });
 
});

myApp.controller('TopFiveSalesManCtrl', function ($scope, $modalInstance, data) {
  $scope.dataFromDB = data.data;
  $scope.labels = [];
  $scope.data=[];
  $scope.series = [];
  angular.forEach($scope.dataFromDB,function(value,index){
	$scope.labels.push(value[0]);
	$scope.data.push(value[1]);
  });
});