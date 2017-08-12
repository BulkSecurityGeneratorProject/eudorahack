(function() {
    'use strict';

    angular
        .module('eudorahackApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$http', '$timeout', 'Principal', 'LoginService', '$state', 'NgMap', 'NavigatorGeolocation', 'GoogleMapsApi', 'Produto', 'entityProdutos'];

    function HomeController ($scope, $http, $timeout, Principal, LoginService, $state, NgMap, NavigatorGeolocation, GoogleMapsApi, Produto,entityProdutos) {
        var vm = this;

        vm.account = null;
        vm.produtos = entityProdutos;
        vm.isAuthenticated = null;
        vm.calcDistancia = calcDistancia;
        vm.login = LoginService.open;
        vm.register = register;
        vm.center = {};
        vm.map = {};
        vm.vendedoras = [];
        vm.online = "content/images/logo2.png";
        vm.refreshProduto = refreshProduto;

        $timeout(function(){
         loadAll();   
     },1000);
        

        function loadAll() {
            Produto.query(function(result) {
                console.log('result');
                vm.produtos = result;
            });
        }
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

        GoogleMapsApi.load("http://localhost:8080").then(function(map) {
            vm.map = map;
        });
        
       });
        function refreshProduto (address) {
            var params = {address: address, sensor: false};
            return Produto.query();
          };
        NgMap.getMap().then(function(map) {
            map.center = vm.center;
            //console.log(map.getCenter());
            //console.log('markers', map.markers);
            //console.log('shapes', map.shapes);
          });

        getAccount();
        function getEndereco(lat, lng){
            $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng, function(status,result){
                console.log(result, status);
            });
        }
        function calcDistancia(lat1, lon1, lat2, lon2, unit) {

             getEndereco(lat1.latLng.lat(), lon1);
            var origin1 = new google.maps.LatLng(lat1.latLng.lat(), lon1);
            var destinationA = 'Cliente';

            var origin2 = new google.maps.LatLng(lat2, lon2);
            var destinationB = 'vendedora';

            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
              {
                origins: [origin1],
                destinations: [origin2],
                travelMode: google.maps.TravelMode.WALKING
              }, callback);

    
            function callback(response, status) {
                if (status == google.maps.DistanceMatrixStatus.OK) {
                    console.log(response);
                    console.log("Distância:" + response.rows[0].elements[0].distance);
                    // alert("Duração:" + response.rows[0].elements[0].duration.text);
                }
            }
            // var radlat1 = Math.PI * lat1.latLng.lat()/180
            // var radlat2 = Math.PI * lat2/180
            // var theta = lon1 - lon2
            // var radtheta = Math.PI * theta/180
            // var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            // dist = Math.acos(dist)
            // dist = dist * 180/Math.PI
            // dist = dist * 60 * 1.1515
            // if (unit=="K") { dist = dist * 1.609344 }
            // if (unit=="N") { dist = dist * 0.8684 }
            // console.log(dist);
        }

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
