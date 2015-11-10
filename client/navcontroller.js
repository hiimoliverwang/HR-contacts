angular.module('navCntrl', [
])
.controller('navcontroller', function ($scope,$location) {
  $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
})
