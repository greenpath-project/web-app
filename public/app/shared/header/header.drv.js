angular.module('greenPathApp').directive('mzHeader', [function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            cards: '='
        },
        templateUrl: 'app/shared/header/header.vw.html',
        link: function(scope, element, attrs){

            scope.gotoAnchor  = function(anchor){
                 $('html, body').animate({scrollTop: $('#'+anchor).position().top},800);
                return false;
            }


            $('.button-collapse').sideNav({
                    menuWidth: 250,
                    edge: 'left',
                    closeOnClick: true
                }
            );

        }
    };
}]);