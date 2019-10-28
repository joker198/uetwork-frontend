 (function () {
    'use strict';

    angular.module('services')
        .factory('loginAdService',loginAdService);
    loginAdService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function loginAdService($log, $http, $q,$rootScope) {
        return{
            loginAd: loginAd,
            logout: logout
        };
        function loginAd(data) {
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
