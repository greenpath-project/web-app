angular.module('greenPathApp').controller('EngineCtrl', ['$scope','$http', 'Engine', function($scope, $http, Engine){

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15,
        format: 'yyyy-mm-dd'
    })

    $scope.resultSearch = [];
    $scope.dateFin = "";
    $scope.dateDeb = "";
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

            console.log(JSON.stringify(config));

            $http.get('/api/captures/releve', config).success(function (data) {
                console.log(data);
                data.forEach(function (capture) {
                    $scope.resultSearch.push(capture);
                });
            });
        }
    }

    $scope.resetInputs = function(){
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