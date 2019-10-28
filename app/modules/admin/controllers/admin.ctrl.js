(function() {
    // var app = angular.module("myApp",[]);
    angular.module('myAdminApp')
        .controller('adminCtrl', ['$scope', '$rootScope', '$location', '$window', 'adminService',
            'loginAdService', 'filterFilter', '$http', '$timeout', 'md5', '$state', '$stateParams',
            function($scope, $rootScope, $location, $window, adminService, loginAdService,
                filterFilter, $http, $timeout, md5, $state, $stateParams) {
                $rootScope.serverAdd = "http://localhost:8180";
                $rootScope.clientAdd = "http://localhost:8000";
                $rootScope.sourceAdd = "http://localhost:9000";
                $rootScope.index = true; //sua thu la false xem nhu nao
                $rootScope.admin = false;
                $scope.response = [];
                $scope.socket = [];
                $scope.input = {};
                $scope.password = {};
                // console.log = function(){};

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
                    // console.log(element.target.parentNode);
                    var li = element.target.parentNode;
                    if (current == $state.current.name) {
                        $state.reload();
                        // li.classList.add("active");
                    }
                }

                $scope.entry = '';
                $scope.paginate = function() {
                    // console.log($scope.entry);
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



                $scope.redirectToSearchUser = function() {
                    if ($scope.input.userName != undefined && $scope.input.userName != null && $scope.input.userName != "") {
                        $rootScope.previousUserPage = $stateParams.page;
                        $stateParams.userName = $scope.input.userName;
                        $state.go('/user/search/username=:userName', { userName: $scope.input.userName });
                        // $state.reload();
                    }
                    console.log($stateParams.userName);
                }

                $scope.selectUser = function(user) {
                    $scope.selectedUser = user;
                }

                $scope.searchUser = function(userName) {
                    console.log(userName);
                    if(userName != undefined){
                        $state.transitionTo('/user/search/username=:userName', { userName: userName }, { location: true, notify: false });
                        $stateParams.userName = userName;
                    }
                    console.log($stateParams.userName);
                    // $state.transitionTo('/post/page=:page', { page: 1 }, { location: true, notify: false });
                    if ($stateParams.userName != undefined && $stateParams.userName != null && $stateParams.userName != "") {
                        $scope.searchString = $stateParams.userName;
                        adminService.searchUser($stateParams.userName)
                            .then(function(response) {
                                console.log(response.data);
                                $scope.allUsers = response.data;
                                $scope.mess = 'Tìm thấy ' + $scope.allUsers.length + ' kết quả cho: "' + $stateParams.userName + '"';

                                // console.log($scope.previousPage);
                                // console.log($scope.pages);
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
                                console.log(response);
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }

                $scope.getAllUser = function() {
                    if (isNaN(parseInt($stateParams.page))) {
                        $stateParams.page = 1;
                    }
                    console.log($stateParams.page)
                    adminService.getAllUser($stateParams.page - 1, 50)
                        .then(function(response) {
                            console.log(response);
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
                                // console.log(i);                                
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
                            // console.log($scope.previousPage);
                            // console.log($scope.pages);
                            console.log(response.data);
                        }, function(error) {
                            console.log(error);
                        })
                }

                // var input = document.getElementById("input-search-user");

                // // Execute a function when the user releases a key on the keyboard
                // input.addEventListener("keyup", function(event) {
                //     // Cancel the default action, if needed
                //     event.preventDefault();
                //     // Number 13 is the "Enter" key on the keyboard
                //     if (event.keyCode === 13) {
                //         // Trigger the button element with a click
                //         document.getElementById("btn-search-user").click();
                //     }
                // });

                $scope.reconnect = function() {
                    setTimeout($scope.initSockets, 10000);
                };
                $scope.initSockets = function() {
                    $scope.socket.client = new SockJS($rootScope.serverAdd + '/uet');
                    $scope.socket.stomp = Stomp.over($scope.socket.client);
                    $scope.socket.stomp.connect({}, function() {
                        $scope.socket.stomp.subscribe("/user/" + sessionStorage['username'] + "/**", function(message) {
                            $scope.response = JSON.parse(message.body);
                            console.log($rootScope.currentPageName);
                            if ($rootScope.currentPageName == '/inbox') {
                                console.log($rootScope.selectedMessage);
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
                                            console.log("31");
                                            var index = $rootScope.messages.findIndex(x => x.id === $scope.response.parentId);
                                            if (index != -1) {
                                                console.log("34");
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
                                        console.log("34");
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
                                    console.log("34");
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
                            // $rootScope.$apply();
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
                    console.log(window.location.href);
                    if (window.location.href.indexOf('lecturers') != -1) {
                        window.location.href = 'login/lecturers';
                    } else if (window.location.href.indexOf('admin') != -1) {
                        window.location.href = 'login/admin';
                    }
                    // window.location.href = 'ad/login';
                }

                // alert($rootScope.loggedIn);
                // console.log(sessionStorage['role']);
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
                            // console.log(error.data);
                            sessionStorage.clear();
                            $window.location.href = $rootScope.clientAdd + '/admin';
                        })
                }

                $scope.getAllNotification = function() {
                    adminService.getAllNotification()
                        .then(function(response) {
                            console.log(response);
                            $rootScope.AllNotifications = response.data;
                        }, function(error) {
                            console.log(error);
                        });
                }

                $scope.changePassUser = function(user) {
                    console.log(user)
                    if (user != undefined) {
                        console.log($scope.password);
                        if ($scope.password.newPassword != undefined) {
                            $scope.password.newPassword = md5.createHash($scope.password.newPassword || '');
                            // $scope.password.oldPassword = md5.createHash($scope.password.oldPassword || '');
                            $scope.password.userId = user.id;
                            adminService.changePassword($scope.password)
                                .then(function(response) {
                                    $scope.alertSuccess("Đổi mật khẩu thành công!", "");
                                    // $scope.password = {};
                                }, function(error) {
                                    $scope.alertDanger(error.data.message, "");
                                    $scope.password = {};
                                })
                            // infoService.changePass($scope.password)
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
                                // $scope.password = {};
                            }, function(error) {
                                $scope.alertDanger(error.data.message, "");
                                $scope.password = {};
                            })
                        // infoService.changePass($scope.password)
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
                            // 
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