'use strict';

// Declare app level module which depends on views, and components
angular.module('services', []);
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'user',
    'angular-md5',
    'services'
]).
config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(false).hashPrefix('');
        $routeProvider
            .when("/login", {
                controller: function() {
                    window.location.href = 'login.html';
                }
            }).otherwise({ redirectTo: "/login" });

    }])
    .filter('startFrom', function() {
        return function(input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        };
    });

(function() {
    var app = angular.module("user", []);
    app.controller('userCtrl', ['$scope', 'userService', '$location', '$rootScope', '$window', 'md5', '$timeout',
        function($scope, userService, $location, $rootScope, $window, md5, $timeout) {
            $rootScope.serverAdd = "http://192.168.0.100:8180";
            $rootScope.clientAdd = "http://192.168.0.210:8000";
            $scope.login = function() {
                if ($scope.input.username != "" && $scope.input.username != undefined &&
                    $scope.input.password != "" && $scope.input.password != undefined) {
                    NProgress.start();
                    $scope.request = {
                        userName: $scope.input.username,
                        password: md5.createHash($scope.input.password || '')
                    }
                    userService.login($scope.request)
                        .then(function(response) {
                            NProgress.done();
                            sessionStorage.setItem("Admin-Data", response.data.token);
                            sessionStorage.setItem("role", response.data.role);
                            sessionStorage.setItem('userName', response.data.userName);
                                sessionStorage.setItem('idAdmin', response.data.id);
                            sessionStorage.setItem("user", JSON.stringify(response.data));
                            if (response.data.role == 'ADMIN') {
                                window.location.href = $rootScope.clientAdd + '/admin';
                            } else if(response.data.role == 'LECTURERS'){
                                window.location.href = $rootScope.clientAdd + '/lecturers';
                            }
                        }, function(error) {
                            NProgress.done();
                            console.log(error);
                            if (error.data.indexOf("Wrong password") != -1) {
                                $scope.alertDanger("Wrong password!", "");
                            } else if (error.data.indexOf("Username not found") != -1) {
                                $scope.alertDanger("Username not found!", "");
                            } else if (error.data.indexOf("No permission") != -1) {
                                $scope.alertDanger("Username not found!", "");
                            } else {
                                $scope.alertDanger("Error", "");
                            }
                        })
                }
            }
            $scope.alertDanger = function(error, danger) {
                $scope.errorMessage = error;
                if (danger == 'danger') {
                    $scope.danger_edit = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.danger_edit = false;
                        });
                    }, 6000);
                } else {
                    $scope.danger = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.danger = false;
                            $scope.errorMessage = "";
                        });
                    }, 6000);
                }
            }

            $scope.alertSuccess = function(string, success) {
                $scope.successMessage = string;
                if (success == 'successdelete_edit') {
                    $scope.successdelete_edit = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.successdelete_edit = false;
                        });
                    }, 10000);
                } else {
                    $scope.success = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.success = false;
                        });
                    }, 10000);
                }

            }
        }
    ])
}());
(function() {
    'use strict';

    angular.module('services')
        .factory('userService', userService);

    userService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function userService($log, $http, $q, $rootScope) {
        return {
            login: login,
            logout: logout
        };

        function login(data) {
            return $http({
                url: $rootScope.serverAdd + '/admin/login',
                method: 'POST',
                data: data
            })
        }

        function logout() {
            return $http({
                url: $rootScope.serverAdd + '/logout',
                method: 'GET'
            })
        }
    }
}());
