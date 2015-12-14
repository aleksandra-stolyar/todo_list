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

  // comments.createAttachment = function(comment, attachment) {
    
    // return $http.post('/comments/' + comment.id + '/comments.json', attachment);
  // };

  return comments;

}]);
