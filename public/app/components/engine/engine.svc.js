angular.module('greenPathApp').factory('Engine', ['$resource', function($resource){
    return $resource('/api/captures/releve', {}, {
        query: {method: 'GET'}
    });
}]);