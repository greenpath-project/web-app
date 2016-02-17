angular.module('greenPathApp').factory('Engine', ['$resource', function($resource){
    return $resource('', {}, {
        query: {method: 'GET', isArray: true, url: './'}
    });
}]);