var app = angular.module('ToDoApp', [
  'ui.router',
  'ct.ui.router.extras.sticky',
  'templates',
  'xeditable',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'ngFileUpload',
  'ui.sortable',
  'Devise'
]);
//Routing
app.config( ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$stickyStateProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $stickyStateProvider) {
  $stickyStateProvider.enableDebug(true);
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'projects/_main.html',
      controller: 'ProjectsController',
      data : {
        requireLogin : true
      },
      resolve: {
        projectsPromise: ['ProjectsService', function (ProjectsService){
          return ProjectsService.getAll();
        }],
      }
    })
    .state('authModal', {
      abstract: true,
      url: '/register',
      deepStateRedirect: { default: 'signin' },
      data : {
        requireLogin : false
      },
      onEnter: ['$stateParams', '$state', '$uibModal', 'Auth','$rootScope', function ($stateParams, $state, $uibModal, Auth, $rootScope, $log) {
        var modalInstance = $uibModal.open({
          backdrop: false,
          templateUrl: "authentication/_authModal.html",
          controller: 'AuthModalController'
        }).result.finally(function () {
          $state.go('home', 'Successfully logged in!');
        })
      }]
    })
    .state('signin', {
      url: '/sign_in',
      parent: 'authModal',
      sticky: true,
      deepStateRedirect: true,
      views: {
        'authModal@': {
          templateUrl: "authentication/_loginTab.html"
        }
      }
    })
    .state('signup', {
      url: '/sign_up',
      parent: 'authModal',
      sticky: true,
      deepStateRedirect: true,
      views: {
        'authModal@': {
          templateUrl: "authentication/_signupTab.html"
        }
      }
    });

  $locationProvider.html5Mode(true);
}]);

// Intercept 401 Unauthorized everywhere
app.config(['AuthInterceptProvider', function (AuthInterceptProvider) {
  AuthInterceptProvider.interceptAuth(true);
}]);

app.run(['$rootScope', '$state', 'Auth', '$log', '$window', 'AuthService', function ($rootScope, $state, Auth, $log, $window, AuthService) {
  $rootScope.$state = $state;

  Auth.currentUser().then(function(user) {
    console.log(user.email + ' $rootScope in app.run');
  });

  $rootScope.isAuthenticated = Auth.isAuthenticated();

  $rootScope.$watch(
    function() { return Auth.isAuthenticated(); },
    function(newValue, oldValue) {
      if ( newValue !== oldValue ) {
        $rootScope.isAuthenticated = newValue;
        $rootScope.currentUser = Auth._currentUser;
      }
    }
  );
  $rootScope.$on('devise:login', function(event, currentUser) {
    $rootScope.currentUser = Auth._currentUser;
    $rootScope.$broadcast('rootScope:broadcast', $rootScope.currentUser);
    $log.debug(currentUser.email + ' has logged in!', currentUser);
    $state.go('home', 'User has signed in');
  });

  $rootScope.$on('devise:logout', function(event, oldCurrentUser) {
    delete $rootScope.currentUser;
    $log.debug(oldCurrentUser.email + ' has logged out!', oldCurrentUser);
    $state.go('signin', 'User has signed out');
  });

  $rootScope.$on('devise:new-registration', function(event, user) {
    $rootScope.currentUser = Auth._currentUser;
    $rootScope.$broadcast('rootScope:broadcast', $rootScope.currentUser);
    $log.debug(user.email + ' has signed up!', user);
    $state.go('home', 'New user has registered');
  });

  $rootScope.$on('devise:unauthorized', function(event) {
    $state.go('signin', 'User unauthorized');
  })

  $rootScope.$on('$stateChangeStart', function (e, toState) {
    var result = toState.data.requireLogin;
    if (result && $rootScope.currentUser == undefined) {
      e.preventDefault();
    }
  });

}]);
