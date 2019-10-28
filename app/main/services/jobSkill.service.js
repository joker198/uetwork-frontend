 (function () {
    'use strict';

    angular.module('services')
        .factory('jobSkillService',jobSkillService);

    jobSkillService.$inject = ['$log', '$http', '$q','$rootScope'];

    function jobSkillService($log, $http, $q,$rootScope) {
        return{
            loadjobSkill: loadjobSkill,
            creatjobSkill: creatjobSkill,
            editJobSkill: editJobSkill,
            deleteJobSkill: deleteJobSkill
        };
        function loadjobSkill(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/' + studentId + '/jobSkill',
                method: 'GET'
            })
        }

        function creatjobSkill(data, studentId){
            return $http({
                url: $rootScope.serverAdd + '/student/'+studentId+'/jobSkill',
                method: 'POST',
                data: data
            })
        }

        function editJobSkill(data, jobSkillId){
            return $http({
                url: $rootScope.serverAdd + '/jobSkill/'+jobSkillId,
                method: 'PUT',
                data: data
            })
        }
        
        function deleteJobSkill(jobSkillId){
            return $http({
                url: $rootScope.serverAdd + '/jobSkill/'+jobSkillId,
                method: 'DELETE'
            })
        }
    }
}());
