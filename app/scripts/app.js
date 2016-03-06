'use strict';

angular
	.module('myApp',['ngRoute'])
	.config(['$routeProvider','$locationProvider', config]);


function config ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
		.otherwise('/usuarios')

		.when('/usuarios',{
			templateUrl: 'views/users.html',
			controller: 'UsersCtrl'
		})
		.when('/usuarios/nuevo',{
			templateUrl: 'views/addUser.html',
			controller: 'UsersCtrl'
		})
		.when('/usuarios/:id',{
			templateUrl: 'views/userDetail.html',
			controller: 'UserDetailCtrl'
		})
		.when('/usuarios/editar/:id',{
			templateUrl: 'views/editUser.html',
			controller: 'UserDetailCtrl'
		});
}
