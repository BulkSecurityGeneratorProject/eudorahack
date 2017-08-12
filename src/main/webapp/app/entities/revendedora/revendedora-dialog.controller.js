(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('RevendedoraDialogController', RevendedoraDialogController);

    RevendedoraDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Revendedora', 'Produto', 'Localizacao', 'User'];

    function RevendedoraDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Revendedora, Produto, Localizacao, User) {
        var vm = this;

        vm.revendedora = entity;
        vm.clear = clear;
        vm.save = save;
        vm.produtos = Produto.query();
        vm.localizacaos = Localizacao.query();
        vm.users = User.query();

        vm.produtoss = [1,2,3,4];

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.revendedora.id !== null) {
                Revendedora.update(vm.revendedora, onSaveSuccess, onSaveError);
            } else {
                Revendedora.save(vm.revendedora, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('eudorahackApp:revendedoraUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
