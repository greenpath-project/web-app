angular.module('greenPathApp').directive('mzFooter', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: './app/shared/footer/footer.vw.html'
    };
});