angular.module('greenPathApp').controller('EngineCtrl', ['$scope','$http', 'Engine', function($scope, $http, Engine){

    $scope.resultSearch = [];
    $scope.dateFin = "";
    $scope.dateDeb = "";
    $scope.ville = "";
    $scope.departement = "";
    $scope.nbPages = 1;
    $scope.limit = 20;

    $scope.launchSearch = function (skip) {
        $scope.resultSearch.length = 0;

        if($scope.dateFin == ""){
            var d = new Date();
            var jour = "";
            var mois = "";
            var annee = d.getFullYear();

            var monthTmp = d.getMonth() + 1;

            if(monthTmp < 10){
                mois = '0' + monthTmp;
            }
            else{
                mois = monthTmp;
            }

            if(d.getDate() < 10){
                jour = '0' + d.getDate();
            }
            else{
                jour = d.getDate();
            }

            var date = '31/' + mois + '/' + annee;
            $scope.dateFin = date;
        }

        if($scope.dateDeb == ""){
            $scope.dateDeb = '01/01/2000';
        }

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
                var a = data.nbCaptures / $scope.limit;
                $scope.nbPages = 1 +  Math.round(a * 1) / 1;
                data.captures.forEach(function (capture) {
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

    $scope.formatNumber = function(i) {
        return Math.round(i * 1000000) / 1000000;
    }

    $scope.changePage = function(index){
        var skip = index * 10;
        //$scope.launchSearch(index * 10);
    }

}]);