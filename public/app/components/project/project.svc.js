angular.module('greenPathApp').factory('Project', ['$resource', function($resource){
    return $resource('/assets/json/project.json', {}, {
        query: {method: 'GET', isArray: true}
    });
}]);