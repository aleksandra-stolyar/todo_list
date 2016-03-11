app.service('TasksService', ['$http', function($http) {
  var tasks = {
    tasks: []
  };

  tasks.delete = function (task) {
    return $http.delete('/tasks/' + task.id)
  };

  tasks.update = function (task, data) {
    return $http.put('/tasks/' + task.id, {"project_id": task.project_id, "name": data, "deadline": task.deadline, "rate": task.rate})
  };

  tasks.updateStatus = function (task) {
    return $http.put('/tasks/' + task.id + '/set_status')
  };

  tasks.createComment = function (task, comment) {
    return $http.post('/tasks/' + task.id + '/comments', comment);
  };

  return tasks;
}]);
