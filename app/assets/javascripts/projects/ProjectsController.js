app.controller('ProjectsController', ['$scope', 'ProjectsService', '$stateParams', 'TasksService', '$http', 'Auth', function($scope, ProjectsService, $stateParams, TasksService, $http, Auth) {
  $scope.projects = ProjectsService.projects;

  $scope.createProject = function() {
    if(!$scope.projectName || $scope.projectName === '') { return; }
    ProjectsService.create({name: $scope.projectName});
    $scope.projectName = '';
    console.log("Project created!");
  };

  $scope.updateProject = function(data) {
    ProjectsService.update(this.project, data).then(function(){
      console.log("Project updated!");
    });
  };

  $scope.deleteProject =function() {
    ProjectsService.delete(this.project).then(function() {
      $scope.projects = ProjectsService.projects;
      console.log("Project removed!");
    });
  };

  $scope.addTask = function() {
    if($scope.taskName === '') { return; }
    ProjectsService.createTask($scope.$parent.project, {name: $scope.taskName})
      .success(function(data) {
        $scope.$parent.project.tasks.push(data.task);
        console.log("Task created!");
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