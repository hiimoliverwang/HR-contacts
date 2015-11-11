angular.module('contacts', [
               'ngRoute',
               'navCntrl',
               'contacts.services',
               'Contacts.profile',
               'Contacts.auth'
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
.controller('newUserControl', function ($scope, $http, $window, $location) {

  $scope.newName = function() {
    $scope.added = false;
    $http({
      method:'POST',
      url:'/newNumber',
      headers: {
         'Content-Type': 'application/json'
      },
      data:{
        github:$scope.newGH,
        number:$scope.newNumber,
        password:$scope.newPW
      }
    }).then(function(resp) {
      $window.localStorage.setItem('com.contacts', resp.data.token);
        $location.path('/search');
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
      templateUrl: './landing-page/index.html',
    })    
    .when('/search', {
      templateUrl: './search.html',
      controller: 'contactsControl',
      authenticate: true
    })    
    .when('/profile', {
      templateUrl: './profiles.html',
      controller: 'profileControl',
      authenticate: true
    })    
    .when('/login', {
      templateUrl: './login.html',
      controller: 'loginControl'
    })
    .otherwise({
      redirectTo: '/home'
    })

    // Your code here
    $httpProvider.interceptors.push('AttachTokens');

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.contacts');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, $window) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    var isAuth = function () {
      console.log($window.localStorage.getItem('com.contacts'))
      return !!$window.localStorage.getItem('com.contacts');
    };
    if (next.$$route && next.$$route.authenticate && !isAuth()) {
      $location.path('/login');
    }
  });
});
