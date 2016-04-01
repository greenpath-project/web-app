angular.module('greenPathApp').directive('mzBanner', ['$q','$http', function($q,$http){
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

                    console.log(scope.resultSearch);

                    if (scope.input.length >= 3) {
                        var parse  = parseInt(scope.input);

                        if(isNaN(parse)){
                            var nom = scope.input;
                            scope.input = nom.charAt(0).toUpperCase() + nom.substring(1).toLowerCase();

                            var config = {
                                params: {
                                    nom:scope.input
                                }
                            }
                        
                            $http.get('/api/villes/nom',config)
                                .success(function(data){
                                    data.forEach(function(ville){
                                        scope.resultSearch.push(ville.code + ' - ' + ville.nom);
                                    });
                                });
                        }
                        else{
                            var config = {
                                params: {
                                    code:scope.input
                                }
                            }

                            $http.get('/api/villes/code',config)
                                .success(function(data){
                                    data.forEach(function(ville){
                                        scope.resultSearch.push(ville.code + ' - ' + ville.nom);
                                    });
                                });
                        }                       
                    }

                });
            }

        }

    };
}]);