app.controller('ProjectsCtrl', ['$scope', 'ProjectsService', '$stateParams', '$timeout', function($scope, ProjectsService, $stateParams, $timeout) {
  // $scope.hello = 'world';
  $scope.projects = ProjectsService.projects;
  $scope.project = ProjectsService.projects[$stateParams.id];

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

  $scope.deleteTask = function() {
    ProjectsService.deleteTask(this.project, this.task).then(function() {
      console.log("Task removed!");
    });
  };

  $scope.task = {deadline: new Date()};

  $scope.addDeadline = function() {
    // debugger
    ProjectsService.updateTask(this.task).then(function() {
      console.log("Task updated!");
    });
  };

  $scope.setStatus = function() {
    // debugger
    ProjectsService.updateTask(this.task).then(function() {
      console.log("Task updated!");
    });
  };

  $scope.addComment = function() {
    // if($scope.taskName === '') { return; }

    // ProjectsService.createTask($scope.$parent.project, {name: $scope.taskName})
    //   .success(function(task) {
    //     $scope.$parent.project.tasks.push(task);
    //     console.log("Task created!");
    //   });
    // $scope.taskName = '';
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



  // $scope.showIcon = function() {
  //   debugger
  //   if(this.task.deadline != null){
  //     $(".deadline-marker").show();
  //   }
  // }


}])