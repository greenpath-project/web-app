var app = angular.module('app', ['ngRoute', 'GreenPathControllers']);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'templates/accueil.html'      
    }).when('/projet',{
        templateUrl: 'templates/projet.html',
        controller: 'projetCtrl'              
    }).when('/error', {
        templateUrl: 'templates/error.html'
    }).otherwise({
        redirectTo: '/'
    });
});