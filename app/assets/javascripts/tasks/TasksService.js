app.factory('TasksService', ['$http', function($http) {
  var tasks = {
    tasks: []
  };

  tasks.deleteTask = function(project, task) {
    return $http.delete('/tasks/' + task.id + '.json')
      .success(function() {
        project.tasks = _.without(project.tasks, task);
      });
  };

  tasks.updateTask = function(task) {
    return $http.put('/tasks/' + task.id + '.json', {"project_id": task.project_id, "name": task.name, "deadline": task.deadline, "rate": task.rate, "status": task.status})
  };

  tasks.createComment = function(task, comment) {
    return $http.post('/tasks/' + task.id + '/comments.json', comment);
  };

  return tasks;
}]);
