angular.module('greenPathApp').factory('Software', ['$resource', function($resource){
    return $resource('/assets/json/Software.json', {}, {
        query: {method: 'GET', isArray: true}
    });
}]);