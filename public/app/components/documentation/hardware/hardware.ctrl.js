angular.module('greenPathApp').controller('HardwareCtrl', ['$scope', 'Hardware', function($scope, Hardware){

    $scope.sections = Hardware.query();

}]);
