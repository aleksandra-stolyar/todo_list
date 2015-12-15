var app = angular.module('ToDoApp', [
  'ui.router',
  'templates',
  'xeditable',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'ngFileUpload',
  'ui.sortable'
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

app.directive('comment', function() {
  return {
    templateUrl: 'comments/_comment.html'
  };
});

