app.service('CommentsService', ['$http', function($http) {
  var comments = {
    comments: []
  };

  comments.delete = function(comment) {
    return $http.delete('/comments/' + comment.id)
  };

  comments.update = function(comment, data) {
    return $http.put('/comments/' + comment.id, {"body": data})
  };

  return comments;

}]);
