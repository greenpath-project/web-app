angular.module('greenPathApp').controller('DocumentationCtrl', ['$scope', 'Documentation', function($scope, Documentation){

    $scope.sections = Documentation.query();

}]);
