/*global angular */


/**
 * @ngdoc function
 * @name ngResearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngResearchApp
 */
angular.module('ngResearchApp')
    .controller('MainCtrl', function ($scope) {
        'use strict';
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma',
            'Main'
        ];
    });
