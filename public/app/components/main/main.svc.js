angular.module('greenPathApp')
    .factory('Nav', ['$resource', function($resource){
        return $resource('/app/shared/header/navcard.json', {}, {
            query: {method: 'GET', isArray: true}
        });
    }]);