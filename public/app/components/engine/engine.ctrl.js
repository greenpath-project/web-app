angular.module('greenPathApp').controller('EngineCtrl', ['$scope','$http', '$timeout', '$q', 'Engine', function($scope, $http, $timeout, $q, Engine){

    $scope.results = [];
    $scope.dateFin = "";
    $scope.dateDeb = "";
    $scope.ville = "";
    $scope.departement = "";
    $scope.nbPages = 0;
    $scope.limit = 10;
    $scope.nbCaptures = 0;
    $scope.searchLaunch = false;


    $scope.launchSearch = function (skip) {
        if ($scope.ville.length != 0 || $scope.departement.length != 0) {

            $('.pagination li.active').removeClass('active').addClass('waves-effect');
            $('.pagination li#0').addClass('active').removeClass('waves-effect');
            
            var data = Engine.query({
                dateDeb: $scope.dateDeb,
                dateFin: $scope.dateFin,
                ville: $scope.ville,
                departement: $scope.departement,
                limit : $scope.limit,
                skip : skip
            }, function(data){
                $scope.searchLaunch = true;
                var a = data.nbCaptures / $scope.limit;
                $scope.nbCaptures = data.nbCaptures;
                $scope.nbPages = Math.round(a * 1) / 1;

                if($scope.nbPages % 1 != 0){
                    $scope.nbPages += 1;
                }

                $scope.results = data.captures;
                
                console.log(JSON.stringify($scope.results))

                $timeout(function(){
                    $('html, body').animate({scrollTop: $('#datatable').position().top},500);
                })
            });
        }
    }

    $scope.resetInputs = function(){
        $scope.results = [];
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
        $scope.launchSearch(skip);
    }

}]);