app.controller('NavbarController', ['$scope', 'Auth', function($scope, Auth, $rootScope){
  $scope.user = Auth._currentUser;
  $scope.signedIn = Auth.isAuthenticated;

  $scope.$on('rootScope:broadcast', function (event, data) {
    $scope.user = data;
    console.log(data + ' in navBar scope'); //currentUser
  });

  $scope.logout = Auth.logout;
}]);