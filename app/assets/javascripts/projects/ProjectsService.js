app.factory('ProjectsService', ['$http', function($http) {

  var o = {
    projects: []
  };
  o.getAll = function() {
    return $http.get('/projects.json')
    .success(function(data){
      angular.copy(data, o.projects);
    })
  };

  o.create = function(project) {
    return $http.post('/projects.json', project).success(function(data) {
      o.projects.push(data);
    });
  };

  o.delete = function(project) {
    return $http.delete('/projects/' + project.id + '.json')
      .success(function(data){
        o.projects = _.without(o.projects, project);
      });
  };

  o.createTask = function(project, task) {
    return $http.post('/projects/' + project.id + '/tasks.json', task);
  };

  o.deleteTask = function(project, task) {
    return $http.delete('/tasks/' + task.id + '.json')
      .success(function() {
        project.tasks = _.without(project.tasks, task);
      });
  };

  o.updateTask = function(task) {
    // debugger
    return $http.put('/tasks/' + task.id + '.json', {"project_id": task.project_id, "name": task.name, "deadline": task.deadline, "rate": task.rate, "status": task.status})
      .success(function(data) {
        // debugger
        // project.tasks = 
      });
  };
  // , params: {project_id: data.project_id, name: data.name, deadline: data.deadline, rate: data.rate, status: data.status}

// {
//   "id":124,
//   "name":"new",
//   "deadline":null,
//   "rate":null,
//   "status":"in_progress",
//   "project_id":85,
//   "created_at":"2015-11-20T17:04:50.224Z",
//   "updated_at":"2015-11-20T17:04:50.224Z"
// }


// $scope.updateStudent = function(){
//   $http.put('/students/' + $scope.student.id + '.json', {"student": $scope.student})
//   .success(function(response, status, headers, config){
//     $scope.student = response.student;
//     $scope.enterNew = false;
//     $scope.editing = false;
//   })
//   .error(function(response, status, headers, config){
//     $scope.error_message = response.error_message;
//   });
// };


  return o;
}]);


// .factory ('ProjectsService', ['$resource', function($resource) {
//   return $resource('/projects/:id', {id: '@id'});
// }])
