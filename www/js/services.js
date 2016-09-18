angular.module('starter.services', [])



.factory('$todoService', ['$http','$q', function($http, $q) {

        var resourceLink = "http://todo.localhost.hu/todo";

        function fetchPage() {
            var deferred = $q.defer();
            $http.get(resourceLink).then(function(response){
                deferred.resolve(response.data._embedded.todo);
            });
            return deferred.promise;
        }

        function modify(todo) {
            var deferred = $q.defer();
            $http.put(todo._links.self.href, {
               name : todo.name,
               done: todo.done
            }).then(function(response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }

        function remove(todo) {
            var deferred = $q.defer();
            $http.delete(todo._links.self.href).then(function() {
                deferred.resolve();
            })
            return deferred.promise;
        }


        function add(name) {
            var deferred = $q.defer();
            $http.post(resourceLink, {"name" : name, "done" : 0}).then(function(response) {
                deferred.resolve(response.data)
            });
            return deferred.promise;
        }


        return {
            // az init nincs itt, mivel nem akarjuk publikussá tenni
            fetchPage : fetchPage,
            add : add,
            remove : remove,
            modify : modify
        };
    }]);

