angular.module('greenPathApp').directive('mzDatatable', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/shared/datatable/datatable.vw.html',
        scope: {
            results : '='
        },
        link: function(scope, element, attrs){

            scope.formatNumber = function(i) {
                return Math.round(i * 1000000) / 1000000;
            }

        }
    };
});