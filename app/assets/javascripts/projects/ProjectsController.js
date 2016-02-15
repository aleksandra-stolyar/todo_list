app.controller('ProjectsController', ['$scope', 'ProjectsService', '$stateParams', 'TasksService', '$http', 'Auth', 'Messages', function($scope, ProjectsService, $stateParams, TasksService, $http, Auth, Messages) {
  $scope.projects = ProjectsService.projects;

  $scope.createProject = function() {
    if(!$scope.projectName || $scope.projectName === '') { return; }
    ProjectsService.create({name: $scope.projectName})
      .success(function(response) {
        Messages.success(response)
      })
      .error(function(response) {
        Messages.error(response)
      });
    $scope.projectName = '';
  };

  $scope.updateProject = function(data) {
    ProjectsService.update(this.project, data)
      .success(function(){
        Messages.warning(response)
      })
      .error(function(response) {
        Messages.error(response)
      });
  };

  $scope.deleteProject =function() {
    ProjectsService.delete(this.project)
      .success(function(response) {
        $scope.projects = ProjectsService.projects;
        Messages.warning(response)
      });
  };

  $scope.addTask = function() {
    if($scope.taskName === '') { return; }
    ProjectsService.createTask($scope.$parent.project, {name: $scope.taskName})
      .success(function(response) {
        $scope.project.tasks.push(response.task);
        Messages.success(response)
      })
      .error(function(response) {
        Messages.error(response)
      });
    $scope.taskName = '';
  };

  $scope.sortableOptions = {
    connectWith: ".tasks-list",
    cursor:"move",
    stop:function(e,ui){
      var taskIds = [];
      var item = ui.item.sortable;
      var parentEl = item.droptarget;
      var targetProjectId = item.droptarget.parent().data("project-id")

      $scope.$apply(function(){
        taskIds = parentEl.sortable("toArray");
        console.log(taskIds);
        $http.post("/projects/save_sort", {"taskIds": taskIds, "project_id": targetProjectId});
        console.log("Tasks rated.")
      })
    }
  };
}])