(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('RegisterController', RegisterController);


    RegisterController.$inject = [ '$timeout',  'Auth', 'LoginService', 'Revendedora', 'Principal', '$state', 'User'];

    function RegisterController ($timeout, Auth, LoginService, Revendedora, Principal, $state, User) {
        var vm = this;

        vm.doNotMatch = null;
        vm.error = null;
        vm.errorUserExists = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.registerAccount = {};
        vm.success = null;
        vm.revendedora = {};

        $timeout(function (){angular.element('#login').focus();});

        function register () {
            if (vm.registerAccount.password !== vm.confirmPassword) {
                vm.doNotMatch = 'ERROR';
            } else {
                vm.registerAccount.langKey =  'en' ;
                vm.doNotMatch = null;
                vm.error = null;
                vm.errorUserExists = null;
                vm.errorEmailExists = null;
                Auth.createAccount(vm.registerAccount).then(function (result) {
                    vm.success = 'OK';
                    delete result.$promise;
                    delete result.$resolved;

                    vm.user = result;
                
                    Auth.login({
                        username: result.login,
                        password: result.password,
                        rememberMe: true
                    }).then(function () {
                        vm.authenticationError = false;
                        if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                            $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                            Principal.fullIdentity().then(function(data){
                                data.$promise.then(function(data){
                                    delete data.$promise;
                                    vm.revendedora.user = new User(data);
                                    Revendedora.save(vm.revendedora);
                                });
                            });
                            $state.go('home');
                        }
                        //$rootScope.$broadcast('authenticationSuccess');
                    }).catch(function () {
                        vm.authenticationError = true;
                    });
                }).catch(function (response) {
                    vm.success = null;
                    if (response.status === 400 && response.data === 'CPF já cadastrado.') {
                        vm.errorUserExists = 'ERROR';
                    } else if (response.status === 400 && response.data === 'E-mail já está sendo utilizado em outra conta.') {
                        vm.errorEmailExists = 'ERROR';
                    } else {
                        vm.error = 'ERROR';
                    }
                });
            };
        }
        
    }

})();
