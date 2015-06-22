var a,b,c;
var demoCtrl = function ($scope,$modal) {
    
	
	$scope.dataFromDatabase=[{'name':'Red','val':300},{'name':'Green','val':50},{'name':'Yellow','val':100}];
	$scope.open = function (modalURL) {

		var modalInstance = $modal.open({
		  animation: $scope.animationsEnabled,
		  templateUrl: modalURL,
		  controller: 'ModalChartCtrl',
		  resolve: {
			data: function () {
			  return $scope.dataFromDatabase;
			}
		  }
		});
	};


};

myApp.directive('mychartDir', function (chartData) {
 return {
			link: function(scope, elm, attrs) {
				var ctx=jQuery("#myChart").get(0).getContext("2d");
				var myPieChart = new Chart(ctx).Pie(chartData.dataset);	
				b=chartData.dataset;
				console.log('jQuery("#myChart").attr("id") :'+jQuery("#myChart").attr("id"));
				console.log('chartData.dataSet.length :'+chartData.dataset.length);
				//chartData.chartInstance=myPieChart;
				a=ctx;
			}
		}
});

myApp.factory('chartData', function() {
  return {
    dataset: [],
	chartInstance:''
  }
});


myApp.controller('ModalChartCtrl', function ($scope, $modalInstance, data,chartData) {
  $scope.dataFromDB = data;
  
  $scope.labels = [];
  $scope.data=[];
  var colorSet=[{'mycolor':'#F7464A','myhighlightColor':'#FF5A5E'},{'mycolor':'#46BFBD','myhighlightColor':'#5AD3D1'},{'mycolor':'#FDB45C','myhighlightColor':'#FFC870'}]
  angular.forEach($scope.dataFromDB,function(value,index){
	//var myDataSet={'value':value.val,'label':value.name,'color':colorSet[index].mycolor,'highlight':colorSet[index].myhighlightColor};
	$scope.labels.push(value.name);
	$scope.data.push(value.val);
  });
  c=$scope.labels;
  b=$scope.data;
 // chartData.dataset=$scope.dataSet;
});

var dataSet = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
]