// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

(function(){
	'use strict'
	angular.module('todoit', ['ngMaterial', 'templates', 'ngRoute', 'ngResource', 'ngAnimate'])

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
		}])

		.controller('TodoListController', ['$scope', '$routeParams', 'Todo', '$location', function($scope, $routeParams, Todo, $location){
			if ($routeParams.date) {
				if (moment($routeParams.date, 'YYYY-MM-DD').isValid()) {
					$scope.current_date = moment($routeParams.date, 'YYYY-MM-DD');
				}else{
					switch($routeParams.date){
						case 'today': {
							$scope.current_date = moment();
							break;
						}
					}
					$scope.current_date = moment();
				}
			}	else{
				$scope.current_date = moment();
			}
			console.log($scope.current_date.format('YYYY-MM-DD'));
			if ($scope.current_date.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
				$scope.app_title = 'TodoIt Today';
				$scope.days_word = "今天";
			}else{
				$scope.app_title = 'TodoIt ' + $scope.current_date.format('YYYY-MM-DD');
				$scope.days_word = "那天";
			}


			$scope.new_todo = {};
			if ($scope.current_date.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
				Todo.all().success(function(data){
					console.log(data);
					$scope.todo_list = data;
				});
			}else{
				Todo.all($scope.current_date.format('YYYY-MM-DD')).success(function(data){
					console.log(data);
					$scope.todo_list = data;
				});
			}

			$scope.isCurrentToday = function(){
				return $scope.current_date.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD');
			}

			$scope.addTodo = function(todo){
				Todo.create(todo).success(function(data){
					$scope.todo_list.push(data);
				})
				$scope.new_todo = {};
			};

			$scope.removeTodo = function(todo){
				var current_todo = $scope.todo_list[$scope.todo_list.indexOf(todo)];
				if (current_todo) {
					Todo.remove(todo).success(function(data){
						$scope.todo_list.splice($scope.todo_list.indexOf(todo), 1);
					}).catch(function(error){
						console.log(error);
					});
				}
			}

			$scope.markComplete = function(todo){
				var current_todo = $scope.todo_list[$scope.todo_list.indexOf(todo)];
				if (current_todo) {
					Todo.markComplete(todo).success(function(data){
						// current_todo = data;
						current_todo.completed_at = data.completed_at;
						current_todo.updated_at = data.udpated_at;
					}).catch(function(error){
						current_todo.is_completed = false;
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

			$scope.gotoPrev = function(){
				var date_str = $scope.current_date.add('-1', 'day').format('YYYY-MM-DD');
				$location.path('/' + date_str);
			}
			$scope.gotoNext = function(){
				var date_str = $scope.current_date.add('1', 'day').format('YYYY-MM-DD');
				$location.path('/' + date_str);
			}

			$scope.getCompletedCount = function(){
				if ($scope.todo_list) {
					var completed_list = $scope.todo_list.filter(function(todo){
						return todo.is_completed == true;
					});
					return completed_list.length;
				}
				return 0;

			}


		}])

    .directive('todo', function(){
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'todo_item.html',
        scope:{
          todo: '=',
          removeTodo: '=',
          toggleComplete: '=toggleComplete'
        },
        link: function(scope, element, attrs){
        	scope.getStatusText = function(){
        		if (scope.todo.is_completed) {
        			var days = moment(scope.todo.completed_at).diff(moment(scope.todo.created_at), 'days');
        			if (days < 1) {
        				return '';
        			}
        			return "延期了" + days + "天";
        		}else{
        			var days = moment().diff(moment(scope.todo.created_at), 'days');
	        		if (days < 1) {
	        			return "";
	        		}else{
	        			var days = moment().diff(moment(scope.todo.created_at), 'days');
	        			return "已延期" + days + "天";
	        		}
        		}
        	};

          element.find('.delete-panel').on('click', function(e){
          	element.addClass('deleting');
          });
          element.find('.todo-check').on('click', function(e){
          	element.addClass('completing');
          })
        }
      };
    })
		.directive('newTodo',  function(){
			return {
				restrict: 'E',
				replace: true,
        transclude: true,
				templateUrl: 'new_todo_form.html',
				link: function(scope, element, attrs){

				}
			};
		})

		.filter('todoFilter', function(){
			return function(collection, is_completed){
				if (collection && collection.length > 0) {
					return collection.filter(function(todo){
						return todo.is_completed == is_completed;
					});
				}
				return [];
			};

		})

		.factory('Todo', [ '$http', function TodoFactory($http){
			return {
				all: function(date){
					if (date) {
						return $http({ method: 'GET', url: '/todos.json?date=' + date });
					}else{
						return $http({ method: 'GET', url: '/todos.json'});
					}
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

}());
