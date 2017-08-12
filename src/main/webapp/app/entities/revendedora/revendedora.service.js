(function() {
    'use strict';
    angular
        .module('eudorahackApp')
        .factory('Revendedora', Revendedora);

    Revendedora.$inject = ['$resource'];

    function Revendedora ($resource) {
        var resourceUrl =  'api/revendedoras/:id';

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
