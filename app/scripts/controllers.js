(function(){
	'use strict';

	angular
		.module('myApp')
		.controller('UsersCtrl',['$scope','$location','Users', usersCtrl])
		.controller('UserDetailCtrl',['$scope','$routeParams','$location','Users', UserDetailCtrl]);

	function usersCtrl ($scope, $location, Users) {
		$scope.users = [];

		$scope.loadUsers = function () {
			Users.getAll().then(function(users){
				$scope.users = users;
			});
		};

		$scope.addUser = function () {
			$scope.users.push($scope.user);
			$location.path('/usuarios');
			$scope.user = {};
		};

		$scope.remove = function(id) {
			$scope.users.forEach(function(user, index){
				if (user.id === id) {
					$scope.users.splice(index,1);
				}
			});
		};
	}

	function UserDetailCtrl ($scope, $routeParams, $location, Users) {
		$scope.user = {};

		$scope.getUser = function() {
			Users.get($routeParams.id).then(function(user){
				$scope.user = user;
			});
		};

		$scope.updateUser = function() {
			$location.path('/usuarios');
			$scope.user = {};
		};
	}

})();
