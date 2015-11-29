var app = angular.module('ToDoApp', [
  'ui.router',
  'templates',
  'xeditable',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker'
  // 'ngResource'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('projects', {
      url: '/projects',
      templateUrl: 'projects/_main.html',
      controller: 'ProjectsCtrl',
      resolve: {
        projectsPromise: ['ProjectsService', function(ProjectsService){
          return ProjectsService.getAll();
        }]
      }
      // ,
      // resolve: {
      //   project: ['$stateParams', 'ProjectsService', function($stateParams, ProjectsService) {
      //     return ProjectsService.getAll($stateParams.id);
      //   }]
      // }
    });
}]);

app.directive('project', function() {
  return {
    templateUrl: 'projects/_project.html'
  };
});

app.directive('task', function() {
  return {
    templateUrl: 'tasks/_task.html'
  };
});



