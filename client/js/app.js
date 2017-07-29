"use strict"

var app = angular.module('uiApp', ['ui.router', '720kb.socialshare']);
app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller:'loginController'
    })

    .state('logout', {

        url: '/logout'

    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'views/form-register.html',
        controller:'registerController'      
    })

    .state('dash', {
        url: '/dash',
        templateUrl: 'views/dash.html',
        controller:'dashController'
    })

    .state('map', {
        url: '/map',
        templateUrl: 'views/map.html',
        controller: 'mapController'
    })

    .state('changePass', {
        url: '/changepass',
        templateUrl: 'views/changepass.html',
        controller:'changePassController'
    })

    .state('profile', {
        url: '/profile',
        templateUrl:'views/profile.html',
        controller:'profileController'
        
    });
    

    $urlRouterProvider.otherwise('/login');

});

app.factory('PreviousState', ['$rootScope', '$state',
  function ($rootScope, $state) {
    
    var lastHref = "/home",
        lastStateName = "home", 
        lastParams = {}; 

    $rootScope.$on("$stateChangeSuccess", function (event,toState, toParams
                                                       , fromState, fromParams) {
        lastStateName = fromState.name;
        lastParams = fromParams;
        lastHref = $state.href(lastStateName, lastParams)
        if(localStorage.getItem("user")){

                    if(toState.url=='/logout'){
                        localStorage.removeItem('user');
                        $state.go('login');
                    }else{
                if(toState.url == '/login' || toState.url == '/signup'){
                    if(lastHref == null){
                        $state.go('dash');
                    } else {
                        $state.go(lastStateName);
                    } 
                }}
        } 
        else {

            if(toState.url != '/login'&&toState.url != '/signup'){
    
                    
                        $state.go('login');
                    
            } 
        }
    })
    
    return {
      getLastHref: function (){ return lastHref ; },
      goToLastState: function (){ return $state.go(lastStateName, lastParams); },
    }
    
}])

app.run(['$rootScope', '$state', '$stateParams', 'PreviousState',function ($rootScope, $state, $stateParams, PreviousState) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams; 
    $rootScope.PreviousState = PreviousState;
}])