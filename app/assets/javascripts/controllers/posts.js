function PostsCtrl($scope, Posts) {
    "use strict";
    $scope.posts = Posts.index();
}

function PostShowCtrl($scope, $location, $routeParams, Post) {"use strict";
    $scope.mypost_id = "show"
    $scope.post = Post.show({
        post_id : $routeParams.post_id
    });
    console.log($routeParams.post_id)
}

function PostAddCtrl($scope, $location, Posts, Post) {
    "use strict";
    $scope.post = {};
    $scope.create = function(post) {
        var postService = new Posts(post);
        postService.$create(function(post) {
            $location.path('/posts');
        });
    }
}

function PostEditCtrl($scope, $routeParams, $location, Post) {
    "use strict";
    
    $scope.master = {};
    var post_id = $routeParams.post_id;
    $scope.post = Post.show({
        post_id : post_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(post) {
        post.$update({
            post_id : post_id
        }, function(updatedPost) {
            $location.path('/posts/' + updatedPost.id);
        });
    }
}

