app.controller('AuthModalController', ['$scope', '$uibModalInstance', 'Auth', '$state', 'AuthService', function ($scope, $uibModalInstance, Auth, $state, AuthService) {
  $scope.currentState = $state.current.name;
  $scope.user = {};
  $scope.go = function(route){
    $state.go(route);
  };

  $scope.active = function(route){
    return $state.is(route);
  };

  $scope.tabs = [
    { heading: "SIGN IN", route:"signin", active:true },
    { heading: "SIGN UP", route:"signup", active:false }
  ];

  $scope.$on("$stateChangeSuccess", function() {
    $scope.tabs.forEach(function(tab) {
      tab.active = $scope.active(tab.route);
    });
  });

  $scope.signin = function() {
    Auth.login($scope.user).then(function(user) {
      $uibModalInstance.close('ok');
    })
  };

  $scope.signup = function() {
    Auth.register($scope.user).then(function(user) {
      $uibModalInstance.dismiss();
    })
  };

  $scope.getMyLastName = function() {
   AuthService.getMyLastName() 
     .then(function(response) {
       $scope.user.email = response.email;
     }
   );
  };
}]);