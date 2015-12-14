app.factory('ProjectsService', ['$http', function($http) {

  var projects = {
    projects: []
  };
  projects.getAll = function() {
    return $http.get('/projects.json')
    .success(function(data){
      angular.copy(data, projects.projects);
    })
  };

  projects.create = function(project) {
    return $http.post('/projects.json', project).success(function(data) {
      projects.projects.push(data);
    });
  };

  projects.delete = function(project) {
    return $http.delete('/projects/' + project.id + '.json')
      .success(function(data){
        projects.projects = _.without(projects.projects, project);
      });
  };

  projects.createTask = function(project, task) {
    return $http.post('/projects/' + project.id + '/tasks.json', task);
  };

  return projects;
}]);
