(function() {
    'use strict';
    angular.module('services')
        .factory('studentService', studentService);

    studentService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function studentService($log, $http, $q, $rootScope) {
        return {
            // loadInfo: student/
            saveData: saveData,
            infoBySchool: infoBySchool,
            loadAllStudent: loadAllStudent,
            del: del,
            changeStatus: changeStatus,
            createStudent: createStudent,
            getAllStudent: getAllStudent,
            deleteStudent: deleteStudent,
            getStudentByStudentCode: getStudentByStudentCode,
            getUserNameAndEmailVnu: getUserNameAndEmailVnu,
            getWaitInterviewFollow: getWaitInterviewFollow,
            removeLecturers: removeLecturers,
            checkExcelLecturersAssignment: checkExcelLecturersAssignment,
            LecturersAssignmentExcel: LecturersAssignmentExcel,
            getAllStudentClass: getAllStudentClass,
            getCountStudentNoFollow: getCountStudentNoFollow,
            getStudentNoInternshipTerm: getStudentNoInternshipTerm,
            addFollow: addFollow,
            getAllFollow: getAllFollow,
            addScore: addScore,
            getAllFollowByInternshipTerm: getAllFollowByInternshipTerm,
            editLecturersStudent: editLecturersStudent,
            checkExcelAddScore: checkExcelAddScore,
            addExcelAddScore: addExcelAddScore,
            submitScore: submitScore,
            submitLecturers: submitLecturers
        };

        function submitLecturers() {
            return $http({
                url: $rootScope.serverAdd + '/noti/lecturers/on',
                method: 'POST'
            })
        }

        function submitScore(data) {
            return $http({
                url: $rootScope.serverAdd + '/noti/score/on',
                method: 'POST'
            })
        }

        function addExcelAddScore(data) {
            return $http({
                url: $rootScope.serverAdd + '/score/excel/add',
                method: 'POST',
                data: data
            })
        }

        function checkExcelAddScore(data) {
            return $http({
                url: $rootScope.serverAdd + '/score/excel/check',
                method: 'POST',
                data: data
            })
        }

        function editLecturersStudent(data) {
            return $http({
                url: $rootScope.serverAdd + '/edit/lecturers/student',
                method: 'POST',
                data: data
            })
        }

        function getAllFollowByInternshipTerm() {
            return $http({
                url: $rootScope.serverAdd + '/follow/internshipTerm',
                method: 'GET'
            })
        }

        function addScore(internId, score) {
            return $http({
                url: $rootScope.serverAdd + '/intern/' + internId + '/addscore',
                method: 'PUT',
                data: score
            })
        }

        function getAllFollow() {
            return $http({
                url: $rootScope.serverAdd + '/follows',
                method: 'GET'
            })
        }

        function addFollow(data, postId) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId + '/follownew',
                method: 'POST',
                data: data
            })
        }

        function getStudentNoInternshipTerm() {
            return $http({
                url: $rootScope.serverAdd + '/student/no/internshipTerm',
                method: 'GET'
            })
        }

        function getCountStudentNoFollow() {
            return $http({
                url: $rootScope.serverAdd + '/getCountStudentNoFollow',
                method: 'GET'
            })
        }

        function getAllStudentClass() {
            return $http({
                url: $rootScope.serverAdd + '/studentClass',
                method: 'GET'
            })
        }

        function LecturersAssignmentExcel(data) {
            return $http({
                url: $rootScope.serverAdd + '/lecturers/assignment/excel',
                method: 'POST',
                data: data
            })
        }

        function checkExcelLecturersAssignment(data) {
            return $http({
                url: $rootScope.serverAdd + '/student/check/lecturers/excel',
                method: 'POST',
                data: data
            })
        }

        function removeLecturers(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student' + studentId + '/remove/lecturers',
                method: 'POST'
            })
        }

        function getWaitInterviewFollow() {
            return $http({
                url: $rootScope.serverAdd + '/follow/waitInterview',
                method: 'GET'
            })
        }


        function getUserNameAndEmailVnu(startId) {
            return $http({
                url: $rootScope.serverAdd + '/getUserNameAndEmailVnu/' + startId,
                method: 'GET'
            })
        }

        function getStudentByStudentCode(studentCode) {
            return $http({
                url: $rootScope.serverAdd + '/student/studentCode',
                method: 'POST',
                data: studentCode
            })
        }

        function deleteStudent(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/delete/' + studentId,
                method: 'DELETE'
            })
        }

        function getAllStudent(page, size) {
            return $http({
                url: $rootScope.serverAdd + '/student/all?page=' + page + '&size=' + size,
                method: 'GET'
            })
        }

        function loadAllStudent() {
            return $http({
                url: $rootScope.serverAdd + '/student',
                method: 'GET'
            })
        }

        function infoBySchool() {
            return $http({
                url: $rootScope.serverAdd + '/infoBySchool',
                method: 'GET'
            })
        }

        function saveData(data, infoBySchoolId) {
            return $http({
                url: $rootScope.serverAdd + '/infoBySchool/' + infoBySchoolId,
                method: 'PUT',
                data: data
            })
        }

        function del(infoBySchoolId) {
            return $http({
                url: $rootScope.serverAdd + '/infoBySchool/' + infoBySchoolId,
                method: 'DELETE'
            })
        }

        function changeStatus(userId) {
            return $http({
                url: $rootScope.serverAdd + '/user/' + userId + '/status',
                method: 'PUT'
            })
        }

        function createStudent(data) {
            return $http({
                url: $rootScope.serverAdd + '/createStudent',
                method: 'POST',
                data: data
            })
        }
    }
}());