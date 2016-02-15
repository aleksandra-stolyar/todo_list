app.controller('TasksController', ['$scope', 'TasksService', '$stateParams', 'Messages', function($scope, TasksService, $stateParams, Messages) {

  $scope.deleteTask = function() {
    TasksService.delete(this.project, this.task)
      .success(function(response) {
        Messages.warning(response)
      });
  };

  $scope.updateTask = function(data) {
    TasksService.update(this.task, data)
      .success(function(response) {
        Messages.warning(response)
      })
      .error(function(response) {
        Messages.error(response)
      });
  };

  $scope.setStatus = function() {
    TasksService.updateStatus(this.task)
      .success(function(response) {
        Messages.success(response)
    });
  };

  $scope.addComment = function() {
    if($scope.commentBody === '') { return; }
    TasksService.createComment($scope.task, {body: $scope.commentBody})
      .success(function(response) {
        $scope.task.comments.push(response.comment);
        Messages.success(response)
      })
      .error(function(response) {
        Messages.error(response)
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