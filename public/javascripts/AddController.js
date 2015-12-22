/**
 * Created by briandaves on 10/26/15.
 */

app.controller('AddController', ['$scope','$http', function($scope,$http) {

    $scope.donationList = [];
    var lat = 0;
    var long = 0;
    var data = {};
// Add new sites to the donationList

    $scope.addNewSite = function () {

        console.log('tried to post');




        // Geocodes address into lat and long coordinates with google call

        geocoder = new google.maps.Geocoder();



        var address = $scope.newLocation;
        console.log('address ',address);

        geocoder.geocode( {'address':address},function(results,status) {
            if (status == google.maps.GeocoderStatus.OK){
                console.log('Geocode location',results[0]);
                 lat = results[0].geometry.viewport.N.N;
                 long = results[0].geometry.viewport.j.N;

                console.log('lat is ',lat);
                console.log('long is ', long);
            }else{
                alert('Geocode was not successful:', + status);
            }


            setTimeout(function () {
                assignData();
            }, 100);

        });


       function assignData(){

           console.log('lat2 is ',lat);
           console.log('long2 is ', long);
           // use if posting back to the DOM
           $scope.donationList.push(
               {
                   name: $scope.newName,
                   location: $scope.newLocation,
                   phone: $scope.newPhone,
                   hoursAccepting: $scope.newHoursAccepting,
                   notes: $scope.newNotes,
                   coordinates: [lat,long]
               });

           console.log('Scope donation list ',$scope.donationList);



           data = {
                    name: $scope.newName,
                    location: $scope.newLocation,
                    phone: $scope.newPhone,
                    hoursAccepting: $scope.newHoursAccepting,
                    notes: $scope.newNotes,
                    coordinates: [lat,long]
                };
           console.log('Data before ', data);

           ////Post new sites to the database

           $http.post('/site/addSites', data).then(function (newData) {
               console.log('add site route');
               console.log('Data ',data);
               console.log('NewData ',newData);



               $scope.newName= '';
               $scope.newLocation = '';
               $scope.newPhone = '';
               $scope.newHoursAccepting = '';
               $scope.newNotes = '';

           });


       };



    };

//Delete Sites from Database
}]);