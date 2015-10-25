var app = angular.module('site',[]);

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

// HTTP call to database

        $scope.getData= function(){
            $scope.donationList = [];
           // console.log($scope.donationList);

            //var data = {name: $scope.donationList
            //            location: $scope.donationList,
            //            phone: $scope.donationList,
            //            hoursAccepting: $scope.donationList,
            //            notes: $scope.donationList,
            //            distanceAway: $scope.donationList
            //            };
              //  console.log(data);

           // console.log($scope.donationList);

            $http.get('/site/getSites',data).then(function (response) {
                     // console.log(response);
                        var dataItems = response.data;
                        console.log(dataItems);
                        address = dataItems[0].location;


//forEach Loop *******
                dataItems.forEach(function(item){

                        console.log(item);
                      // console.log($scope.donationList);

                    calcDistance(item);
                });


            });
            //$scope.$apply();
        };

        function calcDistance(item){

            var directionsService = new google.maps.DirectionsService();

            var startingPoint = lat + ',' + long;

            console.log('Before Distance Calculation');
            address = item.location;
            // address = dataItems[0].location;
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
////Push to the distanceArray----------------(
                    item.distanceAway = response.routes[0].legs[0].distance.text;
                console.log('Data after modification', item);

                    $scope.donationList.push(item);
                    $scope.$apply();
                }else{
                    console.log("Problem Dude!", status);
                }
            });


            //$scope.$apply();
            console.log($scope.donationList);

        }


// Add new sites to the donationList

                        $scope.addNewSite = function(){

                             console.log('tried to post');

                             $scope.donationList.push(
                                {name:$scope.newName,
                                 location:$scope.newLocation,
                                 phone:$scope.newPhone,
                                 hoursAccepting:$scope.newHoursAccepting,
                                 notes:$scope.newNotes,
                                 distanceAway:$scope.newDistanceAway
                                });


                              data= {name:$scope.newName,
                                      location:$scope.newLocation,
                                       phone:$scope.newPhone,
                                       hoursAccepting:$scope.newHoursAccepting,
                                       notes:$scope.newNotes,
                                       distanceAway:$scope.newDistanceAway
                                      };




//Post new sites to the database
                        $http.post('/site/addSites', data).then(function (newData){
                            console.log('add site route');
                            console.log(newData);
                             });

                        };




}]);