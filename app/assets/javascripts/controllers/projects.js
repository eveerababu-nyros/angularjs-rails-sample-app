function ProjectsCtrl($scope, Projects) {
	 "use strict";
		$scope.test = "tt";
    $scope.projects = Projects.index();
}

function ProjectAddCtrl($scope, $location, Projects, Project) {
    "use strict";
    $scope.project = {};
    $scope.create = function(project) {
        var projectService = new Projects(project);
        projectService.$create(function(project) {
						$location.path('/projects');
        });
    }
}
