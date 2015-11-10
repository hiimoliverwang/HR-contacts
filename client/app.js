angular.module('contacts', [
               'ngRoute',
               'navCntrl',
               'contacts.services',
               'Contacts.profile'
])
.controller('contactsControl', function ($scope, $http,currentUser,$location) {
  $scope.retrieveName = function (){
    $http({
      method:'GET',
      url:'/numbers',
      headers: {
         'Content-Type': 'application/json'
      },
    })
    .then(function(resp){
      console.log('server response',resp)
      $scope.lines = resp.data
    });
  }
  $scope.setUser = function (user) {
    currentUser.setUser(user);
    $location.path('/profile');
  }


  $scope.retrieveName();
})
.controller('newUserControl', function ($scope, $http) {

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
      controller: 'newUserControl'
    })
    .when('/home', {
      templateUrl: './search.html',
      controller: 'contactsControl'
    })    
    .when('/search', {
      templateUrl: './search.html',
      controller: 'contactsControl'
    })    
    .when('/profile', {
      templateUrl: './profiles.html',
      controller: 'profileControl'
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
