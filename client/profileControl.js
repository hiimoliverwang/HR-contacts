angular.module('Contacts.profile',[])
.controller('profileControl', function ($scope, currentUser) {
  // $scope.user = currentUser.getUser();
  $scope.user = {
                _id: "56418764fbe9733871bc9f58", 
                picUrl: "https://avatars.githubusercontent.com/u/13489741?v=3.jpg", 
                first: "Andrew", 
                last: "Vickory", 
                number: "3758623085",
                email:'awef@ajdf.com',
                githubUrl:'www.github.com'
                };
  console.log($scope.user)

})
