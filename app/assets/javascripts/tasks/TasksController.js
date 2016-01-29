app.controller('TasksController', ['$scope', 'TasksService', '$stateParams', function($scope, TasksService, $stateParams) {

  $scope.deleteTask = function() {
    // debugger
    TasksService.delete(this.project, this.task).then(function() {
      console.log("Task removed!");
    });
  };

  // $scope.task = {deadline: new Date()};

  $scope.updateTask = function(data) {
    TasksService.update(this.task, data).then(function() {
      console.log("Task updated!");
    });
  };

  $scope.setStatus = function() {
    TasksService.updateStatus(this.task).then(function() {
      console.log("Status changed!");
    });
  };

  $scope.addComment = function() {
    if($scope.commentBody === '') { return; }
    TasksService.createComment($scope.task, {body: $scope.commentBody})
      .success(function(comment) {
        $scope.task.comments.push(comment);
        console.log("Comment created!");
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