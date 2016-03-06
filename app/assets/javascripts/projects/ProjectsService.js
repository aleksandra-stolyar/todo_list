app.service('ProjectsService', ['$http', function($http) {

  var projects = {
    projects: []
  };
  projects.getAll = function() {
    return $http.get('/projects')
    .success(function(data){
      angular.copy(data.projects, projects.projects);
    })
  };

  projects.create = function(project) {
    return $http.post('/projects', project)
  };

  projects.update = function(project, data) {
    return $http.put('/projects/' + project.id, {"name": data})
  };

  projects.delete = function(project) {
    return $http.delete('/projects/' + project.id)
  };

  projects.createTask = function(project, task) {
    return $http.post('/projects/' + project.id + '/tasks', task);
  };

  return projects;
}]);
