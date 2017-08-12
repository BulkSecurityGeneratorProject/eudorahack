(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('LocalizacaoDeleteController',LocalizacaoDeleteController);

    LocalizacaoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Localizacao'];

    function LocalizacaoDeleteController($uibModalInstance, entity, Localizacao) {
        var vm = this;

        vm.localizacao = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Localizacao.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
