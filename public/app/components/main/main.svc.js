angular.module('greenPathApp')
    .factory('Nav', ['$resource', function($resource){
        return $resource('/assets/json/dataNav.json', {}, {
            query: {method: 'GET', isArray: true}
        });
    }]);