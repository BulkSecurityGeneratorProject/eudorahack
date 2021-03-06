(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            },
            resolve:{
                entityProdutos:['Produto', function(Produto){
                    console.log(Produto.query())
                    return Produto.query();
                }]
            }
        });
    }
})();
