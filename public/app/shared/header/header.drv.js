angular.module('greenPathApp').directive('mzHeader', ['$location', '$anchorScroll', function($location, $anchorScroll){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            cards: '='
        },
        templateUrl: 'app/shared/header/header.vw.html',
        link: function(scope, element, attrs){

            scope.gotoAnchor  = function(anchor){
                $location.hash(anchor);
                $anchorScroll();
            }

        }
    };
}]);