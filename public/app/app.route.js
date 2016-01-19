angular.module('greenPathApp').config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/home',
        {
            templateUrl: 'app/components/home/home.vw.html'
        }
    ).when('/documentation',
        {
            templateUrl: 'app/components/documentation/documentation.vw.html'
        }
    ).when('/documentation/hardware',
        {
            templateUrl: 'app/components/documentation/hardware/hardware.vw.html'
        }
    ).when('/documentation/software',
        {
            templateUrl: 'app/components/documentation/software/software.vw.html'
        }
    ).when('/engine',
        {
            templateUrl: 'app/components/engine/engine.vw.html'
        }
    ).when('/map',
        {
            templateUrl: 'app/components/map/map.vw.html'
        }
    ).when('/project',
        {
            templateUrl: 'app/components/project/project.vw.html',
            controller: 'ProjectCtrl'
        }
    ).when('/about',
        {
            templateUrl: 'app/components/about/about.vw.html'
        }
    ).otherwise(
        {
            redirectTo: '/home'
        }
    );

}]);