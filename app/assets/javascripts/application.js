// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require angular
//= require ui-bootstrap-tpls-0.11.0.min 
//= require angular-resource
//= require services/postsService
//= require services/commentsService
//= require services/projectsService
//= require controllers/posts
//= require controllers/comments
//= require controllers/projects
//= require angular-will-paginate


angular.module('PostCommentRails', ['postsService', 'commentsService', 'projectsService', 'ui.bootstrap'])
  .config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }])
  .config(['$routeProvider', function(router){
    router
      .when('/posts', {templateUrl:'/posts/index.html', controller:PostsCtrl})
      .when('/posts/add', {templateUrl:'/posts/add.html', controller: PostAddCtrl})
      .when('/posts/:post_id', {templateUrl:'/posts/show.html', controller:PostShowCtrl})
      .when('/posts/:post_id/edit', {templateUrl:'/posts/edit.html', controller: PostEditCtrl})
      .when('/projects', {templateUrl:'/projects/index.html', controller: ProjectsCtrl})
			.when('/projects/add', {templateUrl:'/projects/add.html', controller: ProjectAddCtrl})
      .otherwise({redirectTo: '/posts'});
}]);


angular.module('radd', ['sessionService','recordService','$strap.directives'])
  .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

        var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
            function success(response) {
                return response
            };

            function error(response) {
                if (response.status == 401) {
                    $rootScope.$broadcast('event:unauthorized');
                    $location.path('/users/login');
                    return response;
                };
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        $httpProvider.responseInterceptors.push(interceptor);
  }])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {templateUrl:'/home/index.html'})
      .when('/record', {templateUrl:'/record/index.html', controller:RecordCtrl})
      .when('/users/login', {templateUrl:'/users/login.html', controller:UsersCtrl})
      .when('/users/register', {templateUrl:'/users/register.html', controller:UsersCtrl});
  }]);


