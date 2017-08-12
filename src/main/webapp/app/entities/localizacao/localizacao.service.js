(function() {
    'use strict';
    angular
        .module('eudorahackApp')
        .factory('Localizacao', Localizacao);

    Localizacao.$inject = ['$resource'];

    function Localizacao ($resource) {
        var resourceUrl =  'api/localizacaos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
