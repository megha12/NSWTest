'use strict';
busAppModule.factory('busFactory', function ($http) {

    var data = $http.get('data/bus-services-data.json')
        .then(function (result) {
            return result;
        });
    var factory = {};
    factory.getBusServiceData = function() {
        return data;
    };
    return factory;
});