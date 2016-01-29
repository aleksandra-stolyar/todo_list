app.controller('CommentsController', ['$scope', 'CommentsService', '$stateParams', 'Upload', '$timeout', function ($scope, CommentsService, $stateParams, Upload, $timeout) {
  $scope.deleteComment = function() {
    CommentsService.deleteComment(this.task, this.comment).then(function() {
      console.log("Comment deleted!")
    });
  };

  $scope.updateComment = function(data) {
    CommentsService.updateComment(this.comment, data).then(function() {
      console.log("Comment updated!");
    });
  };

  $scope.addAttachment = function(files) {
    if (files && files.length) {
      var comment = this.comment

      angular.forEach(files, function (file) {
        Upload.upload({
          url: '/comments/' + comment.id + '/attachments.json',
          data: {
            attachment: file,
            filename: file.name
          }
        })
        .then(function (response){
          //debugger
          $scope.comment.attachments.push(response.config.data);
        });
      });
    }
  };

  $scope.parser = document.createElement('a');

}])
