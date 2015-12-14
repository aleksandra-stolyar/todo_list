app.controller('CommentsCtrl', ['$scope', 'CommentsService', '$stateParams', 'Upload', function($scope, CommentsService, $stateParams, Upload) {
  $scope.deleteComment = function() {
    CommentsService.deleteComment(this.task, this.comment).then(function() {
      console.log("Comment deleted!")
    });
  };

  $scope.addAttachment = function(files) {
    if (files && files.length) {
      // debugger
      var comment = this.comment

      angular.forEach(files, function (file) {
        debugger
        if (files && !file.$error) {
          Upload.upload({
            url: '/comments/' + comment.id + '/attachments.json',
            data: {
              attachment: file
            }
          });
        }
      });
    }
    // CommentsService.createAttachment(this.comment, attachment).then(function() {

    // });
  };

  $scope.parser = document.createElement('a');

}])
