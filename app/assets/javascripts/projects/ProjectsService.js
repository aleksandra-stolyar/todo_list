app.factory('projects', ['$http', function($http) {
  var o = {
    projects: [
      'post 1',
      'post 2',
      'post 3',
      'post 4',
      'post 5'
    ]
  };
  o.getAll = function() {
    return $http.get('/projects.json').success(function(data) {
      // return data;
      angular.copy(data, o.projects);
    });
  };

}]);