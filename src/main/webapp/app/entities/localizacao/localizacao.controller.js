(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('LocalizacaoController', LocalizacaoController);

    LocalizacaoController.$inject = ['$scope', '$state', 'Localizacao'];

    function LocalizacaoController ($scope, $state, Localizacao) {
        var vm = this;
        
        vm.localizacaos = [];

        loadAll();

        function loadAll() {
            Localizacao.query(function(result) {
                vm.localizacaos = result;
            });
        }
    }
})();
