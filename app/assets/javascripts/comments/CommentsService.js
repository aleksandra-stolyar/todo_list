app.service('CommentsService', ['$http', function($http) {
  var comments = {
    comments: []
  };

  comments.deleteComment = function(comment) {
    return $http.delete('/comments/' + comment.id)
  };

  comments.updateComment = function(comment, data) {
    return $http.put('/comments/' + comment.id, {"body": data})
  };

  return comments;

}]);
