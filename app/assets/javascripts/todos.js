// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
(function(){
	'use strict'
	angular.module('todoIt', [])
	.controller('TodoListController', [ '$scope', function($scope){
		this.app_name = "TodoIt";
		this.todoList = todoList;
	}]);


	var todoList = [
	];

}());