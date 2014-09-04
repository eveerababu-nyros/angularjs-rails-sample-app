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
//= require ui-bootstrap-tpls-0.2.0 
//= require angular-resource
//= require services/postsService
//= require services/commentsService
//= require controllers/posts
//= require controllers/comments
//= require angular-will-paginate
//= require_tree.

angular.module('PostCommentRails', ['postsService', 'commentsService',])
  .config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }])
  .config(['$routeProvider', function(router){
    router
      .when('/posts', {templateUrl:'/posts/index.html', controller:PostsCtrl})
      .when('/posts/add', {templateUrl:'/posts/add.html', controller: PostAddCtrl})
      .when('/posts/:post_id', {templateUrl:'/posts/show.html', controller:PostShowCtrl})
      .when('/posts/:post_id/edit', {templateUrl:'/posts/edit.html', controller: PostEditCtrl})
      .otherwise({redirectTo: '/posts'});
}]);

