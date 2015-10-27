/**
 * Created by briandaves on 10/26/15.
 */

app.controller('AddController', ['$scope','$http', function($scope,$http) {




// Add new sites to the donationList

    $scope.addNewSite = function () {

        console.log('tried to post');

        $scope.donationList.push(
            {
                name: $scope.newName,
                location: $scope.newLocation,
                phone: $scope.newPhone,
                hoursAccepting: $scope.newHoursAccepting,
                notes: $scope.newNotes
                //distanceAway: $scope.newDistanceAway
            });


        data = {
            name: $scope.newName,
            location: $scope.newLocation,
            phone: $scope.newPhone,
            hoursAccepting: $scope.newHoursAccepting,
            notes: $scope.newNotes
            //distanceAway: $scope.newDistanceAway
        };


//Post new sites to the database
        $http.post('/site/addSites', data).then(function (newData) {
            console.log('add site route');
            console.log(newData);
        });

    };
//Delete Sites from Database
}]);