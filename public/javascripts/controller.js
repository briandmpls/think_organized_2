//var app = angular.module('site',[]);

app.controller('MainController', ['$scope','$http', function($scope,$http) {

        $scope.place = '';
        var lat= '';
        var long ='';
        $scope.distanceBetween = "";

        var data = [];
        var address = "";

    function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(44.5403, -78.5463),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
    }
    google.maps.event.addDomListener(window, 'load', initialize());

//Establish empty array of objects
         $scope.donationList=[];


// Search for current location

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition($scope.showPosition);
                } else {
                    $scope.place = "Geolocation is not supported by this browser.";
                }
            };

            $scope.showPosition = function(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;

                $scope.place = "Latitude:" + lat + "    Longitude: " + long;

                $scope.$digest();
                console.log(lat,long);
                console.log($scope.place);
                };

                getLocation();




}]);


