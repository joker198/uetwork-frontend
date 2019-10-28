(function() {
    'use strict';
    angular.module('services')
        .factory('messageService', messageService);

    messageService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function messageService($log, $http, $q, $rootScope) {
        return {
            getMessage: getMessage,
            getNewMessage: getNewMessage,
            getAllComfirmationLink: getAllComfirmationLink,
            getMessageByType: getMessageByType,
            selectIntern : selectIntern,
            getAllComfirmationLink : getAllComfirmationLink,
            createMessage : createMessage,
            getOneMessage : getOneMessage,
            getParentMessage : getParentMessage,
            getRegistrationList : getRegistrationList,
            markMessageAsSeen : markMessageAsSeen,
            getAllMessage : getAllMessage,
            addFinalReport: addFinalReport,
            getLecturersName: getLecturersName
        };

        function getLecturersName() {
            return $http({
                url: $rootScope.serverAdd + '/student/lecturersName',
                method: 'GET'
            })
        }
        function addFinalReport(data) {
            return $http({
                url: $rootScope.serverAdd + '/intern/addFinalReport',
                method: 'POST',
                data: data
            })
        }

        function getAllMessage(page, size){
            return $http({
                url: $rootScope.serverAdd + '/message?page=' + page + '&size=' + size,
                method: 'GET'
            })
        }

        function markMessageAsSeen(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/' + messageId + '/seen',
                method: 'PUT'
            })
        }

        

        function getRegistrationList(studentId){
            return $http({
                url: $rootScope.serverAdd + '/student/' + studentId + '/follow',
                method: 'GET'
            })
        }

        function getParentMessage(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/parent/' + messageId,
                method: 'GET'
            })
        }

        function getOneMessage(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/messageId/' + messageId,
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

        function getAllComfirmationLink(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/' + studentId + '/comfirmationLink',
                method: 'GET'
            })
        }

        function selectIntern(comfirmationLink) {
            return $http({
                url: $rootScope.serverAdd + '/comfirmationLink/' + comfirmationLink,
                method: 'POST'
            })
        }

        function getMessageByType(messageType) {
            return $http({
                url: $rootScope.serverAdd + '/message/' + messageType,
                method: 'GET'
            })
        }

        function getAllComfirmationLink(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/' + studentId + '/comfirmationLink',
                method: 'GET'
            })
        }

        function getNewMessage() {
            return $http({
                url: $rootScope.serverAdd + '/message/new',
                method: 'GET'
            })
        }

        function getMessage() {
            return $http({
                url: $rootScope.serverAdd + '/message',
                method: 'GET'
            })
        }
    }
}());
