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

//// HTTP call to database
//
//        $scope.getData= function(){
//            $scope.donationList = [];
//
//
//            $http.get('/site/getSites',data).then(function (response) {
//                     // console.log(response);
//                        var dataItems = response.data;
//                        console.log(dataItems);
//                        address = dataItems[0].location;
//
//
////forEach Loop *******
//                dataItems.forEach(function(item){
//
//                        console.log(item);
//                      // console.log($scope.donationList);
//
//                    calcDistance(item);
//                });
//
//
//            });
//
//        };
//
//        function calcDistance(item){
//
//            var directionsService = new google.maps.DirectionsService();
//
//            var startingPoint = lat + ',' + long;
//
//            console.log('Before Distance Calculation');
//            address = item.location;
//            // address = dataItems[0].location;
//            var request =  {
//                origin: startingPoint,
//                destination: address,
//                optimizeWaypoints: true,
//                travelMode: google.maps.TravelMode.DRIVING
//            };
//
//
//            directionsService.route(request, function(response, status){
//                console.log(response);
//                if (status == google.maps.DirectionsStatus.OK) {
//                    console.log('Status ok');
//////Push to the distanceArray----------------(
//                    item.distanceAway = response.routes[0].legs[0].distance.text;
//                console.log('Data after modification', item);
//
//                    $scope.donationList.push(item);
//                    $scope.$apply();
//                }else{
//                    console.log("Problem Dude!", status);
//                }
//            });
//
//
//            //$scope.$apply();
//            console.log($scope.donationList);
//
//        }




}]);


