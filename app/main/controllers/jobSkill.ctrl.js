/**
 * Created by tuanvu on 8/14/2016.
 */

(function() {
    var app = angular.module("jobSkill", []);
    app.controller('jobSkillCtrl', ['$scope', 'jobSkillService', '$rootScope', '$route', '$window', '$cookies',
            function($scope, jobSkillService, $rootScope, $route, $window, $cookies) {
                $rootScope.loaduser = false;
                $scope.jobSkill = [];
                $scope.loadjobSkill = function() {
                    jobSkillService.loadjobSkill($cookies.get('studentId'))
                        .then(function(data) {
                                $scope.jobSkills = data.data;
                            },
                            function(error) {
                                console.log(error);
                                $scope.er = error;
                            });
                };

                $scope.creatjobSkill = function() {
                    $scope.request = {
                        company: $scope.company,
                        skill: $scope.skill,
                        studentId: $cookies.get('studentId')
                    };
                    jobSkillService.creatjobSkill($scope.request, $cookies.get('studentId'))
                        .then(function() {
                            $scope.company = '';
                            $scope.skill = '';
                            $scope.loadjobSkill();
                        })
                };

                $scope.editJobSkill = function(jobSkill) {
                    jobSkillService.editJobSkill(jobSkill, jobSkill.id)
                        .then(function() {}, function(error) {
                            alert('Sửa thông tin không thành công');
                            $scope.loadjobSkill();
                        })
                };

                $scope.deleteJobSkill_ = function(id) {
                    deleteUser = $window.confirm('Are you sure you want to delete the Ad?');
                    if (deleteUser) {
                        alert('Yes i want to delete');
                    }
                    jobSkillService.deleteJobSkill(id)
                        .then(function() {
                            $scope.loadjobSkill();
                        })
                }
            }
        ])
}());
