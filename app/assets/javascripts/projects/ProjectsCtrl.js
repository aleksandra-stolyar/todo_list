app.controller('ProjectsCtrl', ['$scope', 'ProjectsService', '$stateParams', 'TasksService', function($scope, ProjectsService, $stateParams, TasksService) {
  $scope.projects = ProjectsService.projects;

  $scope.createProject = function() {
    if(!$scope.projectName || $scope.projectName === '') { return; }

    ProjectsService.create({name: $scope.projectName});
    $scope.projectName = '';
    console.log("Project created!");
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
      .success(function(task) {
        $scope.$parent.project.tasks.push(task);
        console.log("Task created!");
      });
    $scope.taskName = '';
  };

}])