 (function(){
    'use strict';
    angular.module('services')
        .factory('internService', internService);

    internService.$inject=['$log','$http','$q', '$rootScope'];

    function internService($log,$http,$q,$rootScope){
        return {
            showIntern: showIntern,
            createMultiIntern: createMultiIntern,
            showAllInternOfPartner: showAllInternOfPartner,
            checkComment: checkComment,
            writeComment: writeComment,
            getTopComment: getTopComment,
            getAllInternship: getAllInternship,
            selectInternByPartnerId: selectInternByPartnerId,
            getCurrentInternshipOfInternshipTerm: getCurrentInternshipOfInternshipTerm,
            deleteInternship: deleteInternship,
            createInternship: createInternship
        };

        function createInternship() {
            return $http({
                url: $rootScope.serverAdd + '/internship',
                method: 'POST'
            })
        }

        function deleteInternship() {
            return $http({
                url: $rootScope.serverAdd + '/internship',
                method: 'DELETE'
            })
        }

        function getCurrentInternshipOfInternshipTerm() {
            return $http({
                url: $rootScope.serverAdd + '/internship',
                method: 'GET'
            })
        }

        function selectInternByPartnerId(partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/select/intern/' + partnerId,
                method: 'POST'
            })
        }

        function getAllInternship(){
            return $http({
                url: $rootScope.serverAdd + '/student/internship',
                method: 'GET'
            })
        }

        function writeComment(data, partnerId){
            return $http({
                url: $rootScope.serverAdd + '/writeComment/partner/' + partnerId,
                method: 'POST',
                data: data
            })
        }

        function getTopComment(){
            return $http({
                url: $rootScope.serverAdd + '/showTopComment',
                method: 'GET'
            })
        }

        function showAllInternOfPartner(partnerId){
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/internship',
                method: 'GET'
            })
        }

        function checkComment(studentId){
            return $http({
                url: $rootScope.serverAdd + '/student/' + studentId + '/checkComment',
                method: 'GET'
            })
        }

        function showIntern(internId){
            return $http({
                url: $rootScope.serverAdd + '/intern/' + internId,
                method: 'GET'
            })
        }

        function createMultiIntern(data){
            return $http({
                url: $rootScope.serverAdd + '/partner/createInternship',
                method: 'PUT',
                data: data
            })
        }
    }
}());