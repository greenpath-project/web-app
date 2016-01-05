angular.module('greenPathApp').config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/accueil', {
        templateUrl: 'app/components/home/home.vw.html',
    }).otherwise({
        redirectTo: '/accueil'
    });

}]);