/**
 * Created by briandaves on 10/25/15.
 */
var app = angular.module('site', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl:'views/home.html',
            controller: 'HomeController'
        })
        .when('/add',{
            templateUrl:'views/add.html',
            controller: 'AddController'
        })
        .when('/results',{
            templateUrl:'views/results.html',
            controller: 'ResultsController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'

        })
        .otherwise({
            redirect: '/'
        });

    $locationProvider.html5Mode(true);
});
