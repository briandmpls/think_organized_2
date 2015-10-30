/**
 * Created by briandaves on 10/26/15.
 */
app.controller('HomeController', ['$scope','$http', function($scope,$http) {


    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }
}]);
