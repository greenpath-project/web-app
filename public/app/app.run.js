angular.module('greenPathApp').run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.hideInterface = false;
    $rootScope.$on('$routeChangeStart', function(event, next, current){
        
        if($location.url() === '/map/nointerface'){            
            $rootScope.hideInterface = true;
        }       
        else{
            $rootScope.hideInterface = false;
        }
    });    
}]);