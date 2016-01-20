angular.module('greenPathApp').directive('mzIconSection', [function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            cards: '='
        },
        templateUrl: 'app/shared/iconSection/iconSection.vw.html',
        link: function(scope, element, attrs){
        }
    };
}]);