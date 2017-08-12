(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('ProdutoDetailController', ProdutoDetailController);

    ProdutoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Produto', 'Revendedora'];

    function ProdutoDetailController($scope, $rootScope, $stateParams, previousState, entity, Produto, Revendedora) {
        var vm = this;

        vm.produto = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('eudorahackApp:produtoUpdate', function(event, result) {
            vm.produto = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
