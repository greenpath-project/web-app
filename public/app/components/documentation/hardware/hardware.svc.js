angular.module('greenPathApp').factory('Hardware', ['$resource', function($resource){
    return $resource('/assets/json/hardware.json', {}, {
        query: {method: 'GET', isArray: true}
    });
}]);