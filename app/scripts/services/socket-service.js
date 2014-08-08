/*global io, angular*/

/**
 * @ngdoc function
 * @name ngResearchApp.service:socketService
 * @description
 * # socketService
 * Service that wraps basic socket.io functionality. 
 */

angular.module('ngResearchApp').factory('socket', function ($rootScope) {
    'use strict';
    var connection = io.connect('http://localhost:1337'),
        socket =  {
            on: function (eventName, callback) {
                connection.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(connection, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                connection.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(connection, args);
                        }
                    });
                });
            }
        };
    return socket;
});