angular.module('greenPathApp').factory('Legal', ['$resource', function($resource){
    return $resource('/assets/json/legal.json', {}, {
        query: {method: 'GET', isArray: true}
    });
}]);