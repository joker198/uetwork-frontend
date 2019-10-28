(function() {
    'use strict';

    angular.module('services')
        .factory('messageService', messageService);
    messageService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function messageService($log, $http, $q, $rootScope) {
        return {
            createPassInterviewMessage: createPassInterviewMessage,
            getNewMessage: getNewMessage,
            getAllMessage: getAllMessage,
            createMessage: createMessage,
            getNotificationMessage: getNotificationMessage,
            createNotificationMessage: createNotificationMessage,
            deleteNotificationMessage: deleteNotificationMessage,
            createFailInterviewMessage: createFailInterviewMessage,
            getParentMessage: getParentMessage,
            markMessageAsSeen: markMessageAsSeen,
            getOneMessage: getOneMessage
        };

        function getOneMessage(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/messageId/' + messageId,
                method: 'GET'
            })
        }

        function markMessageAsSeen(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/' + messageId + '/seen',
                method: 'PUT'
            })
        }

        function getParentMessage(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/parent/' + messageId,
                method: 'GET'
            })
        }

        function getAllMessage(page, size, lastUpdated) {
            if(lastUpdated == undefined){
                lastUpdated = new Date().getTime();
            }
            return $http({
                url: $rootScope.serverAdd + '/message?&lastUpdated=' + lastUpdated + '&page=' + page + '&size=' + size,
                method: 'GET'
            })
        }

        function createFailInterviewMessage(data) {
            return $http({
                url: $rootScope.serverAdd + '/message/failInterview/create',
                method: 'POST',
                data: data
            })
        }

        function deleteNotificationMessage(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/notification/delete/' + messageId,
                method: 'DELETE'
            })
        }

        function createNotificationMessage(data) {
            return $http({
                url: $rootScope.serverAdd + '/message/notification/create',
                method: 'POST',
                data: data
            })
        }

        function getNotificationMessage() {
            return $http({
                url: $rootScope.serverAdd + '/message/notification',
                method: 'GET'
            })
        }

        function createMessage(data) {
            return $http({
                url: $rootScope.serverAdd + '/message/create',
                method: 'POST',
                data: data
            })
        }

        function getNewMessage() {
            return $http({
                url: $rootScope.serverAdd + '/message/new',
                method: 'GET'
            })
        }

        function createPassInterviewMessage(data) {
            return $http({
                url: $rootScope.serverAdd + '/message/passInterview/create',
                method: 'POST',
                data: data
            })
        }
    }
}());