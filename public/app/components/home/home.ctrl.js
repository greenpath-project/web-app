angular.module('greenPathApp').controller('HomeCtrl', ['$scope', 'Home', function($scope, Home){

    $scope.villesDepts = [];

    Home.queryDepartements(function(depts){

        Home.queryVilles(function(villes){

            $scope.villesDepts = depts.concat(villes);
        });
    });

}]);
