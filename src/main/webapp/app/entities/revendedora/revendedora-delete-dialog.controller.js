(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('RevendedoraDeleteController',RevendedoraDeleteController);

    RevendedoraDeleteController.$inject = ['$uibModalInstance', 'entity', 'Revendedora'];

    function RevendedoraDeleteController($uibModalInstance, entity, Revendedora) {
        var vm = this;

        vm.revendedora = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Revendedora.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
