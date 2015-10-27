var app = angular.module('ToDoApp', [
  'ui.router',
  'templates',
  'xeditable',
  'ui.date'
]);

app.config(['$stateProvider',
'$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('project', {
      url: '/projects',
      controller: 'ProjectsController',
      templateUrl: 'projects/_projects.html'
    });
  $urlRouterProvider.otherwise('/projects');
    // .state('', {
    //   url: '/about',
    //   controller: 'AboutController',
    //   templateUrl: 'views/about.html'
    // });
}]);

app.run(function(editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});