  app.controller('ProjectsController', ['$scope', '$stateParams', 'projects', function($scope, stateParams, projects) {

  $scope.test = 'Hello world!';
  // $scope.projects = projects.projects;
  // $scope.projects = [
  //   {name: 'post 1'},
  //   {name: 'post 2'},
  //   {name: 'post 3'},
  //   {name: 'post 4'},
  //   {name: 'post 5'}
  // ];
  $scope.project = projects.projects[$stateParams.id];
  // $scope.tasks = [
  //   {
  //     deadline: new Date(2015, 12, 31, 21, 00, 00, 00)
  //   },
  //   {
  //     deadline: new Date(2015, 12, 31, 21, 00, 00, 00)
  //   }
  // ];

  $scope.addProject = function() {
    if(!$scope.projectName || $scope.projectName === '') { return; }
    $scope.projects.push({
      name: $scope.projectName,
      tasks: [
        {name: 'buy smth', deadline: new Date(2015, 12, 31, 21, 00, 00, 00)},
        {name: 'give milk for cat', deadline: new Date(2015, 12, 31, 21, 00, 00, 00)}
      ]
    });
    $scope.projectName = '';
  };
  $scope.addTask = function() {
    if($scope.taskName === '') { return; }
    $scope.project.tasks.push({
      name: $scope.taskName,
      deadline: $scope.deadline,
    });
    $scope.taskName = '';
    $scope.deadline = new Date();
  };
  $scope.dateOptions = {
    changeYear: true,
    changeMonth: true,
    yearRange: '-0:+10'
  };
  $scope.open = function() {
    $timeout(function() {
      $scope.opened = true;
    });
  };
}]);
