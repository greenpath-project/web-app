angular.module('greenPathApp').directive('mzIconSection', ['$location', function($location){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            cards: '='
        },
        templateUrl: './app/shared/iconSection/iconSection.vw.html',
        link: function(scope, element, attrs){

            scope.gotoAnchor  = function(anchor){
                $('html, body').animate({scrollTop: $('#'+anchor).position().top},800);
                return false;
            }

            scope.go = function(url){
                url = url.replace('#', '');
                $location.path(url);
            }
        }
    };
}]);