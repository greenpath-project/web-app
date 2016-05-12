angular.module('greenPathApp').controller('EngineCtrl', ['$scope','$http', '$timeout', 'Engine', function($scope, $http, $timeout, Engine){

    $scope.resultSearch = [];
    $scope.dateFin = "";
    $scope.dateDeb = "";
    $scope.ville = "";
    $scope.departement = "";
    $scope.nbPages = 0;
    $scope.limit = 20;
    $scope.nbCaptures = 0;
    $scope.searchLaunch = false;

    $scope.launchSearch = function (skip) {

        $scope.resultSearch.length = 0;

        if ($scope.ville.length != 0 || $scope.departement.length != 0) {

            var config = {
                params: {
                    dateDeb: $scope.dateDeb,
                    dateFin: $scope.dateFin,
                    ville: $scope.ville,
                    departement: $scope.departement,
                    limit : $scope.limit,
                    skip : skip
                }
            }

            $http.get('/api/captures/releve', config).success(function (data) {
                $scope.searchLaunch = true;
                var a = data.nbCaptures / $scope.limit;
                $scope.nbCaptures = data.nbCaptures;
                $scope.nbPages = Math.round(a * 1) / 1;

                if($scope.nbPages % 1 != 0){
                    $scope.nbPages += 1;
                }

                data.captures.forEach(function (capture) {
                    $scope.resultSearch.push(capture);
                });

                $timeout(function(){
                    $('html, body').animate({scrollTop: $('#datatable').position().top},1000);
                    return false;
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

    $scope.formatNumber = function(i) {
        return Math.round(i * 1000000) / 1000000;
    }

    $scope.changePage = function(index){
        var skip = index * $scope.limit;
        console.log(skip);
        $scope.launchSearch(skip);
    }

}]);