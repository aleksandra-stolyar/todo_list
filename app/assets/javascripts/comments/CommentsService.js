app.factory('CommentsService', ['$http', function($http) {
  var comments = {
    comments: []
  };

  comments.deleteComment = function(task, comment) {
    return $http.delete('/comments/' + comment.id + '.json')
      .success(function() {
        task.comments = _.without(task.comments, comment);
      });
  };

  comments.updateComment = function(comment, data) {
    return $http.put('/comments/' + comment.id + '.json', {"body": data})
  };

  return comments;

}]);
