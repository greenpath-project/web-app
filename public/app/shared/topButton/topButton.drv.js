angular.module('greenPathApp').directive('mzTopButton', ['$location', '$anchorScroll', function($location, $anchorScroll){
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'app/shared/topButton/topButton.vw.html',
        link: function(scope, element, attrs){
            scope.goToTop  = function(anchor){
                $location.hash('top');
                $anchorScroll();
            }
        }
    };
}]);