angular.module('greenPathApp').controller('navCtrl', ['$scope', 'breadcrumbs', 'Nav', function($scope, breadcrumbs, Nav){

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
    $scope.header = $scope.templates[0];
    $scope.footer = $scope.templates[1];

}]);
