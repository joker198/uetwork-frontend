 (function () {
    'use strict';

    angular.module('services')
        .factory('loginService',loginService);

    loginService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function loginService($log, $http, $q,$rootScope) {
        return{
            login: login,
            logout: logout,
            signup : signup,
            getNotificationMessage : getNotificationMessage,
            resetPassword : resetPassword
        };

        function resetPassword(data) {
            return $http({
                url: $rootScope.serverAdd + '/resetPass',
                method: 'PUT',
                data: data
            })
        }
        
        function signup(data) {
            return $http({
                url: $rootScope.serverAdd + '/signup',
                method: 'PUT',
                data: data
            })
        }
        function login(data) {
            return $http({
                url: $rootScope.serverAdd + '/login?data=' + data,
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
        function getNotificationMessage() {
            return $http({
                url: $rootScope.serverAdd + '/message/notification',
                method: 'GET'
            })
        }
    }
}());
