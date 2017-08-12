(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('RevendedoraDetailController', RevendedoraDetailController);

    RevendedoraDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Revendedora', 'Produto', 'Localizacao', 'User'];

    function RevendedoraDetailController($scope, $rootScope, $stateParams, previousState, entity, Revendedora, Produto, Localizacao, User) {
        var vm = this;

        vm.revendedora = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('eudorahackApp:revendedoraUpdate', function(event, result) {
            vm.revendedora = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
