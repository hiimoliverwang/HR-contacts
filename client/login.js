// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('Contacts.auth', [])
.controller('loginControl', function ($scope, $window, $location, $http) {
  $scope.user = {};

  $scope.login = function () {
    $http({
      method:'POST',
      url:'/login',
      headers: {
         'Content-Type': 'application/json'
      },
      data:$scope.user
    })
    .then(function(resp) {
      $window.localStorage.setItem('com.contacts', resp.data.token);
        $location.path('/links');
    })
  };
});
