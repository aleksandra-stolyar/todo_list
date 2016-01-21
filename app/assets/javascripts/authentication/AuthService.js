app.factory('AuthService', ['$http', '$q', function($http, $q) {
  return {
    getMyLastName: function() {
        var deferred = $q.defer();
        FB.api('/me', {
            fields: 'email'
        }, function(response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }
  }

}]);
