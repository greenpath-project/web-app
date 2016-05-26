angular.module('greenPathApp').factory('Software', ['$resource', function($resource){
    return $resource('/assets/json/software.json', {}, {
        query: {method: 'GET', isArray: true}
    });
}]);