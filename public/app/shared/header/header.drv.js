angular.module('greenPathApp').directive('mzHeader', [function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            cards: '='
        },
        templateUrl: 'app/shared/header/header.vw.html',
        link: function(scope, element, attrs){

            $('.button-collapse').sideNav({
                    menuWidth: 250,
                    edge: 'left',
                    closeOnClick: true
                }
            );

        }
    };
}]);