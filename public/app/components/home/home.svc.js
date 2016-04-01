angular.module('greenPathApp').factory('Home', ['$resource', function($resource){
    return $resource('', {}, {
        //queryVilles: {method: 'GET', isArray: true, url: './api/villes'},
        //queryDepartements: {method: 'GET', isArray: true, url: './api/departements'}
    });
}]);