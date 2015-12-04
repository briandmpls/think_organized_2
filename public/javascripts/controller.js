//var app = angular.module('site',[]);

app.controller('MainController', ['$scope','$http', function($scope,$http) {

        $scope.place = '';
        var lat= '';
        var long ='';
        $scope.distanceBetween = "";

        var data = [];
        var address = "";
    //
    //function initialize() {
    //    var mapCanvas = document.getElementById('map');
    //    var mapOptions = {
    //        center: new google.maps.LatLng(44.5403, -78.5463),
    //        zoom: 8,
    //        mapTypeId: google.maps.MapTypeId.ROADMAP
    //    }
    //    var map = new google.maps.Map(mapCanvas, mapOptions)
    //}
    //google.maps.event.addDomListener(window, 'load', initialize());




// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
//
//    function initMap() {
//        var map = new google.maps.Map(document.getElementById('map'), {
//            center: {lat: -34.397, lng: 150.644},
//            zoom: 6
//        });
//        var infoWindow = new google.maps.InfoWindow({map: map});
//
//        // Try HTML5 geolocation.
//        if (navigator.geolocation) {
//            navigator.geolocation.getCurrentPosition(function(position) {
//                var pos = {
//                    lat: position.coords.latitude,
//                    lng: position.coords.longitude
//                };
//
//                infoWindow.setPosition(pos);
//                infoWindow.setContent('Location found.');
//                map.setCenter(pos);
//            }, function() {
//                handleLocationError(true, infoWindow, map.getCenter());
//            });
//        } else {
//            // Browser doesn't support Geolocation
//            handleLocationError(false, infoWindow, map.getCenter());
//        }
//    }
//
//    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//        infoWindow.setPosition(pos);
//        infoWindow.setContent(browserHasGeolocation ?
//            'Error: The Geolocation service failed.' :
//            'Error: Your browser doesn\'t support geolocation.');
//    }
//
////initMap();

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


