angular.module('starter.controllers', [])

.controller('TodoCtrl', function($scope, $todoService, $ionicPopup, $ionicListDelegate) {



        function init() {
            $todoService.fetchPage(0).then(function(response) {
               $scope.todos = response;
            });
        }


        $scope.newTask = function() {
            $ionicPopup.prompt({
                "title" : "New Task",
                "template" : "Enter description:",
                "inputPlaceholder" : "Rule the world",
                "okText" : "Create task"
            }).then(function(res) {
               if (res) $todoService.add(res).then(function(response) {
                   $scope.todos.push(response);
               }); // $scope.todos.push({name : res, done: false});
            });
        };

        $scope.$watch("todos", function() {
            console.log("todos changed")
        });

        $scope.remove = function(todo, $index) {
            $todoService.remove(todo).then(function() {
                $scope.todos.splice($index, 1);
            });
        };

        $scope.toggleState = function( todo) {
            var modifiedTodo = todo;
            modifiedTodo.done = (todo.done == 1) ? 0 : 1;
            $todoService.modify(modifiedTodo).then(function(newTodo) {
                todo = newTodo;
            });
        }

        $scope.edit = function(todo) {
            $scope.data = {response : todo.name };
            $ionicPopup.prompt({
               title : "Edit task",
               scope : $scope
            }).then(function(res) {
                if (res !== undefined) {
                    var modifiedTodo = todo;
                    modifiedTodo.name = $scope.data.response;
                    $todoService.modify(modifiedTodo).then(function(newTodo) {
                        todo = newTodo;
                        $ionicListDelegate.closeOptionButtons(); // becsukjuk az elemet
                    })
                }
            });
        };

        init();
    }
);