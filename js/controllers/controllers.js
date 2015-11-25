var greenPathControllers = angular.module('GreenPathControllers', []);

greenPathControllers.controller('navCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.cards = [        
        {
            title: 'Accueil',
            description: 'L\'Accueil',
            url: '#/',
            imgUrl: '',
            showCard: false,
            activated: true,
            isHome: true
        },
        {
            title: 'Projet',
            description: 'Toutes les informations relatives au projet Green Path.',
            url: '#projet',
            imgUrl: 'img/projet.png',
            showCard: true,
            activated: false,
            isHome: false
        },
        {
            title: 'Carte',
            description: 'Accès à la carte interrative Green Path.',
            url: '#carte',
            imgUrl: 'img/carte.png',
            showCard: true,
            activated: false,
            isHome: false
        },
        {
            title: 'Moteur de recherche',
            description: 'Accès au moteur de recherche de métadonnées.',
            url: '#recherche',
            imgUrl: 'img/recherche.png',  
            showCard: true,
            activated: false,
            isHome: false
        },
        {
            title: 'Documentation',
            description: 'Toute la documentation Green Path.',
            url: '#documentation',
            imgUrl: 'img/doc.png',
            showCard: true,
            activated: false,
            isHome: false
        },
        {
            title: 'A propos',
            description: 'Plus d\'information',
            url: '#apropos',
            imgUrl: 'img/info.png',
            showCard: true,
            activated: false,
            isHome: false
        }
    ]

    $scope.toggleCard = function(paramCard){
        $scope.cards.forEach(function(card){
            if(card.isHome == false){
                card.activated = false;  
            } 
            if(card.url == paramCard.url){
                card.activated = true;
            }
        });
    }

}]);

greenPathControllers.controller('projetCtrl', ['$scope', function($scope){
    $scope.test = 'test';
}]);