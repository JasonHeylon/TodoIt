// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

(function(){
	'use strict'
	angular.module('todoit', ['ngMaterial', 'templates', 'ngRoute', 'ngResource'])

		.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
			$routeProvider
				.when('/', {
					templateUrl: 'todoit.html',
					controller: 'TodoListController'
				})
				.when('/:date', {
					templateUrl: 'todoit.html',
					controller: 'TodoListController'
				});

				var csrfToken = $('meta[name=csrf-token]').attr('content');
				console.log(csrfToken)

				$httpProvider.defaults.headers.common['X-CSRF-Token'] = csrfToken;
			  // $httpProvider.defaults.headers.put['X-CSRF-Token'] = csrfToken;
			  // $httpProvider.defaults.headers.delete['X-CSRF-Token'] = csrfToken;
		}])

		.controller('TodoListController', ['$scope', '$routeParams', 'Todo', function($scope, $routeParams, Todo){
			if ($routeParams.date) {
				if (moment($routeParams.date, 'YYYY-MM-DD').isValid()) {
					$scope.current_date = moment($routeParams.date, 'YYYY-MM-DD');
				}else{
					switch($routeParams.date){
						case 'today': {
							$scope.current_date = moment()
							break;
						}
					}
					$scope.current_date = moment();
				}
			}	else{
				$scope.current_date = moment();
			}
			console.log($scope.current_date.format('YYYY-MM-DD'));

			$scope.app_title = 'TodoIt Today';
			$scope.new_todo = {};

			Todo.all().success(function(data){
				console.log(data);
				$scope.todo_list = data;
			})


			$scope.addTodo = function(todo){
				Todo.create(todo).success(function(data){
					$scope.todo_list.push(data);
				})
				$scope.new_todo = {};
			};

			$scope.removeTodo = function(todo){
				var current_todo =  $scope.todo_list[$scope.todo_list.indexOf(todo)];
				if (current_todo) {
					Todo.remove(todo).success(function(data){
						$scope.todo_list.splice($scope.todo_list.indexOf(todo), 1);
					}).catch(function(error){
						console.log(error);
					});
				}
			}

			$scope.markComplete = function(todo){
				if (current_todo) {
					Todo.markComplete(todo).success(function(data){
						$scope.todo_list[$scope.todo_list.indexOf(todo)] = data;
					}).catch(function(error){
						todo.is_completed = false;
						$scope.todo_list[$scope.todo_list.indexOf(todo)] = todo;
					});				
				}
			}

			$scope.markUnComplete = function(todo){
				var current_todo =  $scope.todo_list[$scope.todo_list.indexOf(todo)];
				if (current_todo) {
					Todo.markUnComplete(todo).success(function(data){
						current_todo = data;
					}).catch(function(error){
						todo.is_completed = true;
						current_todo = todo;
						console.log(error);
					});				
				}
			};


		}])

		.directive('newTodo',  function(){
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'new_todo_form.html',
				link: function(scope, element, attrs){
					
				}
			};
		})

		.filter('todoFilter', function(){
			return function(collection, is_completed){
				var new_collection = [];
				if (collection) {
					for (var i = collection.length - 1; i >= 0; i--) {
						var current_todo = collection[i];
						if (current_todo.is_completed == is_completed) {
							new_collection.push(current_todo);
						}
					};
				}
				
				return new_collection;
			};

		})

		.factory('Todo', [ '$http', function TodoFactory($http){
			return {
				all: function(){
					return $http({ method: 'GET', url: '/todos.json'});
				},
				create: function(todo){
					return $http({ method: 'POST', url: '/todos.json', data: todo });
				},
				markComplete: function(todo){
					return $http({ method: 'PUT', url: '/todos/' + todo.id + "/mark_complete.json", data: todo });
				},
				markUnComplete: function(todo){
					return $http({ method: 'PUT', url: '/todos/' + todo.id + '/mark_uncomplete.json', data: todo });
				},
				remove: function(todo){
					return $http({ method: 'DELETE', url:'/todos/' + todo.id + ".json", data: todo });
				}
			}
		}]);




	// var todo_list = [
	// 	{ id: 1, title: 'todo it angualr controller开发', is_completed: false },
	// 	{ id: 2, title: 'todo it 界面设计', is_completed: true },
	// 	{ id: 3, title: 'todo it view 开发', is_completed: false }
	// ];


}());