 (function () {
    'use strict';

    angular.module('services')
        .factory('notificationService',notificationService);
    notificationService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function notificationService($log, $http, $q,$rootScope) {
        return{
            getAllNotification: getAllNotification
        };
        function getAllNotification() {
            return $http({
                url: $rootScope.serverAdd + '/notification/all/admin',
                method: 'GET'
            })
        }
    }
}());
