'use strict';

//The below code will read the data from bus-service-data.json file and will pass to the $scope variable
busAppModule.controller("busAppCtrl", function($scope, busFactory){

    busFactory.getBusServiceData().then(function(data){
        $scope.busServiceData=$scope.convertDeviation(data.data);//deviation conversion
    });
    $scope.CurrentDate = new Date();
    $scope.expandedOrg = null;
        $scope.expandedBusData = null;

        $scope.manageCollapseExpand = function(obj, busData) {
            obj.expanded = !obj.expanded;
            if (obj !== $scope.expandedOrg && obj !== $scope.expandedBusData && obj.expanded) {
                $scope.collapseExpanded(busData);
            }
            if (obj.expanded) {
                if (busData) {
                    $scope.expandedBusData = obj;
                } else {
                    $scope.expandedOrg = obj;
                }
            }
        }
        $scope.collapseExpanded = function(clickedOnBusData) {
            if (!clickedOnBusData && $scope.expandedOrg !== null) {
                $scope.expandedOrg.expanded = false;
            }
            if ($scope.expandedBusData !== null) {
                $scope.expandedBusData.expanded = false;
            }
        };

    //convert deviation to number to values
    $scope.convertDeviation = function(data) {
        var total = key;
        for (var j in data) {
            var key = data[j].busData;
            for (var i in key) {
                var deviation = key[i].deviationFromTimetable;
                switch (true){
                    case(deviation > 0): key[i].deviationFromTimetable = "early";
                        break;
                    case(deviation < 0): key[i].deviationFromTimetable = "late";
                        break;
                    case(deviation == 0): key[i].deviationFromTimetable = "onTime";
                        break;
                    default: key[i].deviationFromTimetable = "unknown";
                }
            }
        }
        return data;
    };//end function getTotalMarks
});//end controller

busAppModule.filter('capitalize', function() {
    return function (s) {
        return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
    }
});

busAppModule.filter('boldfilter', function() {
    return function (input) {
        return input.replace(RegExp('('+ '^[a-zA-Z0-9]{3}' + ')', 'g'), '<span class="super-class">$1</span>');
    }
});