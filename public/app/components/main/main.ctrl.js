angular.module('greenPathApp').controller('MainCtrl', ['$scope', 'Nav', function($scope, Nav){

    $scope.cards = Nav.query();

    $('.parallax').parallax();

    $scope.findCard = function(title){
        angular.forEach($scope.cards, function(card){
            if(title == card.title){
                console.log(card.title);
                return card;
            }
        });
    };

}]);
