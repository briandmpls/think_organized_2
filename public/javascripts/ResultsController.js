/**
 * Created by briandaves on 10/26/15.
 */

app.controller('ResultsController', ['$scope','$http','$filter', function($scope,$http,$filter) {
    var directionsService;
    $scope.loading = true;
    $scope.place = '';
    var lat= '';
    var long ='';
    $scope.distanceBetween = "";

    var data = [];
    var address = "";
    var orderBy = $filter('orderBy');


    //Establish empty array of objects
    $scope.donationList=[];


    // Search for current location

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } else {
            $scope.place = "Geolocation is not supported by this browser.";
        }
    }

    //sets current position to lat and long variables
    $scope.showPosition = function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        $scope.place = "Latitude:" + lat + "    Longitude: " + long;

        console.log(lat,long);
        console.log($scope.place);
        getData();
    };



    // HTTP call to database

    function getData(){
        $scope.donationList = [];

        $http.get('/site/getSites',data).then(function (response) {
            $scope.loading = false;

            var dataItems = response.data;

            console.log(response.data);

            //forEach Loop
            dataItems.forEach(function(item){
                console.log(item);
                calcDistance(item);

            });


        });

    }


    // Calculates the distance between current position and donation site in database

    function calcDistance(item) {
        console.log("before");
       directionsService = new google.maps.DirectionsService();
        console.log("after");

        console.log("Api Key",process.env.apikey);
        function calcRoute() {

            console.log("calc Route");
            var startingPoint = lat + ',' + long;

            address = item.location;

            var request = {
                origin: startingPoint,
                destination: address,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING
            };



            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    console.log('Status ok');
                    item.distanceAway = response.routes[0].legs[0].distance.value;
                    console.log('Data after modification', item);
                    item.distanceAway = (item.distanceAway / 1609.34).toFixed(1);
                    item.distanceAway = parseFloat(item.distanceAway);
                    console.log(item.distanceAway);

                    ////Push to the distanceArray----------------(
                    console.log('before push');
                    console.log($scope.donationList);
                    $scope.donationList.push(item);


                    $scope.$apply();



                //Sets a timeout function to not go over query limit because of Google restrictions

                } else if(status == google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                    setTimeout(function () {
                        calcRoute();
                    }, 200);
                }else {
                    console.log("Problem", status);
                }

            });

        }

    }

    getLocation();


}]);