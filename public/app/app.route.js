angular.module('greenPathApp').config(function($routeProvider, $locationProvider){

         $routeProvider.when('/', {
                  templateUrl: 'app/components/home/home.vw.html',
                  label: 'Accueil'
         }).when('/projet',{
                  templateUrl: 'app/components/projet/projet.vw.html',
                  controller: 'projetCtrl',
                  label: 'Projet'
         }).when('/carte', {
                  templateUrl: 'app/components/carte/carte.vw.html',
                  controller: 'carteCtrl',
                  label: 'Carte'
         }).when('/recherche', {
                  templateUrl: 'app/components/recherche/recherche.vw.html',
                  controller: 'rechercheCtrl',
                  label: 'Recherche'
         }).when('/documentation', {
                  templateUrl: 'app/components/documentation/documentation.vw.html',
                  controller: 'documentationCtrl',
                  label: 'Documentation'
         }).when('/apropos', {
                  templateUrl: 'app/components/apropos/apropos.vw.html',
                  controller: 'aproposCtrl',
                  label: 'A propos'
         }).when('/error404', {
                  templateUrl: 'app/components/erreurs/error404.vw.html',
                  label: 'Erreur 404'
         }).otherwise({
                  redirectTo: '/'
         });
         
         //$locationProvider.html5Mode(true);

});