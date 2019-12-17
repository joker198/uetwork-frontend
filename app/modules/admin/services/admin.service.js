(function() {
    'use strict';

    angular.module('services')
        .factory('adminService', adminService);
    adminService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function adminService($log, $http, $q, $rootScope) {
        return {
            getAllNotification: getAllNotification,
            loginAd: loginAd,
            logout: logout,
            getAllUser: getAllUser,
            changePassword: changePassword,
            searchUser: searchUser,
            getStudentInformationByUserId: getStudentInformationByUserId,
            getGradeLevel: getGradeLevel,
            createGradeLevel: createGradeLevel,
            deleteGradeLevel: deleteGradeLevel,
            getUserInfo: getUserInfo
        };

        function getGradeLevel() {
            return $http({
                url: $rootScope.serverAdd + '/grade-levels',
                method: 'GET'
            })
        }
        function createGradeLevel(data) {
            return $http({
                url: $rootScope.serverAdd + '/grade-levels',
                method: 'POST',
                data: data 
            })
        }
        function deleteGradeLevel(gradeLevelId) {
            return $http({
                url: $rootScope.serverAdd + '/grade-levels/' + gradeLevelId,
                method: 'DELETE'
            })
        }
        function getUserInfo(userId) {
             return $http({
                url: $rootScope.serverAdd + '/user/' +userId,
                method: 'GET'
            })
        }
        function getStudentInformationByUserId(userId) {
            return $http({
                url: $rootScope.serverAdd + '/student/user/' + userId,
                method: 'GET'
            })
        }

        function searchUser(userName) {
            return $http({
                url: $rootScope.serverAdd + '/user/search/' + userName,
                method: 'GET'
            })
        }

        function changePassword(data) {
            return $http({
                url: $rootScope.serverAdd + '/changePassword',
                method: 'PUT',
                data: data
            })
        }

        function getAllUser(page, size) {
            return $http({
                url: $rootScope.serverAdd + '/user?page=' + page + '&size=' + size,
                method: 'GET'
            })
        }

        function getAllNotification() {
            return $http({
                url: $rootScope.serverAdd + '/notification/all/admin',
                method: 'GET'
            })
        }

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
