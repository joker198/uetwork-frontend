 (function(){
    'use strict';
    angular.module('services')
        .factory('searchService', searchService);

    searchService.$inject=['$log','$http','$q', '$rootScope'];

    function searchService($log,$http,$q,$rootScope){
        return {
            searchPartner: searchPartner,
            searchDescription: searchDescription,
            searchContent: searchContent,
            searchStudent: searchStudent
        };
        function searchPartner(data){
            return $http({
                url: $rootScope.serverAdd + '/searchPartner',
                method: 'POST',
                data: data
            })
        }

        function searchDescription(data){
            return $http({
                url: $rootScope.serverAdd + '/searchDescription',
                method: 'POST',
                data: data
            })
        }

        function searchContent(data){
            return $http({
                url: $rootScope.serverAdd + '/searchContent',
                method: 'POST',
                data: data
            })
        }

        function searchStudent(data){
            return $http({
                url: $rootScope.serverAdd + '/searchStudent',
                method: 'POST',
                data: data
            })
        }

    }
}());
