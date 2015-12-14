angular.module('greenPathApp')
    .factory('Nav', ['$resource', function($resource){
        return $resource('/app/shared/resource/dataNav.json', {}, {
            query: {method: 'GET', isArray: true}
        });
    }]);