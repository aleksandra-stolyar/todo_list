app.controller('TasksController', ['$scope', 'TasksService', '$stateParams', 'Messages', function($scope, TasksService, $stateParams, Messages) {

  $scope.deleteTask = function(task) {
    TasksService.delete(task)
      .then(function successCallback(response) {
        $scope.project.tasks = _.without($scope.project.tasks, task);
        Messages.warning(response.data)
      });
  };

  $scope.updateTask = function(task, data) {
    TasksService.update(task, data)
      .then(function successCallback(response) {
        Messages.warning(response.data)
      }, function errorCallback(response) {
        Messages.error(response.data)
      });
  };

  $scope.setStatus = function(task) {
    TasksService.updateStatus(task)
      .success(function(response) {
        Messages.success(response.data)
    });
  };

  $scope.addComment = function() {
    if($scope.commentBody === '') { return; }
    TasksService.createComment($scope.task, {body: $scope.commentBody})
      .then(function successCallback(response) {
        $scope.task.comments.push(response.data.comment);
        Messages.success(response.data)
      }, function errorCallback(response) {
        Messages.error(response.data)
      });
    $scope.commentBody = '';
  };

  $scope.opened = {};
  $scope.dateOptions = {
    showWeeks: false,
    startingDay: 1
  };
  $scope.openCalendar = function($event, taskIdx) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened['index'+taskIdx] = true;
  };

}])