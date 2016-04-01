angular.module('greenPathApp').controller('EngineCtrl', ['$scope', 'Engine','$http', function($scope, Engine,$http){

    $scope.resultSearch = [];
    $scope.longitude ="";
    $scope.latitude ="";
    $scope.ville="";
    $scope.departement="";

    $scope.onChangeInput = function () {
        $scope.resultSearch.length = 0;

        if($scope.longitude.length >= 3 || $scope.latitude.length >= 3 || $scope.ville.length >= 4 || $scope.departement.length >= 3){
        	
        	var config = {
	            params: {
	                lng:$scope.longitude,
	                lat:$scope.latitude,
	                ville:$scope.ville,
	                departement:$scope.departement
	            }
	        }
	    
	        $http.get('/api/captures/releve',config)
	            .success(function(data){
	            	console.log(data);
	                data.forEach(function(capture){
	                    $scope.resultSearch.push(capture);
	                });              
	            });
        }
    }
}]);