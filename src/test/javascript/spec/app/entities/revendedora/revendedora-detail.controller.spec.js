'use strict';

describe('Controller Tests', function() {

    describe('Revendedora Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockRevendedora, MockProduto, MockLocalizacao, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockRevendedora = jasmine.createSpy('MockRevendedora');
            MockProduto = jasmine.createSpy('MockProduto');
            MockLocalizacao = jasmine.createSpy('MockLocalizacao');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Revendedora': MockRevendedora,
                'Produto': MockProduto,
                'Localizacao': MockLocalizacao,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("RevendedoraDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'eudorahackApp:revendedoraUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
