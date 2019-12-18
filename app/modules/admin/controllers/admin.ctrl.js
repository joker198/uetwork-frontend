(function() {
    angular.module('myAdminApp')
        .controller('adminCtrl', ['$scope', '$rootScope', '$location', '$window', 'adminService',
            'loginAdService', 'filterFilter', '$http', '$timeout', 'md5', '$state', '$stateParams',
            function($scope, $rootScope, $location, $window, adminService, loginAdService,
                filterFilter, $http, $timeout, md5, $state, $stateParams) {
                $rootScope.serverAdd = "http://192.168.0.100:8180";
                $rootScope.clientAdd = "http://192.168.0.210:8000";
                $rootScope.sourceAdd = "http://192.168.0.210:9000";
                $rootScope.index = true; //sua thu la false xem nhu nao
                $rootScope.admin = true;
                $scope.response = [];
                $scope.socket = [];
                $scope.input = {};
                $scope.password = {};

                $scope.isLoading = function() {
                    return $http.pendingRequests.length > 0;
                };

                $scope.$watch($scope.isLoading, function(v) {
                    if (v) {
                        NProgress.start();
                    } else {
                        NProgress.done();
                    }
                });
                $(document).ready(function() {
                    $('.ui-pnotify').remove();
                });

                $rootScope.reloadState = function(current, element) {
                    var li = element.target.parentNode;
                    if (current == $state.current.name) {
                        $state.reload();
                    }
                }

                $scope.entry = '';
                $scope.paginate = function() {
                    if ($scope.entry != '') {
                        if ($scope.entry > $scope.totalItems) {
                            $scope.entryLimit = $scope.totalItems;
                        } else {
                            $scope.entryLimit = $scope.entry;
                        }
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                    } else {
                        $scope.entryLimit = 25;
                        if ($scope.entryLimit > $scope.totalItems) {
                            $scope.entryLimit = $scope.totalItems;
                        }
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                    }
                }

                $scope.getGradeLevel = function() {
                    adminService.getGradeLevel()
                        .then(function (response) {
                            $scope.gradeLevels = response.data;
                        }, function (error) {
                            console.log(error);
                        });
                }

                $scope.createGradeLevel = function() {
                    adminService.createGradeLevel($scope.gradelevel)
                        .then(function (response) {
                            $scope.gradelevel.code = "";
                            $scope.gradelevel.short_name = "";
                            $scope.gradeLevels = response.data;
                            $('#create-grade-level').trigger('click');
                        }, function (error) {
                            console.log(error);
                        });
                }
                $scope.confirmDeleteGradeLevel = function(gradeLevelId, shortName) {
                    $scope.delGradeLevelId = gradeLevelId;
                    $scope.shortName = shortName;
                }
                $scope.deleteGradeLevel = function(gradeLevelId) {
                    adminService.deleteGradeLevel(gradeLevelId)
                        .then(function (response) {
                            $scope.gradeLevels = response.data;
                            $('#x-del-grade-level').trigger('click');
                        }, function (error) {
                            console.log(error);
                        })
                }

                $scope.redirectToSearchUser = function() {
                    if ($scope.input.userName != undefined && $scope.input.userName != null && $scope.input.userName != "") {
                        $rootScope.previousUserPage = $stateParams.page;
                        $stateParams.userName = $scope.input.userName;
                        $state.go('/user/search/username=:userName', { userName: $scope.input.userName });
                    }
                }

                $scope.selectUser = function(user) {
                    $scope.selectedUser = user;
                }

                $scope.searchUser = function(userName) {
                    if(userName != undefined){
                        $state.transitionTo('/user/search/username=:userName', { userName: userName }, { location: true, notify: false });
                        $stateParams.userName = userName;
                    }
                    if ($stateParams.userName != undefined && $stateParams.userName != null && $stateParams.userName != "") {
                        $scope.searchString = $stateParams.userName;
                        adminService.searchUser($stateParams.userName)
                            .then(function(response) {
                                $scope.allUsers = response.data;
                                $scope.mess = 'Tìm thấy ' + $scope.allUsers.length + ' kết quả cho: "' + $stateParams.userName + '"';
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }

                $scope.getStudentInformationByUserId = function(userId) {
                    if (userId != undefined && userId != null) {
                        adminService.getStudentInformationByUserId(userId)
                            .then(function(response) {
                                $scope.studentInformationModal = response.data;
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }

                $scope.getUserInfo = function(userId) {
                    if (userId != undefined && userId != null) {
                        adminService.getUserInfo(userId)
                            .then(function(response) {
                                $scope.userRole = response.data.role;
                                if ($scope.userRole == 'STUDENT') {
                                    $scope.studentInfo = response.data.studentInfo;
                                    $scope.internshipInfos = response.data.internshipInfo;
                                } else if ($scope.userRole == 'LECTURERS') {
                                    $scope.lecturerInfo = response.data.lecturerInfo;
                                } else if ($scope.userRole == 'VIP_PARTNER') {
                                    $scope.partnerInfo = response.data.partnerInfo;
                                }
                            }, function(error) {
                                console.log(error);
                            });
                    }
                }
                $scope.getAllUser = function() {
                    if (isNaN(parseInt($stateParams.page))) {
                        $stateParams.page = 1;
                    }
                    adminService.getAllUser($stateParams.page - 1, 10)
                        .then(function(response) {
                            $scope.allUsers = response.data.content;
                            $scope.pages = [];
                            var page = response.data.totalPages;
                            for (var i = 1; i <= page; i++) {
                                if (i == $stateParams.page) {
                                    $scope.pages[i] = {
                                        page: i,
                                        class: "active"
                                    };
                                } else {
                                    $scope.pages[i] = {
                                        page: i,
                                        class: ""
                                    };
                                }
                                if ($stateParams.page == page) {
                                    $scope.nextPage = {
                                        class: "disabled",
                                        page: page
                                    };
                                } else {
                                    $scope.nextPage = {
                                        class: "",
                                        page: parseInt($stateParams.page) + 1
                                    };
                                }
                                if ($stateParams.page == 1) {
                                    $scope.previousPage = {
                                        class: "disabled",
                                        page: 1
                                    };
                                } else {
                                    $scope.previousPage = {
                                        class: "",
                                        page: $stateParams.page - 1
                                    };
                                }
                            }
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.reconnect = function() {
                    setTimeout($scope.initSockets, 10000);
                };
                $scope.initSockets = function() {
                    $scope.socket.client = new SockJS($rootScope.serverAdd + '/uet');
                    $scope.socket.stomp = Stomp.over($scope.socket.client);
                    $scope.socket.stomp.connect({}, function() {
                        $scope.socket.stomp.subscribe("/user/" + sessionStorage['username'] + "/**", function(message) {
                            $scope.response = JSON.parse(message.body);
                            if ($rootScope.currentPageName == '/inbox') {
                                if ($rootScope.selectedMessage != undefined) {
                                    if ($scope.response.parentId == $rootScope.selectedMessage.id) {
                                        $rootScope.selectedMessage.messages.push($scope.response);
                                        $rootScope.selectedMessage.lastUpdated = $scope.response.sendDate;
                                        $rootScope.markMessageAsSeen($scope.response.parentId);
                                    } else if ($scope.response.parentId != $rootScope.selectedMessage.id) {
                                        if ($rootScope.selectedMessage.messages != null) {
                                            if ($scope.response.parentId == $rootScope.selectedMessage.messages[0].id) {
                                                $rootScope.selectedMessage.messages.push($scope.response);
                                                $rootScope.selectedMessage.lastUpdated = $scope.response.sendDate;
                                                $rootScope.markMessageAsSeen($scope.response.parentId);
                                            }
                                        } else {
                                            var index = $rootScope.messages.findIndex(x => x.id === $scope.response.parentId);
                                            if (index != -1) {
                                                $rootScope.messages[index].status = 'NEW';
                                                if ($rootScope.messages[index].messageType == 'Normal') {
                                                    $rootScope.messages[index].messages.push($scope.response);
                                                    $rootScope.messages[index].lastUpdated = $scope.response.sendDate;
                                                }
                                            } else {
                                                $rootScope.messages.push($scope.response);
                                            }
                                        }

                                    }
                                } else {
                                    var index = $rootScope.messages.findIndex(x => x.id === $scope.response.parentId);
                                    if (index != -1) {
                                        $rootScope.messages[index].status = 'NEW';
                                        if ($rootScope.messages[index].messageType == 'Normal') {
                                            $rootScope.messages[index].messages.push($scope.response);
                                            $rootScope.messages[index].lastUpdated = $scope.response.sendDate;
                                        }
                                    } else {
                                        $rootScope.messages.push($scope.response);
                                    }
                                }
                                $rootScope.$apply();
                            } else {
                                var index = $rootScope.messages.findIndex(x => x.id === $scope.response.parentId);
                                if (index != -1) {
                                    $rootScope.messages[index].status = 'NEW';
                                    if ($rootScope.messages[index].messageType == 'Normal') {
                                        $rootScope.messages[index].messages.push($scope.response);
                                        $rootScope.messages[index].lastUpdated = $scope.response.sendDate;
                                    }
                                } else {
                                    $rootScope.messages.push($scope.response);
                                }
                                $rootScope.$apply();
                            }
                        });
                    });
                    $scope.socket.client.onclose = $scope.reconnect;
                };

                if (sessionStorage['Admin-Data']) {
                    $rootScope.loggedIn = true;
                    $rootScope.role = sessionStorage['role'];
                    $rootScope.username = sessionStorage['userName'];

                    if ($rootScope.role == 'LECTURERS') {
                        $location.path('/inbox');
                        $rootScope.lecturersId = sessionStorage['lecturersId'];
                        $scope.initSockets();
                    }
                } else {
                    if (window.location.href.indexOf('lecturers') != -1) {
                        window.location.href = 'login/lecturers';
                    } else if (window.location.href.indexOf('admin') != -1) {
                        window.location.href = 'login/admin';
                    }
                }

                $scope.logout = function() {
                    loginAdService.logout()
                        .then(function() {
                            if ($rootScope.role == 'LECTURERS') {
                                sessionStorage.clear();
                                $window.location.href = $rootScope.clientAdd + '/lecturers';
                            } else if ($rootScope.role == 'ADMIN') {
                                sessionStorage.clear();
                                $window.location.href = $rootScope.clientAdd + '/admin';
                            }
                        }, function(error) {
                            sessionStorage.clear();
                            $window.location.href = $rootScope.clientAdd + '/admin';
                        })
                }

                $scope.getAllNotification = function() {
                    adminService.getAllNotification()
                        .then(function(response) {
                            $rootScope.AllNotifications = response.data;
                        }, function(error) {
                            console.log(error);
                        });
                }

                $scope.changePassUser = function(user) {
                    if (user != undefined) {
                        if ($scope.password.newPassword != undefined) {
                            $scope.password.newPassword = md5.createHash($scope.password.newPassword || '');
                            $scope.password.userId = user.id;
                            adminService.changePassword($scope.password)
                                .then(function(response) {
                                    $scope.alertSuccess("Đổi mật khẩu thành công!", "");
                                }, function(error) {
                                    $scope.alertDanger(error.data.message, "");
                                    $scope.password = {};
                                })
                            $('#close_modal_reset_password').trigger('click');
                            $scope.password = {};

                        }
                    }


                }

                $scope.changePass = function(user) {
                    if ($scope.password.newPassword != null && $scope.password.newPassword != undefined &&
                        $scope.password.oldPassword != null && $scope.password.oldPassword != undefined) {
                        $scope.password.newPassword = md5.createHash($scope.password.newPassword || '');
                        $scope.password.oldPassword = md5.createHash($scope.password.oldPassword || '');
                        adminService.changePassword($scope.password)
                            .then(function(response) {
                                $scope.alertSuccess("Đổi mật khẩu thành công!", "successdelete_edit");
                            }, function(error) {
                                $scope.alertDanger(error.data.message, "");
                                $scope.password = {};
                            })
                        $scope.password = {};

                    }

                }

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
