(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('LocalizacaoDetailController', LocalizacaoDetailController);

    LocalizacaoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Localizacao', 'Revendedora'];

    function LocalizacaoDetailController($scope, $rootScope, $stateParams, previousState, entity, Localizacao, Revendedora) {
        var vm = this;

        vm.localizacao = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('eudorahackApp:localizacaoUpdate', function(event, result) {
            vm.localizacao = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
