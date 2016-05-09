angular.module('greenPathApp').controller('EngineCtrl', ['$scope', 'Engine','$http', function($scope, Engine,$http){

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15,
        format: 'yyyy-mm-dd'
    })

    $scope.resultSearch = [];
    $scope.dateFin = new Date();
    $scope.dateDeb = new Date();
    $scope.ville = "";
    $scope.departement = "";

    $scope.launchSearch = function () {
        $scope.resultSearch.length = 0;

        if ($scope.ville.length != 0 || $scope.departement.length != 0) {
            var config = {
                params: {
                    dateDeb: $scope.dateDeb,
                    dateFin: $scope.dateFin,
                    ville: $scope.ville,
                    departement: $scope.departement
                }
            }

            $http.get('/api/captures/releve', config).success(function (data) {
                console.log(data);
                data.forEach(function (capture) {
                    $scope.resultSearch.push(capture);
                });
            });
        }
    }

    $scope.reset = function(){
        $scope.resultSearch = [];
        $scope.dateDeb ="";
        $scope.dateFin ="";
        $scope.ville="";
        $scope.departement="";
    }

    $scope.selectVille = function(){
        $scope.departement="";
    }

    $scope.selectDep = function(){
        $scope.ville="";
    }

}]);