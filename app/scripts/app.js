/*global angular */



/**
 * @ngdoc overview
 * @name ngResearchApp
 * @description
 * # ngResearchApp
 *
 * Main module of the application.
 */
angular.module('ngResearchApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
