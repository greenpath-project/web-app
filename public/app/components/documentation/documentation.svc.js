angular.module('greenPathApp').factory('Documentation', ['$resource', function($resource){
    return $resource('/assets/json/documentation.json', {}, {
        query: {method: 'GET', isArray: true}
    });
}]);