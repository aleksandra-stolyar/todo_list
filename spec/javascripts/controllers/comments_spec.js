describe("CommentsController", function() {
  var $scope, CommentsService, ProjectsService, Messages, defer;

  beforeEach(function() {
    var mockCommentsService = {};
    var mockProjectsService = {};
    module('ToDoApp', function($provide) {
      $provide.value('CommentsService', mockCommentsService);
      $provide.value('ProjectsService', mockProjectsService);
    });

    inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      var user = {id: 1, email: 'test@email.com'};
      $httpBackend.when('POST', '/users/sign_in.json').respond(user);
    });

    inject(function($q, Messages) {
      defer = $q.defer();
      mockProjectsService.projects = [
        {id: 0, name: 'project 1'}
      ];

      // mockCommentsService.tasks = [
      //   {id: 0, name: 'task 1', status: "in_progress" }
      // ];

      mockCommentsService.delete = function(item) {
        return defer.promise;
      };

      mockCommentsService.update = function(item, data) {
        return defer.promise;
      };
    });
  });

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _CommentsService_, _Messages_) {
    rootScope = $rootScope;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    CommentsService = _CommentsService_;
    Messages = _Messages_;
    $controller('CommentsController', {$scope: $scope, CommentsService: CommentsService, Messages: Messages});
    $httpBackend.flush();
    $scope.task = {id: 0, name: 'task 1', comments: [{id: 0, name: 'comment 1' }]};
  }));

  afterEach(inject(function(_$httpBackend_) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('check loading comments', function() {
    it('should have some items at start', function () {
      expect($scope.task.comments.length).toBe(1);
    });

    it('should contain comments at startup', function() {
      expect($scope.task.comments).toEqual([
        {id: 0, name: 'comment 1'}
      ]);
    });
  });

  describe('.deleteComment', function() {
    beforeEach(function () {
      spyOn(Messages, 'warning').and.returnValue("message");
      comment = $scope.task.comments[0];
    });

    it("makes request", function () {
      spyOn(CommentsService, 'delete').and.callThrough();
      $scope.deleteComment(comment);
      expect(CommentsService.delete).toHaveBeenCalled();
    });

    it("changes comments count", function () {
      defer.resolve('');
      $scope.deleteComment(comment);
      rootScope.$apply();
      expect($scope.task.comments.length).toBe(0);
    });
  });

  describe('.updateComment', function() {
    beforeEach(function () {
      spyOn(Messages, 'warning').and.returnValue("message");
      comment = $scope.task.comments[0];
      data = 'updated comment';
    });

    it("makes request", function () {
      spyOn(CommentsService, 'update').and.callThrough();
      $scope.updateComment(comment, data);
      expect(CommentsService.update).toHaveBeenCalled();
    });
  });
});