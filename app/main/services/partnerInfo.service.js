 
(function(){
    'use strict';
    angular.module('services')
        .factory('partnerInfoService', partnerInfoService);

    partnerInfoService.$inject=['$log','$http','$q', '$rootScope'];

    function partnerInfoService($log,$http,$q,$rootScope){
        return{
            loadPartnerInfo : loadPartnerInfo,
            editPartnerInfo : editPartnerInfo,
            deletePartnerInfo : deletePartnerInfo,
            changeLogo: changeLogo,
            getPartnerLogo: getPartnerLogo
        };

        function loadPartnerInfo(partnerInfoId){
            return $http({
                url:$rootScope.serverAdd + '/partner/'+partnerInfoId,
                method: 'GET'
            })
        }

        function editPartnerInfo(partnerInfoId,data){
            return $http({
                url:$rootScope.serverAdd + '/partnerInfo/'+partnerInfoId,
                method: 'PUT',
                data: data
            })
        }

        function deletePartnerInfo(partnerID){
            return $http({
                url:$rootScope.serverAdd + '/partner/'+partnerID+'/partnerInfo',
                method: 'DELETE'
            })
        }

        function changeLogo(data){
            return $http({
                url:$rootScope.serverAdd + '/changeLogo',
                method: 'PUT',
                data: data
            })
        }

        function getPartnerLogo(){
            return $http({
                url:$rootScope.serverAdd + '/partnerLogo',
                method: 'GET'
            })
        }
    }
    
}());
