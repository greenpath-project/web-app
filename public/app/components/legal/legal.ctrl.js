angular.module('greenPathApp').controller('LegalCtrl', ['$scope', 'Legal', function($scope, Legal){

    $scope.sections = Legal.query();

}]);
