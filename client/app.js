angular.module('contacts', [
])
.controller('bookController', function ($scope, $http) {
  var contacts = {
    oliver:'42342342',
  };
  $scope.retrieveName = function (){
    $http({
      method:'GET',
      url:'/',
      data:{name:$scope.name}
    })
    .then(function(resp){
      $scope.displayName = resp.name,
      $scope.info = resp.number,

    })
    // $scope.displayName = $scope.name;
    // $scope.info = contacts[$scope.name]



  }


});






// .config(function ($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/signin', {
//       templateUrl: 'app/auth/signin.html',
//       controller: 'bookController'
//     })
//     $httpProvider.interceptors.push('AttachTokens');
// })
