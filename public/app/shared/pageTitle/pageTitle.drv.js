angular.module('greenPathApp').directive('mzPageTitle', [function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            title: '@',
            icon: '@'
        },
        templateUrl: 'app/shared/pageTitle/pageTitle.vw.html',
        controller: function($scope, $element, $rootScope){
        },
        link: function(scope, element, attrs) {
        }
    };
}]);