angular.module('greenPathApp').directive('mzBanner', [function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'app/shared/banner/banner.vw.html',
        link: function(scope, element, attrs){
        }
    };
}]);