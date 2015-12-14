angular.module('greenPathApp').directive('ngHeader', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            cards: '=',
            breadcrumbs: '='
        },
        templateUrl: 'app/shared/header/header.vw.html',
        css: 'app/shared/header/header.stl.css'
    };
});