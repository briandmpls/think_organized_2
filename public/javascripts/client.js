/**
 * Created by briandaves on 10/25/15.
 */
var app = angular.module('siteApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl:'views/home.html',
            controller: 'HomeController'
        })
        .when('/about',{
            templateUrl:'views/about.html',
            controller: 'AboutController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'

        });

    $locationProvider.html5Mode(true);
});
