angular.module('greenPathApp').directive('ngNavcard', ['$location', function($location){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            card: '='
        },
        link : function (scope, elem, attrs, $location) {

        },
        templateUrl: 'app/shared/navcard/navcard.vw.html',
        css: 'app/shared/navcard/navcard.stl.css'
    };
}]);