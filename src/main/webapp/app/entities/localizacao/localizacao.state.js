(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('localizacao', {
            parent: 'entity',
            url: '/localizacao',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Localizacaos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/localizacao/localizacaos.html',
                    controller: 'LocalizacaoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('localizacao-detail', {
            parent: 'entity',
            url: '/localizacao/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Localizacao'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/localizacao/localizacao-detail.html',
                    controller: 'LocalizacaoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Localizacao', function($stateParams, Localizacao) {
                    return Localizacao.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'localizacao',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('localizacao-detail.edit', {
            parent: 'localizacao-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/localizacao/localizacao-dialog.html',
                    controller: 'LocalizacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Localizacao', function(Localizacao) {
                            return Localizacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('localizacao.new', {
            parent: 'localizacao',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/localizacao/localizacao-dialog.html',
                    controller: 'LocalizacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                latitude: null,
                                longitude: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('localizacao', null, { reload: 'localizacao' });
                }, function() {
                    $state.go('localizacao');
                });
            }]
        })
        .state('localizacao.edit', {
            parent: 'localizacao',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/localizacao/localizacao-dialog.html',
                    controller: 'LocalizacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Localizacao', function(Localizacao) {
                            return Localizacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('localizacao', null, { reload: 'localizacao' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('localizacao.delete', {
            parent: 'localizacao',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/localizacao/localizacao-delete-dialog.html',
                    controller: 'LocalizacaoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Localizacao', function(Localizacao) {
                            return Localizacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('localizacao', null, { reload: 'localizacao' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
