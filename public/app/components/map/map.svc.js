angular.module('greenPathApp').factory('Map', ['$resource', function($resource){
    return $resource('', {}, {
        query: {method: 'GET', isArray: true, url: './'}
    });
}]);