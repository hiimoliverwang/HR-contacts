angular.module('contacts', [
])
.controller('bookController', function ($scope, $http) {
  var contacts = {
    oliver:'42342342',
  };
  $scope.retrieveName = function (){
    $http({
      method:'POST',
      url:'/numbers',
      headers: {
         'Content-Type': 'application/json'
      },
      data:{name:$scope.name}
    })
    .then(function(resp){
      console.log(resp)
      $scope.displayName = resp.data.name;
      $scope.info = resp.data.number;
    });
  }

  $scope.newName = function() {
    $scope.added = false;
    $http({
      method:'POST',
      url:'/newNumber',
      headers: {
         'Content-Type': 'application/json'
      },
      data:{
        name:$scope.newNameinput,
        number:$scope.newNumber
      }
    }).then(function(res) {
      $scope.added = true;
    })
  };

});






// .config(function ($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/signin', {
//       templateUrl: 'app/auth/signin.html',
//       controller: 'bookController'
//     })
//     $httpProvider.interceptors.push('AttachTokens');
// })
