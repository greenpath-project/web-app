angular.module('greenPathApp').directive('mzBanner', ['$timeout', function($timeout){
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: './app/shared/banner/banner.vw.html',
        link: function(scope, element, attrs) {

            $timeout(function(){
                $(element).find('.parallax').parallax();
            })

        }
    };
}]);