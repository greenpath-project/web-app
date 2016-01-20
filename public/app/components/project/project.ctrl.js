angular.module('greenPathApp').controller('ProjectCtrl', ['$scope', 'Project', function($scope, Project){

    $scope.sections = Project.query();

}]);
