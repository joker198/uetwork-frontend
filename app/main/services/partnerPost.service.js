(function() {
    'use strict';
    angular.module('services')
        .factory('partnerPostService', partnerPostService);

    partnerPostService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function partnerPostService($log, $http, $q, $rootScope) {
        return {
            loadPost: loadPost,
            createAPost: createAPost,
            editAPost: editAPost,
            deleteAPost: deleteAPost,
            showAPost: showAPost,
            uploadImg: uploadImg,
            getAllPost: getAllPost,
            follow: follow,
            unfollow: unfollow,
            checkFollow: checkFollow,
            showFollowedPost: showFollowedPost,
            showListFollower: showListFollower,
            loadLatestPost: loadLatestPost,
            loadAllHashtag: loadAllHashtag,
            getNameAndIdOfLecturers: getNameAndIdOfLecturers,
            followResearch: followResearch,
            getPartnerNameAndIdOfOtherPartner: getPartnerNameAndIdOfOtherPartner,
            registerPartner: registerPartner,
            getPartnerNameAndIdOfFitPartner: getPartnerNameAndIdOfFitPartner
        };

        function registerPartner(data) {
            return $http({
                url: $rootScope.serverAdd + '/addFollowByStudent',
                method: 'POST',
                data: data
            })
        }

        function getPartnerNameAndIdOfFitPartner() {
            return $http({
                url: $rootScope.serverAdd + '/partnerId/name/fit',
                method: 'GET'
            })
        }

        function getPartnerNameAndIdOfOtherPartner() {
            return $http({
                url: $rootScope.serverAdd + '/partnerId/name/other',
                method: 'GET'
            })
        }

        function followResearch(lecturersId) {
            return $http({
                url: $rootScope.serverAdd + '/follow/research/' + lecturersId,
                method: 'PUT'
            })
        }

        function getNameAndIdOfLecturers() {
            return $http({
                url: $rootScope.serverAdd + '/lecturers/nameAndId',
                method: 'GET'
            })
        }

        function getAllPost() {
            return $http({
                url: $rootScope.serverAdd + '/post',
                method: 'GET'
            })
        }

        function loadAllHashtag() {
            return $http({
                url: $rootScope.serverAdd + '/hashtag',
                method: 'GET'
            })
        }

        function loadPost(partnerID) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerID + '/post',
                method: 'GET'
            })
        }

        function createAPost(partnerID, data) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerID + '/post',
                method: 'POST',
                data: data
            })
        }

        function editAPost(postId, data) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId,
                method: 'PUT',
                data: data
            })
        }

        function deleteAPost(postId) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId,
                method: 'DELETE'
            })
        }

        function showAPost(PostId) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + PostId,
                method: 'GET'
            })
        }

        function uploadImg(partnerID, data) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerID + '/post/image',
                method: 'POST',
                data: data
            })
        }

        function follow(postId, data) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId + '/follow',
                method: 'PUT',
                data: data
            })
        }

        function unfollow(postId, studentId, data) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId + '/student/unfollow',
                method: 'DELETE',
                data: data
            })
        }

        function checkFollow(postId, data = {id: null}) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId + '/checkFollow',
                method: 'PUT',
                data, data
            })
        }

        function showFollowedPost(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/' + studentId + '/follow',
                method: 'GET'
            })
        }

        function showListFollower(postId) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId + '/follow',
                method: 'GET'
            })
        }

        function loadLatestPost(page, size, postType) {
            return $http({
                url: $rootScope.serverAdd + '/post/postType/' + postType + '?page=' + page + '&size=' + size,
                method: 'GET'
            })
        }
    }
}());
