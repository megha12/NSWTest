describe('busController', function () {

  // load the controller's module
  beforeEach(module('app'));

  var busController, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, busFactory) {

          // place here mocked dependencies
      $httpBackend = _$httpBackend_;

     $httpBackend.expectGET('http://localhost:9000/data/bus-services-data.json')
      .respond(
          [
              {
                  organisation: "Sydney Buses",
                  date: "25/09/2015",
                  busData: [
                      {
                          busId: "42612",
                          routeVariant: "891 2 1",
                          deviationFromTimetable: 77
                      },
                      {
                          busId: "29016",
                          routeVariant: "400 1 1",
                          deviationFromTimetable: 340
                      },
                      {
                          busId: "90467",
                          routeVariant: "393 1 1",
                          deviationFromTimetable: 220
                      },
                      {
                          busId: "88836",
                          routeVariant: "M20 1 0",
                          deviationFromTimetable: -287
                      },
                      {
                          busId: "79367",
                          routeVariant: "L21 2 1",
                          deviationFromTimetable: 347
                      }
                  ]
              },
              {
                  organisation: "Westbus",
                  date: "25/09/2015",
                  busData: [
                      {
                          busId: "94811",
                          routeVariant: "664 2 1",
                          deviationFromTimetable: 164
                      },
                      {
                          busId: "62788",
                          routeVariant: "UNKNOWN",
                          deviationFromTimetable: null
                      },
                      {
                          busId: "14221",
                          routeVariant: "834 1 1",
                          deviationFromTimetable: 423
                      }
                  ]
              }
          ]
      );

    scope = $rootScope.$new();
    busController = $controller('busAppCtrl', {
      $scope: scope, busFactory:busFactory
    });
          
  }));

    beforeEach(function(){
        inject(function($injector){
            capitalizeFilter = $injector.get('$filter')('capitalize');
        });

        inject(function($injector){
            boldfilter = $injector.get('$filter')('boldfilter');
        });
    });

    it('should check if method is defined', inject(function(busFactory) {
        expect(busFactory.getBusServiceData).toBeDefined();
    }));


    it('should check if a value is returned', inject(function(busFactory) {

        expect(busFactory.getBusServiceData).toBeTruthy();

    }));

    it('should capitalize the first character of the input passed', function(){
        expect(capitalizeFilter("hello")).toBe("Hello");
    });

    it('should capitalize the first character of the input passed', function(){
        expect(boldfilter("hello")).toBe('<span class="super-class">hel</span>lo');
    });
 });
 


