angular.module('greenPathApp').directive('mzScrollspy', [function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            cards: '='
        },
        templateUrl: 'app/shared/scrollspy/scrollspy.vw.html',
        link: function(scope, element, attrs){

            scope.gotoAnchor  = function(anchor){
                $('html, body').animate({scrollTop: $('#'+anchor).position().top},800);
                return false;
            }

        }
    };
}]);