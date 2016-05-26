var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller('APIController', ['$scope', '$http', function($scope, $http) {
  var key = '5433d627c0c62b99a9af9fbbe4227a02';
  var baseURL = 'http://api.petfinder.com/';
  $scope.breed = '';
  $scope.zip = '';

  $scope.getRandomPet = function(species) {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    if (species!='') {
    query += '&animal=' + species;
  }
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.animal = response.data.petfinder.pet;
        $scope.breed = $scope.animal.animal.$t;
        $scope.getBreeds();
      }
    )
  }

  $scope.getBreeds = function() {
    var query = 'breed.list';
    query += '?key=' + key;
    query += '&animal=' + $scope.breed.toLowerCase();
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log('breeds: ', response.data);
        $scope.breeds = response.data.petfinder.breeds.breed;
      }
    )
  }


  }]);

  myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/views/home.html',
        controller: "HomeController"
      })
      .when('/cats', {
        templateUrl: '/views/cats.html',
        controller: "CatsController"
      })
      .when('/dogs', {
        templateUrl: '/views/dogs.html',
        controller: "DogsController"
      })
      .when('/rabbits', {
        templateUrl: '/views/rabbits.html',
        controller: "RabbitsController"
      })
      .when('/shelters', {
        templateUrl: '/views/shelters.html',
        controller: "SheltersController"
      })
      .otherwise({
        redirectTo: 'home'
      })
}]);
