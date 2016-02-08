app.factory('TasksService', ['$http', function($http) {
  var tasks = {
    tasks: []
  };

  tasks.delete = function (project, task) {
    return $http.delete('/tasks/' + task.id + '.json')
      .success(function() {
        project.tasks = _.without(project.tasks, task);
      });
  };

  tasks.update = function (task, data) {
    return $http.put('/tasks/' + task.id + '.json', {"project_id": task.project_id, "name": data, "deadline": task.deadline, "rate": task.rate})
  };

  tasks.updateStatus = function (task) {
    return $http.put('/tasks/' + task.id + '/set_status.json')
      .success(function(data) {
        task.status = data.task.status;
      });
  };

  tasks.createComment = function (task, comment) {
    return $http.post('/tasks/' + task.id + '/comments.json', comment);
  };

  return tasks;
}]);
