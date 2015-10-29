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
    };

    $scope.showPosition = function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        $scope.place = "Latitude:" + lat + "    Longitude: " + long;

      //  $scope.$digest();
        console.log(lat,long);
        console.log($scope.place);
        getData();
    };



// HTTP call to database

    function getData(){
        $scope.donationList = [];

        $http.get('/site/getSites',data).then(function (response) {
            $scope.loading = false;

            // console.log(response);
            var dataItems = response.data;

//How can this have distance away already if it is not in database
            console.log(response.data);
            //console.log("dataItems = ", dataItems);



//forEach Loop *******
            dataItems.forEach(function(item){
               // console.log(item.distanceAway);
                console.log(4);
                console.log(item);
                calcDistance(item);
            });


        });

    }

    function calcDistance(item){
        directionsService = new google.maps.directionsService();

        var startingPoint = lat + ',' + long;

        address = item.location;

        var request =  {
            origin: startingPoint,
            destination: address,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };


        directionsService.route(request, function(response, status){
            console.log(response);
            if (status == google.maps.DirectionsStatus.OK) {
                console.log('Status ok');
                item.distanceAway = response.routes[0].legs[0].distance.value;
                console.log('Data after modification', item);
                item.distanceAway = (item.distanceAway/1609.34).toFixed(1);
                //angular.isNumber(item.distanceAway);
                item.distanceAway = parseFloat(item.distanceAway);
                console.log(item.distanceAway);

////Push to the distanceArray----------------(
                console.log('before push');
                console.log($scope.donationList);
                $scope.donationList.push(item);



                $scope.$apply();

            }else{
                console.log("Problem Dude!", status);
            }

        });

    }
    getLocation();

}]);