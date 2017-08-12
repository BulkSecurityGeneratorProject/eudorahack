(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('LocalizacaoDialogController', LocalizacaoDialogController);

    LocalizacaoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Localizacao', 'Revendedora'];

    function LocalizacaoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Localizacao, Revendedora) {
        var vm = this;

        vm.localizacao = entity;
        vm.clear = clear;
        vm.save = save;
        vm.revendedoras = Revendedora.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.localizacao.id !== null) {
                Localizacao.update(vm.localizacao, onSaveSuccess, onSaveError);
            } else {
                Localizacao.save(vm.localizacao, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('eudorahackApp:localizacaoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
