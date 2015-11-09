angular.module('contacts', [
])
.controller('bookController', function ($scope) {
  var contacts = {
    oliver:'42342342',
  };
  $scope.retrieveName = function (){
    $scope.displayName = $scope.name;
    $scope.info = contacts[$scope.name]
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
