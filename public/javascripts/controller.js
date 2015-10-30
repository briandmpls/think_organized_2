//var app = angular.module('site',[]);

app.controller('MainController', ['$scope','$http', function($scope,$http) {

        $scope.place = '';
        var lat= '';
        var long ='';
        $scope.distanceBetween = "";

        var data = [];
        var address = "";



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


    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }


    initMap();

}]);


