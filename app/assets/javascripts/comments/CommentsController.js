app.controller('CommentsController', ['$scope', 'CommentsService', '$stateParams', 'Upload', '$timeout', 'Messages', function ($scope, CommentsService, $stateParams, Upload, $timeout, Messages) {
  $scope.deleteComment = function() {
    CommentsService.deleteComment(this.task, this.comment)
      .then(function successCallback(response) {
        Messages.warning(response.data)
      });
  };

  $scope.updateComment = function(data) {
    CommentsService.updateComment(this.comment, data)
      .then(function successCallback(response) {
        Messages.warning(response.data)
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
        .then(function successCallback(response) {
          $scope.comment.attachments.push(response.data.attachment);
          Messages.success(response.data)
        });
      });
    }
  };

  $scope.parser = document.createElement('a');

}])
