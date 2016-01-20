angular.module('greenPathApp').directive('mzTopButton', [function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'app/shared/topButton/topButton.vw.html',
        link: function(scope, element, attrs){

            $(element).click(function(){
                $('html, body').animate({scrollTop : 0},800);
                return false;
            });
        }
    };
}]);