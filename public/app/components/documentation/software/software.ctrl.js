angular.module('greenPathApp').controller('SoftwareCtrl', ['$scope', 'Software', function($scope, Software){

    $scope.sections = Software.query();

}]);
