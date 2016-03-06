(function(){
	'use strict';

	angular
		.module('myApp')
		.controller('UsersCtrl',['$scope','$location','Users', UsersCtrl])
		.controller('UserDetailCtrl',['$scope','$routeParams','$location','Users', UserDetailCtrl]);

	function UsersCtrl ($scope, $location, Users) {
		$scope.users = [];

		$scope.loadUsers = function () {
			Users.getAll().then(function(users){
				$scope.users = users;
			});
		};

		$scope.addUser = function () {
			$location.path('/usuarios');
		};

		$scope.remove = function(selectedUser) {
			$scope.users.forEach(function(user, index){
				if (user.id === selectedUser.id) {
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
		};
	}

})();
