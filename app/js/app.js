'use strict'

var appBloom = angular.module('appBloom', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/bouquets', {
                templateUrl : 'partials/bouquets.html',
                controller: 'BouquetsController'
            }).
            otherwise({
                redirectTo: '/bouquets'
            });
    }]);