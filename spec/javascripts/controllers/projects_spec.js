describe("ProjectsController", function() {
  var $scope, ProjectsService, Messages, defer;

  beforeEach(function() {
    var mockProjectsService = {};
    module('ToDoApp', function($provide) {
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
        {id: 0, name: 'project 1'},
        {id: 1, name: 'project 2'}
      ];

      mockProjectsService.create = function(item) {
        return defer.promise;
      };

      mockProjectsService.update = function(item, data) {
        return defer.promise;
      };

      mockProjectsService.delete = function(item) {
        return defer.promise;
      };

      mockProjectsService.createTask = function (project, item) {
        return defer.promise;
      };

    });
  });

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _ProjectsService_, _Messages_) {
    rootScope = $rootScope;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    ProjectsService = _ProjectsService_;
    Messages = _Messages_;
    $controller('ProjectsController', {$scope: $scope, ProjectsService: ProjectsService, Messages: Messages});
    $scope.$digest();
    $httpBackend.whenGET('/projects').respond(200, ProjectsService.projects);
    $httpBackend.flush();
  }));

  afterEach(inject(function(_$httpBackend_) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  it('should have some items at start', function () {
    expect($scope.projects.length).toBe(2);
  });

  it('should contain all the projects at startup', function() {
    expect($scope.projects).toEqual([
      {id: 0, name: 'project 1'},
      {id: 1, name: 'project 2'}
    ]);
  });

  describe('.createProject', function() {
    beforeEach(function () {
      spyOn(Messages, 'success').and.returnValue("message");
      $scope.projectName = 'project 3'
    });

    it("makes request", function () {
      spyOn(ProjectsService, 'create').and.callThrough();
      $scope.createProject();
      expect(ProjectsService.create).toHaveBeenCalled();
    });

    it("changes projecs count", function () {
      defer.resolve({data: { project: {id: 2, name: 'project 3'} }})
      $scope.createProject();
      rootScope.$apply();
      expect($scope.projects.length).toBe(3);
    });

    it("changes clears name after create", function () {
      $scope.createProject();
      expect($scope.projectName).toBe('');
    });

    it("changes projecs array", function () {
      defer.resolve({data: { project: {id: 2, name: 'project 3'} }})
      $scope.createProject();
      rootScope.$apply();
      expect($scope.projects[2]).toEqual({ id: 2, name: 'project 3' })
    });
  });

  describe('.updateProject', function() {
    beforeEach(function () {
      spyOn(Messages, 'warning').and.returnValue("message");
      project = { id: 1 };
      data = 'updated project';
    });

    it("makes request", function () {
      spyOn(ProjectsService, 'update').and.callThrough();
      $scope.updateProject(project, data);
      expect(ProjectsService.update).toHaveBeenCalled();
    });
  });

  describe('.deleteProject', function() {
    beforeEach(function () {
      spyOn(Messages, 'warning').and.returnValue("message");
      project = { id: 1 };
    });

    it("makes request", function () {
      spyOn(ProjectsService, 'delete').and.callThrough();
      $scope.deleteProject(project);
      expect(ProjectsService.delete).toHaveBeenCalled();
    });
  });

  describe('.addTask', function() {
    beforeEach(function () {
      spyOn(Messages, 'success').and.returnValue("message");
      $scope.taskName = "new task";
      $scope.project = {id: 3, name: "project with tasks", tasks: []}
    });

    it("makes request", function () {
      spyOn(ProjectsService, 'createTask').and.callThrough();
      $scope.addTask();
      expect(ProjectsService.createTask).toHaveBeenCalled();
    });

    it("changes tasks count", function () {
      defer.resolve({data: { project: {id: 3, name: 'new task'} }})
      $scope.addTask();
      rootScope.$apply();
      expect($scope.project.tasks.length).toBe(1);
    });

    it("changes clears name after create", function () {
      $scope.addTask();
      expect($scope.taskName).toBe('');
    });

    it("changes projecs array", function () {
      defer.resolve({data: { task: {id: 0, name: 'new task'} }})
      $scope.addTask();
      rootScope.$apply();
      expect($scope.project.tasks[0]).toEqual({ id: 0, name: 'new task' })
    });
  });
});