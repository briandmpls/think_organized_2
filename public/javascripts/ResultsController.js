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
    var myVar;


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

           //forEach Loop *******
            dataItems.forEach(function(item){

                var lat2 = item.coordinates[0];
                var lon2 = item.coordinates[1];

                console.log("Lat2 :" + lat2);
                console.log("Lon2: " + lon2);

                console.log("Item Location: " + item.location);
                //calcDistance(item);
                getDistanceFromLatLonInKm(lat,long,lat2,lon2,item);
            });


        });

    }


// Calculates distance away using Google  Driving Distance Distance
//    This way is very slow as it take many calls to Google API
//    ******** Not currently using lines 83-138 **********


    function calcDistance(item) {

        directionsService = new google.maps.DirectionsService();



        function calcRoute() {

            console.log("calc Route");
            var startingPoint = lat + ',' + long;

            address = item.location;

            //console.log("Starting Point" + startingPoint);
            console.log("Address to search for" + address);


            var request = {
                origin: startingPoint,
                destination: address,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING
            };

            //Google distance away
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    console.log('Status ok');
                    item.distanceAway = response.routes[0].legs[0].distance.value;
                    console.log('Data after modification', item);
                    item.distanceAway = (item.distanceAway / 1609.34).toFixed(1);
                    item.distanceAway = parseFloat(item.distanceAway);
                    console.log(item.distanceAway);

                   //Push to the distanceArray----------------(
                    console.log('before push');
                    //console.log($scope.donationList);
                    $scope.donationList.push(item);


                    $scope.$apply();

                } else if(status == google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                    setTimeout(function () {
                        calcRoute();
                    }, 200);
                }else {
                    console.log("Problem ", status);
                }

            });

        }

        myVar = setTimeout(calcRoute(), 2000);
    }

// End of Google Distance Driving distance calculations ******** Not Using above code*****





    //Calculating distance away  based on the Haversine formula

    function getDistanceFromLatLonInKm(lat,long,lat2,lon2,item) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat);  // deg2rad below
        var dLon = deg2rad(lon2-long);
        var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        console.log("Distance: " + d);

                    console.log('Status ok');
                    item.distanceAway = d;
                    //console.log('Data after modification', item);
                    item.distanceAway = d.toFixed(1);
                    item.distanceAway = parseFloat(item.distanceAway);
                    console.log(item.distanceAway);

                    //Push to the distanceArray----------------(
                    console.log('before push');
                    //console.log($scope.donationList);
                    $scope.donationList.push(item);

        return d;
    };

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    };



    getLocation();


}]);