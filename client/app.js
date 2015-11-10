angular.module('contacts', ['ngRoute','navCntrl',
])
.controller('bookController', function ($scope, $http) {
  $scope.retrieveName = function (){
    $http({
      method:'POST',
      url:'/numbers',
      headers: {
         'Content-Type': 'application/json'
      },
      data:{first:$scope.name}
    })
    .then(function(resp){
      console.log('server response',resp)
      $scope.lines = resp.data
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
        first:$scope.newFirstinput,
        last:$scope.newLastinput,
        number:$scope.newNumber,
        github:$scope.newGH
      }
    }).then(function(res) {
      $scope.added = true;
    })
  };

})

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/addNew', {
      templateUrl: './newuser.html',
      controller: 'bookController'
    })
    .when('/home', {
      templateUrl: './search.html',
      controller: 'bookController'
    })    
    .when('/search', {
      templateUrl: './search.html',
      controller: 'bookController'
    })
    .otherwise({
      redirectTo: '/search'
    })

    // Your code here

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
});






// .config(function ($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/signin', {
//       templateUrl: 'app/auth/signin.html',
//       controller: 'bookController'
//     })
//     $httpProvider.interceptors.push('AttachTokens');
// })
