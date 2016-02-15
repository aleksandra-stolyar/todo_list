app.controller('Messages', ['Flash', '$scope', function(Flash, $scope, $rootScope) {

  $rootScope.success = function(response) {
    Flash.create('success', response.message, 0, true)
  },

  $rootScope.error = function(response) {
    Flash.create('danger', response.message, 0, true)
  },

  $rootScope.warning = function(response) {
    Flash.create('warning', response.message, 0, true)
  }

}]);
