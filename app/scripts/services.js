(function(){
	'use strict';

	angular
		.module('myApp')
		.service('Users',['$http','$q',usersService]);

	function usersService ($http, $q) {
		var users = {};

		users.getAll = function () {
			var defered = $q.defer();
			$http.get('scripts/users.json').success(function(users){
				defered.resolve(users.data);
			})
			.error(function(err){
				defered.reject(err);
			});
			return defered.promise;
		};

		users.get = function (id) {
			var defered = 	$q.defer();
			$http.get('scripts/users.json').success(function(users){
				defered.resolve(users.data[--id]);
			})
			.error(function(err){
				defered.reject(err);
			});
			return defered.promise;
		};

		return users;
	}
})();
