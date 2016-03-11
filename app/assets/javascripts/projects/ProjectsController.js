app.controller('ProjectsController', ['$scope', 'ProjectsService', '$stateParams', '$http', 'Auth', 'Messages', function($scope, ProjectsService, $stateParams, $http, Auth, Messages) {
  $scope.projects = ProjectsService.projects;

  $scope.createProject = function() {
    if(!$scope.projectName || $scope.projectName === '') { return; }
    ProjectsService.create({name: $scope.projectName})
      .then(function successCallback(response) {
        $scope.projects.push(response.data.project);
        Messages.success(response.data)
      }, function errorCallback(response) {
        Messages.error(response.data)
      });
    $scope.projectName = '';
  };

  $scope.updateProject = function(project, data) {
    ProjectsService.update(project, data)
      .then(function successCallback(response) {
        Messages.warning(response.data)
      }, function errorCallback(response) {
        Messages.error(response.data)
      });
  };

  $scope.deleteProject = function(project) {
    ProjectsService.delete(project)
      .then(function successCallback(response) {
        $scope.projects = _.without($scope.projects, project);
        Messages.warning(response.data)
      });
  };

  $scope.addTask = function() {
    if($scope.taskName === '') { return; }
    ProjectsService.createTask($scope.$parent.project, {name: $scope.taskName})
      .then(function successCallback(response) {
        $scope.project.tasks.push(response.data.task);
        Messages.success(response.data)
      }, function errorCallback(response) {
        Messages.error(response.data)
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