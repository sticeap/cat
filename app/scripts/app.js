'use strict';


var appServices = angular.module('appServices', ['ngResource']);
var appDirectives = angular.module('appDirectives', []);
var appFilters = angular.module('appFilters', []);

var cateringApp = angular.module('cateringApp', ['ui', 'appFilters', 'appServices', 'appDirectives'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainCtrl'
            })
            .when('/sidebar', {
                templateUrl: 'views/sidebar.html',
                controller: 'MainCtrl'
            })
            .when('/viewmenu', {
                templateUrl: 'views/viewmenu.html',
                controller: 'MenusCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
