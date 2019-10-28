(function() {
    'use strict';
    angular.module('services')
        .factory('lecturersService', lecturersService);

    lecturersService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function lecturersService($log, $http, $q, $rootScope) {
        return {
            getAllLecturers: getAllLecturers,
            createLecturers: createLecturers,
            getAllFaculty: getAllFaculty,
            createFaculty: createFaculty,
            deleteLecturers: deleteLecturers,
            createLecturersFromExcel: createLecturersFromExcel,
            getAllStudentClass: getAllStudentClass,
            createStudentClass: createStudentClass,
            deleteStudentClass: deleteStudentClass,
            editStudentCLass: editStudentCLass,
            editLecturers: editLecturers
        };

        function editLecturers(data){
            return $http({
                url:$rootScope.serverAdd + '/lecturers/info/edit',
                method: 'PUT',
                data : data
            })
        }

        function editStudentCLass(data){
            return $http({
                url:$rootScope.serverAdd + '/studentClass/edit',
                method: 'POST',
                data : data
            })
        }

        function getAllStudentClass() {
            return $http({
                url: $rootScope.serverAdd + '/studentClass',
                method: 'GET'
            })
        }

        function createStudentClass(data) {
            return $http({
                url: $rootScope.serverAdd + '/studentClass/create',
                method: 'POST',
                data: data
            })
        }

        function deleteStudentClass(studentClassId) {
            return $http({
                url: $rootScope.serverAdd + '/studentClass/' + studentClassId + '/delete',
                method: 'DELETE'
            })
        }

        function createLecturersFromExcel(data) {
            return $http({
                url: $rootScope.serverAdd + '/createLecturers',
                method: 'POST',
                data: data
            })
        }

        function deleteLecturers(lecturersId) {
            return $http({
                url: $rootScope.serverAdd + '/lecturers/delete/' + lecturersId,
                method: 'DELETE'
            })
        }

        function createLecturers(data) {
            return $http({
                url: $rootScope.serverAdd + '/createAccount',
                method: 'POST',
                data: data
            })
        }

        function createFaculty(data) {
            return $http({
                url: $rootScope.serverAdd + '/faculty/create',
                method: 'POST',
                data: data
            })
        }

        function getAllFaculty() {
            return $http({
                url: $rootScope.serverAdd + '/faculty',
                method: 'GET'
            })
        }

        function getAllLecturers() {
            return $http({
                url: $rootScope.serverAdd + '/lecturers',
                method: 'GET'
            })
        }


    }
}());
