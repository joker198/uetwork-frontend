(function() {
    'use strict';
    angular.module('services')
        .factory('infoService', infoService);

    infoService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function infoService($log, $http, $q, $rootScope) {
        return {
            getStudentInfo: getStudentInfo,
            editInfo: editInfo,
            deleteInfo: deleteInfo,
            loadInfoBySchool: loadInfoBySchool,
            loadStudent: loadStudent,
            changeAva: changeAva,
            loadInfoBySchoolByStudentId: loadInfoBySchoolByStudentId,
            createPassInterviewLink: createPassInterviewLink,
            changePass: changePass,
            getAllStudentClass: getAllStudentClass,
            editInfoBySchool: editInfoBySchool,
            getGradeLevels: getGradeLevels
        };
        
        function getGradeLevels()
        {
            return $http({
                url: $rootScope.serverAdd + '/grade-levels',
                method: 'GET'
            });
        }
        function editInfoBySchool(data) {
            return $http({
                url: $rootScope.serverAdd + '/infoBySchool/class',
                method: 'PUT',
                data: data
            })
        }

        function getAllStudentClass() {
            return $http({
                url: $rootScope.serverAdd + '/studentClass',
                method: 'GET'
            })
        }

        function changePass(data) {
            return $http({
                url: $rootScope.serverAdd + '/changePassword',
                method: 'PUT',
                data: data
            })
        }


        function createPassInterviewLink(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/' + studentId + '/passInterview',
                method: 'POST'
            })
        }



        function loadInfoBySchoolByStudentId(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/infoBySchool/' + studentId,
                method: 'GET'
            })
        }

        function loadInfoBySchool(infoBySchoolId) {
            return $http({
                url: $rootScope.serverAdd + '/infoBySchool/' + infoBySchoolId,
                method: 'GET'
            })
        }

        function getStudentInfo() {
            return $http({
                url: $rootScope.serverAdd + '/studentInfo',
                method: 'GET'
            })
        }

        function editInfo(data, studentInfoId) {
            return $http({
                url: $rootScope.serverAdd + '/studentInfo',
                method: 'PUT',
                data: data
            })
        }

        function deleteInfo(studentInfoId) {
            return $http({
                url: $rootScope.serverAdd + '/studentInfo/' + studentInfoId,
                method: 'DELETE'
            })
        }

        function loadStudent(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/' + studentId,
                method: 'GET'
            })
        }

        function changeAva(data) {
            return $http({
                url: $rootScope.serverAdd + '/changeAva',
                method: 'PUT',
                data: data
            })
        }
    }
}());
