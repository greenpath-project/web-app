angular.module('greenPathApp').config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/home',
        {
            templateUrl: 'app/components/home/home.vw.html',
            controller: 'HomeCtrl'
        }
    ).when('/documentation',
        {
            templateUrl: 'app/components/documentation/documentation.vw.html',
            controller: 'DocumentationCtrl'
        }
    ).when('/documentation/hardware',
        {
            templateUrl: 'app/components/documentation/hardware/hardware.vw.html',
            controller: 'HardwareCtrl'
        }
    ).when('/documentation/software',
        {
            templateUrl: 'app/components/documentation/software/software.vw.html',
            controller: 'SoftwareCtrl'
        }
    ).when('/engine',
        {
            templateUrl: 'app/components/engine/engine.vw.html',
            controller: 'EngineCtrl'
        }
    ).when('/map/:hideInterface?',
        {
            templateUrl: 'app/components/map/map.vw.html',
            controller: 'MapCtrl'
        }
    ).when('/project',
        {
            templateUrl: 'app/components/project/project.vw.html',
            controller: 'ProjectCtrl'
        }
    ).when('/legal',
        {
            templateUrl: 'app/components/legal/legal.vw.html',
            controller: 'LegalCtrl'
        }
    ).when('/plan',
        {
            templateUrl: 'app/components/plan/plan.vw.html',
            controller: 'MainCtrl'
        }
    ).otherwise(
        {
            redirectTo: '/home'
        }
    );

}]);