angular.module('greenPathApp').directive('mzPagination', ['$timeout', function($timeout){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            pages : '=',
            action : '&'
        },
        templateUrl: './app/shared/pagination/pagination.vw.html',
        link: function(scope, element, attr){
            scope.firstLoad = true;

            scope.$watch(function() {
                $timeout(function(){
                    if (!element.hasClass('ng-hide') && scope.firstLoad == true) {
                        scope.firstLoad = false;
                        scope.deselectLi();
                        scope.selectLi(0);
                    }
                },100)
            })

            scope.selectLi = function(index){
                var selector = 'ul.pagination li#' + index;
                $(element).find(selector).removeClass('waves-effect').addClass('active');
            }

            scope.deselectLi = function(){
                $(element).find('ul.pagination li.active').removeClass('active').addClass('waves-effect');
            }

            scope.changePage = function(index){
                if(!$(element).find('ul.pagination li#' + index).hasClass('active')){
                    scope.action({index : index});
                    scope.deselectLi();
                    scope.selectLi(index);

                }
            }

        }
    };
}]);