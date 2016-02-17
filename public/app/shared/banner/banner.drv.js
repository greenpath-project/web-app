angular.module('greenPathApp').directive('mzBanner', ['$q', function($q){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '='
        },
        templateUrl: 'app/shared/banner/banner.vw.html',
        link: function(scope, element, attrs) {

            scope.resultSearch = [];
            scope.input = '';

            scope.onChangeInput = function () {
                asyncSearch();
            }

            function asyncSearch() {
                return $q(function (resolve, reject) {

                    scope.resultSearch.length = 0;

                    if (scope.input.length >= 3) {
                        scope.data.forEach(function (data) {

                            if (data.nom.substring(0, scope.input.length) ==  scope.input ||
                                data.code != undefined && data.code.toString().substring(0, scope.input.length) ==  scope.input) {
                                scope.resultSearch.push(data.code + ' - ' + data.nom);
                            }

                        });
                    }

                });
            }

        }

    };
}]);