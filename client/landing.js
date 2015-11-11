angular.module('contacts.landing',[])
.controller("landingControl", function ($location) {
  $scope.login = function () {
    $location.path('/login')
  }  
  $scope.signup = function () {
    $location.path('/addNew')
  }
})
