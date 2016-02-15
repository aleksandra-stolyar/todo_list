app.factory('Messages', ['Flash', function(Flash) {

  return {
    success: function(response) {
      Flash.create('success', response.message, 3000, true)
    },

    error: function(response) {
      Flash.create('danger', response.message, 3000, true)
    },

    warning: function(response) {
      Flash.create('warning', response.message, 3000, true)
    }
  }
}]);
