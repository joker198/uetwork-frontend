(function() {
    'use strict';
    angular.module('services')
        .factory('partnerService', partnerService);

    partnerService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function partnerService($log, $http, $q, $rootScope) {
        return {
            loadAllPartner: loadAllPartner,
            createPartner: createPartner,
            editPartner: editPartner,
            loadPartnerContact: loadPartnerContact,
            loadAllPartnerPost: loadAllPartnerPost,
            loadPost: loadPost,
            getFollowOfPost: getFollowOfPost,
            changePostStatus: changePostStatus,
            loadPartner: loadPartner,
            loadAllPost: loadAllPost,
            createPost: createPost,
            editPost: editPost,
            deletePost: deletePost,
            loadLatestPost: loadLatestPost,
            loadAllPostByInternshipTerm: loadAllPostByInternshipTerm,
            getAllFollows: getAllFollows,
            deletePartner: deletePartner,
            getPartnerNameAndId: getPartnerNameAndId,
            createPartnerContact: createPartnerContact,
            deletePartnerContact: deletePartnerContact,
            getOtherPartner : getOtherPartner,
            getFitPartner : getFitPartner,
            editPartnerContact : editPartnerContact,
            getAllWaitpartner: getAllWaitpartner,
            acceptPartner: acceptPartner,
            findPartnerByContactID: findPartnerByContactID,
            findPartnerByPostID: findPartnerByPostID,
            createRecruitList: createRecruitList,
            getAcceptedPartner: getAcceptedPartner,
            getWaitRecruitPartner: getWaitRecruitPartner,
            getValidTerms: getValidTerms,
            getAcceptedRecruitPartner: getAcceptedRecruitPartner
        };

        function createRecruitList(recruitListInfo) {
            return $http({
                url: $rootScope.serverAdd + "/partner-term",
                method: 'POST',
                data: recruitListInfo
            });
        }
        function getWaitRecruitPartner(termId) {
            return $http({
                url: $rootScope.serverAdd + "/pit/"+termId+"/waits",
                method: 'GET'
            });
        }
        function getValidTerms() {
            return $http({
                url: $rootScope.serverAdd + "/validTerms",
                method: 'GET'
            });
        }

        function getAcceptedRecruitPartner(termId) {
            return $http({
                url: $rootScope.serverAdd + "/pit/"+termId+"/partners",
                method: 'GET'
            });
        }

        function getAcceptedPartner()
        {
            return $http({
                url: $rootScope.serverAdd + "/partner/accepted",
                method: 'GET'
            });
        }
        function findPartnerByPostID(postId) {
            return $http({
                url: $rootScope.serverAdd + "/post/get/partner/" + postId,
                method: 'GET'
            });
        }

        function findPartnerByContactID(partnerContactId) {
            return $http({
                url: $rootScope.serverAdd + "/partnerContact/get/partner/" + partnerContactId,
                method: 'GET'
            })
        }

        function acceptPartner(data) {
            return $http({
                url: $rootScope.serverAdd + '/checkPartner',
                method: 'POST',
                data: data
            })
        }

        function getAllWaitpartner() {
            return $http({
                url: $rootScope.serverAdd + '/partner/wait',
                method: 'GET'
            })
        }

        function editPartnerContact(partnerContactId, data) {
            return $http({
                url: $rootScope.serverAdd + '/partnerContact/' + partnerContactId,
                method: 'PUT',
                data: data
            })
        }

        function getFitPartner() {
            return $http({
                url: $rootScope.serverAdd + '/partner/fit',
                method: 'GET'
            })
        }

        function getOtherPartner() {
            return $http({
                url: $rootScope.serverAdd + '/partner/other',
                method: 'GET'
            })
        }

        function deletePartnerContact(partnerContactId) {
            return $http({
                url: $rootScope.serverAdd + '/partnerContact/' + partnerContactId,
                method: 'DELETE'
            })
        }

        function createPartnerContact(partnerId, data) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/partnerContact',
                method: 'POST',
                data: data
            })
        }

        function getPartnerNameAndId(type) {
            return $http({
                url: $rootScope.serverAdd + '/partner/nameAndId/user/' + type,
                method: 'GET'
            })
        }

        function editPartner(partnerId, data) {
            return $http({
                url: $rootScope.serverAdd + '/partnerInfo/' + partnerId,
                method: 'PUT',
                data: data
            })
        }

        function deletePartner(partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/delete/' + partnerId,
                method: 'DELETE'
            })
        }


        function getAllFollows() {
            return $http({
                url: $rootScope.serverAdd + '/follows',
                method: 'GET'
            })
        }

        function loadAllPostByInternshipTerm(internshipTermId) {
            return $http({
                url: $rootScope.serverAdd + '/post/internshipTerm/' + internshipTermId,
                method: 'GET'
            })
        }

        function loadLatestPost(page, size, postType) {
            return $http({
                url: $rootScope.serverAdd + '/post/postType/' + postType + '?page=' + page + '&size=' + size,
                method: 'GET'
            })
        }

        function deletePost(postId) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId,
                method: 'DELETE'
            })
        }

        function editPost(postId, data) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId,
                method: 'PUT',
                data: data
            })
        }

        function createPost(partnerId, data) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/post',
                method: 'POST',
                data: data
            })
        }

        function loadPartner(partnerInfoId) {
            return $http({
                url: $rootScope.serverAdd + '/partnerInfo/' + partnerInfoId,
                method: 'GET'
            })
        }

        function loadAllPost(page, size, postType) {
            return $http({
                url: $rootScope.serverAdd + '/post',
                method: 'GET'
            })
        }

        function loadAllPartner() {
            return $http({
                url: $rootScope.serverAdd + '/partner',
                method: 'GET'
            })
        }

        function createPartner(data) {
            return $http({
                url: $rootScope.serverAdd + '/createAccount',
                method: 'POST',
                data: data
            })
        }

        function loadPartnerContact(partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/partnerContact',
                method: 'GET'
            })
        }

        function loadAllPartnerPost(partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/post',
                method: 'GET'
            })
        }

        function loadPost(postId) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId,
                method: 'GET'
            })
        }

        function getFollowOfPost(postId) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId + '/follow',
                method: 'GET'
            })
        }

        function changePostStatus(postId) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId + '/status',
                method: 'PUT'
            })
        }
    }
}());
