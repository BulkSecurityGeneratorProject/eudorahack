(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('revendedora', {
            parent: 'entity',
            url: '/revendedora',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Revendedoras'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/revendedora/revendedoras.html',
                    controller: 'RevendedoraController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('revendedora.perfil', {
            parent: 'revendedora',
            url: '/perfil',
            data: {
                authorities: [],
                pageTitle: 'Revendedora - Perfil'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/revendedora/revendedora-perfil.html',
                    controller: 'RevendedoraController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('revendedora.chat', {
            parent: 'revendedora',
            url: '/chat',
            data: {
                authorities: [],
                pageTitle: 'Revendedora - Chat'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/revendedora/revendedora-chat.html',
                    controller: 'RevendedoraController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('revendedora-detail', {
            parent: 'entity',
            url: '/revendedora/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Revendedora'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/revendedora/revendedora-detail.html',
                    controller: 'RevendedoraDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Revendedora', function($stateParams, Revendedora) {
                    return Revendedora.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'revendedora',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('revendedora-detail.edit', {
            parent: 'revendedora-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/revendedora/revendedora-dialog.html',
                    controller: 'RevendedoraDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Revendedora', function(Revendedora) {
                            return Revendedora.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('revendedora.new', {
            parent: 'revendedora',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/revendedora/revendedora-dialog.html',
                    controller: 'RevendedoraDialogController',
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
                    $state.go('revendedora', null, { reload: 'revendedora' });
                }, function() {
                    $state.go('revendedora');
                });
            }]
        })
        .state('revendedora.edit', {
            parent: 'revendedora',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/revendedora/revendedora-dialog.html',
                    controller: 'RevendedoraDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Revendedora', function(Revendedora) {
                            return Revendedora.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('revendedora', null, { reload: 'revendedora' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('revendedora.delete', {
            parent: 'revendedora',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/revendedora/revendedora-delete-dialog.html',
                    controller: 'RevendedoraDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Revendedora', function(Revendedora) {
                            return Revendedora.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('revendedora', null, { reload: 'revendedora' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
