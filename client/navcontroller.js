angular.module('navCntrl', [
])
.controller('navcontroller', function ($scope,$location, $window) {
  $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

  $scope.signout = function () {
      $window.localStorage.removeItem('com.contacts');
      $location.path('/home');
    };
})
