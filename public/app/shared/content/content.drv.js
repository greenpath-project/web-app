angular.module('greenPathApp').directive('mzContent', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: './app/shared/content/content.vw.html',
        scope: {
            card: '='
        },
        controller: 'MainCtrl',
        link: function(scope, element, attrs){

        }
    };
});