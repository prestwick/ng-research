/*global angular */

/**
 * @ngdoc function
 * @name ngResearchApp.controller:GaugeCtrl
 * @description
 * # GaugeDirective
 * Directive for the jqWidgets Gauge
 */
angular.module('ngResearchApp')
    .directive('lvgauge', ['editorModels', function (editorModels) {
        'use strict';
        
        //Initialize DOM objects and attach event handlers. 
        var link = function (scope, element, attrs) {
            //Set up jqWidget View at start
            element.jqxGauge(editorModels[attrs.id]);
            
            //Event handler to update jqWidget view (value) when the value property of the model has changed. 
            scope.$watch('runTimeModel.value', function () {
                element.val(scope.runTimeModel.value);
            }, true);
        },
            
            //Business logic for updating the model
            controller =  function ($scope, $element, $attrs, socket) {
                
                //setup runtime mode at start
                $scope.runTimeModel = editorModels[$attrs.id];
                
                //attach event handler to socket.io updates for this widget. 
                socket.on($attrs.id, function (o) {
                    $scope.runTimeModel = o;
                });
            };
        return {
            restrict: 'E',
            transclude: true,
            link: link,
            controller: controller,
            scope: true
        };
    }]);