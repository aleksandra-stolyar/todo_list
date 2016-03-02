app.service('CommentsService', ['$http', function($http) {
  var comments = {
    comments: []
  };

  comments.deleteComment = function(task, comment) {
    return $http.delete('/comments/' + comment.id)
      .success(function() {
        task.comments = _.without(task.comments, comment);
      });
  };

  comments.updateComment = function(comment, data) {
    return $http.put('/comments/' + comment.id, {"body": data})
  };

  return comments;

}]);
