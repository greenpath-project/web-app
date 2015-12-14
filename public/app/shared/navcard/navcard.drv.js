angular.module('greenPathApp').directive('ngNavcard', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            card: '='
        },
        templateUrl: 'app/shared/navcard/navcard.vw.html',
        css: 'app/shared/navcard/navcard.stl.css'
    };
});