angular.module('greenPathApp').controller('MainCtrl', ['$scope', 'breadcrumbs', 'Nav', function($scope, breadcrumbs, Nav){

    $scope.cards = Nav.query();

    $scope.isNavbarCollapsed = true;

    $scope.breadcrumbs = breadcrumbs;

    $scope.templates = [
        {
            name: 'header',
            url: 'app/shared/header/header.vw.html'
        },
        {
            name: 'footer',
            url: 'app/shared/footer/footer.vw.html'
        }
    ];

}]);
