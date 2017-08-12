(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('ProdutoDialogController', ProdutoDialogController);

    ProdutoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Produto', 'Revendedora', 'RevendedoraGet', 'Principal'];

    function ProdutoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Produto, Revendedora, RevendedoraGet, Principal) {
        var vm = this;

        vm.produto = entity;
        vm.clear = clear;
        vm.save = save;
        //vm.revendedoras = Revendedora.query();
        vm.produtos = [];
        vm.add = add;
        vm.produtoNovo = {};
        vm.produtoNovo.revendedora = {};
        vm.usuarioLogado = {};

        loadAll();

        function loadAll() {
            Produto.query(function(result) {
                
                vm.produtos = result;
            });
        }

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
            Principal.fullIdentity().then(function(data){
                data.$promise.then(function(user){
                    vm.usuarioLogado = user;
                    RevendedoraGet.get({idUser:vm.usuarioLogado.id}, function(data) {
                        delete data.$promise;
                        delete data.$resolved;
                        vm.revendedora = data;
                        
                    });  
                });
            });


        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.produto.id !== null) {
                Produto.update(vm.produto, onSaveSuccess, onSaveError);
            } else {
                Produto.save(vm.produto, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('eudorahackApp:produtoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        function add (produto) {
            vm.produtoNovo.codigo = produto.codigo;
            vm.produtoNovo.foto = produto.foto;
            vm.produtoNovo.nome = produto.nome;
            vm.produtoNovo.quantidade = 1;           
            vm.produtoNovo.revendedora = vm.revendedora;
            Produto.save(vm.produtoNovo, onSaveSuccess, onSaveError);
        }


    }
})();
