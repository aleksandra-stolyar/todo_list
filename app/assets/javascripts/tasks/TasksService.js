// app.factory('ProjectsService', ['$http', function($http) {

//   var o = {
//     tasks: []
//   };
//   o.getAll = function() {
//     return $http.get('/projects.json')
//     .success(function(data){
//       angular.copy(data, o.projects);
//     })
//   };

//   // o.delete = function(project) {
//   //   return $http.delete('/projects/' + project.id + '.json').success(function(data){
//   //     o.projects = _.without(o.projects, project);
//   //   });
//   // };

//   o.createTask = function(project, task) {
//     debugger;
//     return $http.post('/projects/' + project.id + '/tasks.json', task);
//   };

//   return o;
// }]);


// // .factory ('ProjectsService', ['$resource', function($resource) {
// //   return $resource('/projects/:id', {id: '@id'});
// // }])
