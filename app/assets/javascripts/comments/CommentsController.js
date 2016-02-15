app.controller('CommentsController', ['$scope', 'CommentsService', '$stateParams', 'Upload', '$timeout', 'Messages', function ($scope, CommentsService, $stateParams, Upload, $timeout, Messages) {
  $scope.deleteComment = function() {
    CommentsService.deleteComment(this.task, this.comment)
      .success(function(response) {
        Messages.warning(response)
      });
  };

  $scope.updateComment = function(data) {
    CommentsService.updateComment(this.comment, data)
      .success(function(response) {
        Messages.warning(response)
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
        .success(function (response){
          $scope.comment.attachments.push(response.attachment);
          Messages.success(response)
        });
      });
    }
  };

  $scope.parser = document.createElement('a');

}])
