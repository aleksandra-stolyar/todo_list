describe("TasksController", function() {
  var $scope, TasksService, ProjectsService, Messages, defer;

  beforeEach(function() {
    var mockTasksService = {};
    var mockProjectsService = {};
    module('ToDoApp', function($provide) {
      $provide.value('TasksService', mockTasksService);
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

      mockTasksService.delete = function(item) {
        return defer.promise;
      };

      mockTasksService.update = function(item, data) {
        return defer.promise;
      };

      mockTasksService.updateStatus = function(item) {
        return defer.promise;
      };

      mockTasksService.createComment = function (project, item) {
        return defer.promise;
      };

    });
  });

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _TasksService_, _Messages_) {
    rootScope = $rootScope;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    TasksService = _TasksService_;
    Messages = _Messages_;
    $controller('TasksController', {$scope: $scope, TasksService: TasksService, Messages: Messages});
    $httpBackend.flush();
    $scope.project = {id: 0, name: 'project 1', tasks: [{id: 0, name: 'task 1', status: "in_progress" }]};
  }));

  afterEach(inject(function(_$httpBackend_) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('check loading tasks', function() {
    it('should have some items at start', function () {
      expect($scope.project.tasks.length).toBe(1);
    });

    it('should contain tasks at startup', function() {
      expect($scope.project.tasks).toEqual([
        {id: 0, name: 'task 1', status: "in_progress"}
      ]);
    });
  });

  describe('.deleteTask', function() {
    beforeEach(function () {
      spyOn(Messages, 'warning').and.returnValue("message");
      task = $scope.project.tasks[0];
    });

    it("makes request", function () {
      spyOn(TasksService, 'delete').and.callThrough();
      $scope.deleteTask(task);
      expect(TasksService.delete).toHaveBeenCalled();
    });

    it("changes tasks count", function () {
      defer.resolve('');
      $scope.deleteTask(task);
      rootScope.$apply();
      expect($scope.project.tasks.length).toBe(0);
    });
  });

  describe('.updateTask', function() {
    beforeEach(function () {
      spyOn(Messages, 'warning').and.returnValue("message");
      task = $scope.project.tasks[0];
      data = 'updated task';
    });

    it("makes request", function () {
      spyOn(TasksService, 'update').and.callThrough();
      $scope.updateTask(task, data);
      expect(TasksService.update).toHaveBeenCalled();
    });
  });

  describe('.setStatus', function() {
    beforeEach(function () {
      spyOn(Messages, 'success').and.returnValue("message");
      task = $scope.project.tasks[0];
      // $scope.project = {id: 3, name: "project with tasks", tasks: []}
    });

    it("makes request", function () {
      spyOn(TasksService, 'updateStatus').and.callThrough();
      $scope.setStatus(task);
      expect(TasksService.updateStatus).toHaveBeenCalled();
    });

    it("changes tasks array", function () {
      defer.resolve({ data: {task: {id: 0, name: "task 1", status: "completed"}}})
      $scope.setStatus(task);
      rootScope.$apply();
      expect($scope.project.tasks[0].status).toEqual("completed")
    });
  });

  describe('.addComment', function() {
    beforeEach(function () {
      spyOn(Messages, 'success').and.returnValue("message");
      $scope.task = {id: 2, name: 'task with comments', status: "in_progress", comments: [] }
      $scope.commentBody = 'comment body'
    });

    it("makes request", function () {
      spyOn(TasksService, 'createComment').and.callThrough();
      $scope.addComment();
      expect(TasksService.createComment).toHaveBeenCalled();
    });

    it("changes comments count", function () {
      defer.resolve({data: { comment: {id: 0, name: 'comment body'} }})
      $scope.addComment();
      rootScope.$apply();
      expect($scope.task.comments.length).toBe(1);
    });

    it("changes clears comment body after create", function () {
      $scope.addComment();
      expect($scope.commentBody).toBe('');
    });

    it("changes comments array", function () {
      defer.resolve({data: { comment: {id: 0, name: 'comment body'} }})
      $scope.addComment();
      rootScope.$apply();
      expect($scope.task.comments[0]).toEqual({id: 0, name: 'comment body' })
    });
  });
});