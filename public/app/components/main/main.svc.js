angular.module('greenPathApp').factory('Nav', ['$resource', function($resource){
    return $resource('/assets/json/main.json', {}, {
        query: {method: 'GET', isArray: true}
    });
}]);