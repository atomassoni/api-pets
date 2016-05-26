myApp.controller('SheltersController', ['$scope', '$http', function ($scope,  $http) {
    $scope.zip = '';
  $scope.getShelters = function() {
    var key = '5433d627c0c62b99a9af9fbbe4227a02';
    var baseURL = 'http://api.petfinder.com/';


    var query = 'shelter.find';
    query += '?key=' + key;
    query += '&location=' + $scope.zip;
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log('shelters: ', response.data);
        $scope.shelters = response.data.petfinder.shelters.shelter;
      }
    )
  }

  $scope.getPetsFromShelter = function(id) {
    var key = '5433d627c0c62b99a9af9fbbe4227a02';
    var baseURL = 'http://api.petfinder.com/';


    var query = 'shelter.getPets';
    query += '?key=' + key;
    query += '&id=' + id;
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log('pets: ', response.data);
        $scope.pets = response.data.petfinder.pets.pet;
      }
    )
  }
}]);
