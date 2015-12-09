angular.module('greenPathApp').controller('navCtrl', ['$scope', 'breadcrumbs', function($scope, breadcrumbs){
    $scope.cards = [      
        {
            title: 'Projet',
            description: 'Toutes les informations relatives au projet Green Path.',
            url: 'projet',
            imgUrl: 'assets/img/projet.png'
        },
        {
            title: 'Carte',
            description: 'Accès à la carte interrative Green Path.',
            url: 'carte',
            imgUrl: 'assets/img/carte.png'
        },
        {
            title: 'Moteur de recherche',
            description: 'Accès au moteur de recherche de métadonnées.',
            url: 'recherche',
            imgUrl: 'assets/img/recherche.png'
        },
        {
            title: 'Documentation',
            description: 'Toute la documentation Green Path.',
            url: 'documentation',
            imgUrl: 'assets/img/doc.png'
        },
        {
            title: 'A propos',
            description: 'Plus d\'information',
            url: 'apropos',
            imgUrl: 'assets/img/info.png'
        }
    ]; 

    $scope.isNavbarCollapsed = true;

    $scope.breadcrumbs = breadcrumbs;

    $scope.templates = [
        {
            name: 'header',
            url: 'app/components/navigation/header.vw.html'
        }
    ];
    $scope.template = $scope.templates[0];
    
}]);
