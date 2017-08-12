(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'uiGmapGoogleMapApiProvider'];

    function stateConfig($stateProvider, uiGmapGoogleMapApiProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'navbar@': {
                    templateUrl: 'app/layouts/navbar/navbar.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                authorize: ['Auth',
                    function (Auth) {
                        return Auth.authorize();
                    }
                ]
            }
        });

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyD0mmApnQLquVEW3R5zQGNxuHkmMgJ4UV8',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization',
            china: true
        });
    }
})();
