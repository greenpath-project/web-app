angular.module('greenPathApp').controller('MainCtrl', ['$scope', 'Nav', function($scope, Nav){

    $scope.cards = Nav.query();

    $('.parallax').parallax();

}]);
