app.controller('TasksCtrl', ['$scope', 'TasksService', function($scope, TasksService) {

  // $scope.addTask = function(project) {
  //   if($scope.taskName === '') { return; }
  //   debugger;

  //   ProjectsService.createTask(project, {name: $scope.taskName})
  //     .success(function(task) {
  //       $scope.project.tasks.push(task);
  //     });
  //   $scope.taskName = '';
  // };

  // $scope.dateOptions = {
  //   changeYear: true,
  //   changeMonth: true,
  //   yearRange: '-0:+10'
  // };

  // $scope.open = function() {
  //   $timeout(function() {
  //     $scope.opened = true;
  //   });
  // };


}])