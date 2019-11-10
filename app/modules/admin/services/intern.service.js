 (function(){
    'use strict';
    angular.module('services')
        .factory('internService', internService);

    internService.$inject=['$log','$http','$q','$rootScope'];

    function internService($log,$http,$q,$rootScope){
        return {
            showAllIntern: showAllIntern,
            showIntern: showIntern,
            createIntern: createIntern,
            getPartner: getPartner,
            editIntern: editIntern,
            del: del,
            deleteIntern : deleteIntern,
            showAllInternOfPartner: showAllInternOfPartner,
            showAllCommentOfOnePartner : showAllCommentOfOnePartner,
            changeFilterValue : changeFilterValue,
            getAllInternshipTerm : getAllInternshipTerm,
            createInternshipTerm : createInternshipTerm,
            loadPostOfInternshipTerm : loadPostOfInternshipTerm,
            deleteInternshipTerm : deleteInternshipTerm,
            getAllInternshipByInternshipTerm : getAllInternshipByInternshipTerm,
            addLecturers : addLecturers,
            getInternOfLecturers : getInternOfLecturers,
            getNameAndIdOfPartners : getNameAndIdOfPartners,
            getNameAndIdOfLecturers : getNameAndIdOfLecturers,
            editInternshipTerm : editInternshipTerm,
            getAllStudentNoLecturers : getAllStudentNoLecturers,
            addLecturersStudent : addLecturersStudent,
            getAllStudentByInternshipTerm : getAllStudentByInternshipTerm,
            getAllStudentNoLecturersLastInternshipTerm : getAllStudentNoLecturersLastInternshipTerm
        };

        function getAllStudentNoLecturersLastInternshipTerm(){
            return $http({
                url: $rootScope.serverAdd + '/student/internshipTerm/no/lecturers',
                method: 'GET'
            })
        }

        function getAllStudentByInternshipTerm(internshipTermId){
            return $http({
                url: $rootScope.serverAdd + '/student/internshipTerm/' + internshipTermId,
                method: 'GET'
            })
        }

        function addLecturersStudent(data, lecturersId){
            return $http({
                url: $rootScope.serverAdd + '/student/add/lecturers/' + lecturersId,
                method: 'POST',
                data : data
            })
        }

        function getAllStudentNoLecturers(){
            return $http({
                url: $rootScope.serverAdd + '/student/no/lectutrers',
                method: 'GET'
            })
        }

        function editInternshipTerm(data){
            return $http({
                url: $rootScope.serverAdd + '/internshipTerm/edit',
                method: 'PUT',
                data : data
            })
        }

        function deleteIntern(internId){
            return $http({
                url: $rootScope.serverAdd + '/intern/' + internId,
                method: 'DELETE'
            })
        }

        function createIntern(data){
            return $http({
                url: $rootScope.serverAdd + '/intern/create',
                method: 'POST',
                data : data
            })
        }

        function getNameAndIdOfLecturers(){
            return $http({
                url: $rootScope.serverAdd + '/lecturers/nameAndId',
                method: 'GET'
            })
        }

        function getNameAndIdOfPartners(val){
            return $http({
                url: $rootScope.serverAdd + '/partner/nameAndId/user/' + val,
                method: 'GET'
            })
        }


        function getInternOfLecturers(lecturersId){
            return $http({
                url: $rootScope.serverAdd + '/lecturers/student',
                method: 'GET'
            })
        }

        function addLecturers(lecturersId, internId) {
            return $http({
                url: $rootScope.serverAdd + '/internship/add/lecturers/' + lecturersId + '/intern/' +internId,
                method: 'POST'
            })
        }

        function getAllInternshipByInternshipTerm(internshipTermId){
            return $http({
                url: $rootScope.serverAdd + '/intern/internshipTerm/' + internshipTermId,
                method: 'GET'
            })
        }

        function deleteInternshipTerm(internshipTermId){
            return $http({
                url: $rootScope.serverAdd + '/internshipTerm/' + internshipTermId + '/delete',
                method: 'DELETE'
            })
        }

        function loadPostOfInternshipTerm(internshipTermId){
            return $http({
                url: $rootScope.serverAdd + '/post/internshipTerm/' + internshipTermId,
                method: 'GET'
            })
        }

        function createInternshipTerm(data) {
            return $http({
                url: $rootScope.serverAdd + '/internshipTerm/create',
                method: 'POST',
                data: data
            })
        }

        function getAllInternshipTerm(){
            return $http({
                url: $rootScope.serverAdd + '/internshipTerm',
                method: 'GET'
            })
        }

        function showAllIntern(){
            return $http({
                url: $rootScope.serverAdd + '/intern',
                method: 'GET'
            })
        }

        function changeFilterValue(data, commentId){
            return $http({
                url: $rootScope.serverAdd + '/changeFilterValue/' + commentId,
                method: 'PUT',
                data: data
            })
        }

        function showAllCommentOfOnePartner(partnerId){
            return $http({
                url: $rootScope.serverAdd + '/showAllCommentOfOnePartner/' + partnerId,
                method: 'GET'
            })
        }

        function showAllInternOfPartner(partnerId){
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/internship',
                method: 'GET'
            })
        }

        function showIntern(internId){
            return $http({
                url: $rootScope.serverAdd + '/intern/' + internId,
                method: 'GET'
            })
        }

        function getPartner(){
            return $http({
                url: $rootScope.serverAdd + '/partner',
                method: 'GET'
            })
        }

        function editIntern(intern){
            return $http({
                url: $rootScope.serverAdd + '/intern/' + intern.id,
                method: 'PUT',
                data: intern
            })
        }

        function del(internId, studentId){
            return $http({
                url: $rootScope.serverAdd + '/intern/' + internId + '/' +studentId,
                method: 'DELETE'
            })
        }

    }
}());
