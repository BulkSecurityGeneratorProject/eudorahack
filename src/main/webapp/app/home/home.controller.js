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

        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });
        NavigatorGeolocation.getCurrentPosition().then(function(position) {
         var lat = position.coords.latitude, lng = position.coords.longitude;
         vm.center.lat = lat;
         vm.center.lng = lng;

         vm.vendedoras = [
            {
                lat: -12.976952,
                lng: -38.502818
            },
            {
                lat: -12.970242,
                lng: -38.489248
            },
            {
                lat: -12.977485,
                lng: -38.496010
            },
            {
                lat: -12.978410,
                lng: -38.497528
            },
            {
                lat: -12.980769,
                lng: -38.502474
            }
        ];
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
