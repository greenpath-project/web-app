angular.module('greenPathApp').directive('ngFooter', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'app/shared/footer/footer.vw.html',
        css: 'app/shared/footer/footer.stl.css'
    };
});