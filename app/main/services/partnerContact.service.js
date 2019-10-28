 
(function(){
    'use strict';
    angular.module('services')
        .factory('partnerContactService', partnerContactService);

    partnerContactService.$inject=['$log','$http','$q', '$rootScope'];

    function partnerContactService($log,$http,$q,$rootScope){
        return{
            loadContact: loadContact,
            createAContact: createAContact,
            editAContact: editAContact,
            deleteAContact: deleteAContact
        };

        function loadContact(partnerID){
            return $http({
                url: $rootScope.serverAdd + '/partner/'+partnerID+'/partnerContact',
                method: 'GET'
            })
        }

        function createAContact(partnerID,data){
            return $http({
                url: $rootScope.serverAdd + '/partner/'+partnerID+'/partnerContact',
                method: 'POST',
                data: data
            })
        }

        function editAContact(partnerContactId,data){
            return $http({
                url: $rootScope.serverAdd + '/partnerContact/'+partnerContactId,
                method: 'PUT',
                data: data
            })
        }

        function deleteAContact(partnerContactId){
            return $http({
                url: $rootScope.serverAdd + '/partnerContact/'+partnerContactId,
                method: 'DELETE'
            })
        }
    }

}());
