var app = angular.module('ToDoApp', [
  'ui.router',
  'templates',
  'xeditable',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'ngFileUpload',
  'ui.sortable',
  'Devise'
]);
//Routing
app.config( function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('projects', {
      url: '/',
      templateUrl: 'projects/_main.html',
      controller: 'ProjectsController',
      data : {
        requireLogin : true
      },
      resolve: {
        projectsPromise: ['ProjectsService', function(ProjectsService){
          return ProjectsService.getAll();
        }],
      }
    });
  $locationProvider.html5Mode(true);
});

// Intercept 401 Unauthorized everywhere
app.config(function(AuthInterceptProvider) {
  AuthInterceptProvider.interceptAuth(true);
});
