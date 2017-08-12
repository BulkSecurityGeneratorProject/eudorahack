(function() {
    'use strict';
    angular
        .module('eudorahackApp')
        .factory('RevendedoraGet', RevendedoraGet);

    RevendedoraGet.$inject = ['$resource'];

    function RevendedoraGet ($resource) {
        var resourceUrl =  'api/search/getRevendedoraByUser/:idUser';

        return $resource(resourceUrl, {}, {
            'get': {
                method: 'GET',
                isArray: false
            }
        });
    }
})();
