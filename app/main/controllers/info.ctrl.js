(function() {
    var app = angular.module("info", []);

    app.controller('infoCtrl', ['$timeout', 'md5', '$scope', 'infoService', 'jobSkillService', '$stateParams', '$rootScope', '$route', '$window', '$location', '$cookies', '$state',
        function($timeout, md5, $scope, infoService, jobSkillService, $stateParams, $rootScope, $route, $window, $location, $cookies, $state) {
            $scope.studentInfoBySchool = [];
            $scope.file = [];
            $scope.taby = { tab: 'tab1' };
            $rootScope.loaduser = false;
            $rootScope.info = true;
            $scope.image = false;
            $scope.myImage = '';
            $scope.myCroppedImage = '';
            $scope.message = {};
            $rootScope.currentPage = $state.current.name;
            $scope.grade = false;
            $scope.studentClass = false;
            var handleFileSelect = function(evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function(evt) {
                    $scope.$apply(function($scope) {
                        $scope.myImage = evt.target.result;
                    });
                };
                $scope.image = true
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

            $scope.getAllStudentClass = function() {
                infoService.getAllStudentClass()
                    .then(function(response) {
                        $scope.allStudentClass = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.changePass = function() {
                $scope.password.newPassword = md5.createHash($scope.password.newPassword || '');
                $scope.password.oldPassword = md5.createHash($scope.password.oldPassword || '');
                infoService.changePass($scope.password)
                    .then(function(response) {
                        $scope.alertSuccess("Change password success!", "");
                        $scope.password = {};
                    }, function(error) {
                        $scope.alertDanger(error.data.message, "");
                        $scope.password = {};
                    })
            }


            $scope.createPassInterviewLink = function(studentId) {
                infoService.createPassInterviewLink(studentId)
                    .then(function(response) {
                        $scope.comfirmationLink = $rootScope.clientAdd + "/#/comfirmationLink/" + response.data.comfirmationLink;
                        $scope.link = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.sendMessage = function(receiverId) {
                if ($scope.message.content != undefined) {
                    $scope.message.receiverRole = "STUDENT";
                    $scope.message.senderRole = "VIP_PARTNER";
                    $scope.message.receiverId = receiverId;
                    $scope.message.senderId = $cookies.get('partnerID');
                    $scope.message.senderName = $rootScope.username;
                    infoService.createMessage($scope.message)
                        .then(function() {
                            alert("ok");
                        }, function(error) {
                            console.log(error);
                        })
                }
            }

            $scope.getStudentInfo = function() {
                if ($rootScope.studentInfo == undefined) {
                    infoService.getStudentInfo()
                        .then(function(response) {
                            $rootScope.studentInfo = response.data;
                            $rootScope.studentInfo.infoBySchool.grade = parseInt($rootScope.studentInfo.infoBySchool.grade);
                        })
                }
            }

            $scope.changeAva = function() {
                $scope.req = {
                    id: $cookies.get('studentInfoId'),
                    avatar: $scope.myCroppedImage.replace(/^data:image\/(png|jpeg);base64,/, "")
                };
                infoService.changeAva($scope.req)
                    .then(function() {
                        $scope.pic = true;
                        $scope.info.avatar = "";
                        window.location.reload();
                    }, function(error) {
                        console.log(error);
                    });
            };

            /* edit */
            $scope.editInfo = function() {
                $scope.info.avatar = "";
                $scope.requset = {};
                $scope.requset.studentClass = $rootScope.studentInfo.infoBySchool.studentClass;
                $scope.requset.grade = $rootScope.studentInfo.infoBySchool.grade;
                if ($scope.grade == true || $scope.studentClass == true) {
                    infoService.editInfoBySchool($scope.requset)
                        .then(function() {
                            $scope.alertSuccess("Succcess", "");
                            $rootScope.studentInfo = undefined;
                            $scope.getStudentInfo();
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }
                if ($scope.changeInfo == true) {
                    infoService.editInfo($rootScope.studentInfo)
                        .then(function() {
                            $scope.alertSuccess("Succcess", "");
                        }, function(error) {
                            $scope.alertDanger("Error", "");
                        });
                }
            };
            /* load student */
            $scope.loadStudent = function(id) {
                infoService.loadStudent(id)
                    .then(function(response) {
                            $scope.student = response.data;
                            if ($scope.student.internship == null) {
                                $scope.showIntern = false;
                            } else {
                                $scope.showIntern = true;
                            }
                            infoService.loadInfoBySchoolByStudentId(id)
                                .then(function(response) {
                                    $scope.student.infoBySchool = response.data;
                                }, function(error) {
                                    console.log(error);
                                });
                            jobSkillService.loadjobSkill(id)
                                .then(function(response) {
                                    $scope.student.jobSkills = response.data;
                                }, function(error) {
                                    console.log(error);
                                })
                            if ($scope.student.jobSkills != null) {
                                angular.forEach($scope.student.jobSkills, function(jobSkill) {
                                    jobSkill.tab = jobSkill.id + "_" + jobSkill.studentId;
                                })
                            }
                        },
                        function(error) {
                            $scope.error = error;
                        })
            };
            $scope.hideTab = function() {
                $scope.show = false
            }
            $scope.showTab = function() {
                $scope.show = true;
            }

            var init = function() {
                if ($stateParams.idStudent) {
                    $scope.studentSelected = $stateParams.idStudent;
                }
            };
            init();

            $scope.alertDanger = function(error, danger) {
                $scope.errorMessage = error;
                if (danger == 'danger') {
                    $scope.danger_edit = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.danger_edit = false;
                        });
                    }, 6000);
                } else {
                    $scope.danger = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.danger = false;
                            $scope.errorMessage = "";
                        });
                    }, 6000);
                }
            }

            $scope.alertSuccess = function(string, success) {
                $scope.successMessage = string;
                if (success == 'successdelete_edit') {
                    $scope.successdelete_edit = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.successdelete_edit = false;
                        });
                    }, 3000);
                } else {
                    $scope.success = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.success = false;
                        });
                    }, 3000);
                }

            }
        }
    ])
}());
