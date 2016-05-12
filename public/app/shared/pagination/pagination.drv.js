angular.module('greenPathApp').directive('mzPagination', ['$timeout', function($timeout){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            pages : '=',
            action : '&'
        },
        templateUrl: 'app/shared/pagination/pagination.vw.html',
        link: function(scope, element, attr){

            scope.$watch(function() {
                if (!element.hasClass('ng-hide')) {
                    scope.selectLi(0);
                }
            })

            scope.selectLi = function(index){
                var selector = 'ul.pagination li#' + index;
                $(element).find(selector).removeClass('waves-effect').addClass('active');
            }

            scope.deselectLi = function(){
                $(element).find('ul.pagination li.active').removeClass('active').addClass('waves-effect');
            }

            scope.changePage = function(index){
                scope.action({index : index});
                scope.deselectLi();
                scope.selectLi(index);
            }

        }
    };
}]);