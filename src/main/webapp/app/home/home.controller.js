(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'NgMap', 'NavigatorGeolocation'];

    function HomeController ($scope, Principal, LoginService, $state, NgMap, NavigatorGeolocation) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.center = {};
        vm.vendedoras = [];
        vm.online = "content/images/logo2.png";

        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });
        NavigatorGeolocation.getCurrentPosition().then(function(position) {
         var lat = position.coords.latitude, lng = position.coords.longitude;
         var i = 0;
         vm.center.lat = lat;
         vm.center.lng = lng;

         vm.vendedoras = [
            {
                lat: -12.976952,
                lng: -38.502818,
                online: false,
                icon: 'http://encontreeudora.com.br/Images/bg/pin-revendedora.png'
            },
            {
                lat: -12.970242,
                lng: -38.489248,
                online: false,
                icon: 'http://encontreeudora.com.br/Images/bg/pin-revendedora.png'
            },
            {
                lat: -12.977485,
                lng: -38.496010,
                online: true,
                icon: 'http://encontreeudora.com.br/Images/bg/pin-revendedora.png'
            },
            {
                lat: -12.978410,
                lng: -38.497528,
                online: false,
                icon: 'http://encontreeudora.com.br/Images/bg/pin-revendedora.png'
            },
            {
                lat: -12.980769,
                lng: -38.502474,
                online: true,
                icon: 'http://encontreeudora.com.br/Images/bg/pin-revendedora.png'
            }
        ];

        // for (i = 0 ; i =< vm.vendedoras.length; i++) {
        //     if (vm.vendedoras[i].online == true) {
        //         vm.vendedoras[i].icon = vm.online;
        //     } else {
        //         vm.vendedoras[i].icon = "http://encontreeudora.com.br/Images/bg/pin-minha-localizacao.png"
        //     }
        // }
       });

        NgMap.getMap().then(function(map) {
            map.center = vm.center;
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
          });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
