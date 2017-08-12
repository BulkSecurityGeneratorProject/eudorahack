(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('RevendedoraController', RevendedoraController);

    RevendedoraController.$inject = ['$scope', '$state', 'Revendedora'];

    function RevendedoraController ($scope, $state, Revendedora) {
        var vm = this;
        
        vm.revendedoras = [];

        loadAll();

        function loadAll() {
            Revendedora.query(function(result) {
                vm.revendedoras = result;
            });
        }
    }
})();
