"use strict";
angular.module("services", []);
angular.module("myAdminApp", [
        "loginAd",
        "ngRoute",
        "services",
        "student",
        "intern",
        'message',
        "partner",
        "ngSanitize",
        "notification",
        "ui.router",
        'ui.bootstrap',
        'summernote',
        'lecturers',
        'angular-md5'
    ])
    .config(["$locationProvider", "$routeProvider", "$stateProvider", "$urlRouterProvider",
        function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(false).hashPrefix("");
            if (sessionStorage["Admin-Data"] == null) {
                $routeProvider
                    .when("/login", {
                        templateUrl: "/modules/admin/views/loginAdmin/loginAdmin.html",
                        controller: "LoginAdCtrl"
                    }).otherwise({ redirectTo: "/login" });;
            } else {
                $urlRouterProvider.otherwise("/");
                if (sessionStorage['role'] == 'ADMIN') {
                    $stateProvider
                        .state("/", {
                            url: "/",
                            views: {
                                "notification": {
                                    templateUrl: "modules/admin/views/notification/notification.html",
                                    controller: "NotiCtrl"
                                }
                            }
                        })
                        .state("/user", {
                            url: "/user",
                            templateUrl: "modules/admin/views/user/user.all.html"
                        })
                        .state("/inbox", {
                            url: "/inbox",
                            templateUrl: "modules/admin/views/messages/inbox.html",
                            controller: "messageCtrl"
                        })
                        .state("/sent", {
                            url: "/sent",
                            templateUrl: "modules/admin/views/messages/write.message.html",
                            controller: "messageCtrl"
                        })
                        .state("/internship", {
                            url: "/internship",
                            templateUrl: "modules/admin/views/student/student.internship.html",
                            controller: "studentCtrl"
                        })
                        .state("/lecturers", {
                            url: "/lecturers",
                            templateUrl: "modules/admin/views/vnu/lecturers.html",
                            controller: "lecturersCtrl"
                        })
                        .state("/class", {
                            url: "/class",
                            templateUrl: "modules/admin/views/vnu/class.html",
                            controller: "lecturersCtrl"
                        })
                        .state("/student", {
                            url: "/student",
                            templateUrl: "modules/admin/views/student/info_.html",
                            controller: "studentCtrl"
                        })
                        .state("/registration-list", {
                            url: "/registration-list",
                            templateUrl: "modules/admin/views/student/follow.html",
                            controller: "studentCtrl"
                        })
                        .state("/registration-partner", {
                            url: "/registration-partner",
                            templateUrl: "modules/admin/views/partner/partner.registration.html",
                            controller: "partnerCtrl"
                        })
                        .state("/add-lecturers-student", {
                            url: "/add-lecturers-student",
                            templateUrl: "modules/admin/views/student/student.add.lecturers.html",
                            controller: "studentCtrl"
                        })
                        .state("/post/page=:page", {
                            url: "/post/page=:page",
                            templateUrl: "modules/admin/views/partner/partner.all.post.html",
                            controller: "partnerCtrl"
                        })
                        .state("/internship-term", {
                            url: "/internship-term",
                            templateUrl: "modules/admin/views/internship-term/internship-term.html",
                            controller: "studentCtrl"
                        })
                        .state("/internship-term/:year/:term/:internshipTermId/post", {
                            url: "/internship-term/:year/:term/:internshipTermId/post",
                            templateUrl: "modules/admin/views/partner/partner.all.post.html",
                            controller: "partnerCtrl"
                        })
                        .state("/internship-term/:year/:term/:internshipTermId/student", {
                            url: "/internship-term/:year/:term/:internshipTermId/student",
                            templateUrl: "modules/admin/views/student/student.internship.html",
                            controller: "studentCtrl"
                        })
                        .state("/insertStudent", {
                            url: "/insertStudent",
                            templateUrl: "modules/admin/views/student/insert.student.html",
                            controller: "studentCtrl"
                        })
                        .state("/student/edit", {
                            url: "/student/edit",
                            templateUrl: "modules/admin/views/student/info.edit.html",
                            controller: "studentCtrl"
                        })
                        .state("/fit-partner", {
                            url: "/fit-partner",
                            templateUrl: "modules/admin/views/partner/partner.all.html",
                            controller: "partnerCtrl"
                        })
                        .state("/other-partner", {
                            url: "/other-partner",
                            templateUrl: "modules/admin/views/partner/partner.all.html",
                            controller: "partnerCtrl"
                        })
                        .state("/partner/:partnerId/intern", {
                            url: "/partner/:partnerId/intern",
                            templateUrl: "modules/admin/views/partner/partner.intern.html",
                            controller: "studentCtrl"
                        })
                        .state("/partner/:partnerId", {
                            url: "/partner/:partnerId",
                            templateUrl: "modules/admin/views/partner/partner.html",
                            controller: "partnerCtrl"
                        })
                        .state("/partner/:partnerId/post", {
                            url: "/partner/:partnerId/post",
                            templateUrl: "modules/admin/views/partner/partner.post.html",
                            controller: "partnerCtrl"
                        })
                        .state("/post/:postId", {
                            url: "/post/:postId",
                            templateUrl: "modules/admin/views/partner/post.html",
                            controller: "partnerCtrl"
                        })
                        .state("/recruit-list/create", {
                            url:"/recruit-list/create",
                            templateUrl: "modules/admin/views/internship-term/create-recruit-list.html",
                            controller: "partnerCtrl"
                        });
                } else if (sessionStorage['role'] == 'LECTURERS') {
                    $stateProvider
                        .state("/", {
                            url: "/",
                            views: {
                                "notification": {
                                    templateUrl: "modules/admin/views/notification/notification.html",
                                    controller: "NotiCtrl"
                                }
                            }
                        })
                        .state("/inbox", {
                            url: "/inbox",
                            templateUrl: "modules/admin/views/messages/inbox.html",
                            controller: "messageCtrl"
                        })
                        .state("/internship", {
                            url: "/internship",
                            templateUrl: "modules/admin/views/student/student.internship.html",
                            controller: "studentCtrl"
                        });
                }
            }
        }
    ]).filter('startFrom', function() {
        return function(input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        };
    })
    .directive('pressEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
(function() {
    angular.module('myAdminApp')
        .controller('adminCtrl', ['$scope', '$rootScope', '$location', '$window', 'adminService', 'loginAdService',
            function($scope, $rootScope, $location, $window, adminService, loginAdService) {
                $rootScope.serverAdd = "http://localhost:8180";
                $rootScope.clientAdd = "http://localhost:8000";
                $rootScope.index = true; //sua thu la false xem nhu nao
                $rootScope.admin = false;
                $scope.response = [];
                $scope.socket = [];
                $(document).ready(function() {
                    $('.ui-pnotify').remove();
                });

                $scope.getAllUser = function(stateParams) {
                    if (stateParams != undefined) {
                        $state.transitionTo('/user/page=:page', { page: 1 }, { location: true, notify: false });
                        $stateParams.page = 1;
                    }
                    if ($stateParams.page) {
                        $scope.activePage = $stateParams.page;
                        adminService.getAllUser($stateParams.page - 1, 15)
                            .then(function(response) {
                                $scope.allPosts = response.data.content;
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

                    if ($rootScope.role == 'LECTURERS') {
                        $location.path('/inbox');
                        $rootScope.lecturersId = sessionStorage['lecturersId'];
                        $scope.initSockets();
                    }
                } else {
                    $rootScope.loggedIn = false;
                    $location.path('/admin/login');
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
            }
        ])
}());
//sau khi save intern thi khong thuc hien search intern dc nữa . chả hiểu vì sao
(function() {
    var app = angular.module("intern", []);
    app.controller('internCtrl', ['$scope', 'internService', 'studentService', 'infoService', '$rootScope', '$stateParams', 'lecturersService', '$window', '$location', '$timeout', 'filterFilter',
        function($scope, internService, studentService, infoService, $rootScope, $stateParams, lecturersService, $window, $location, $timeout, filterFilter) {
            $rootScope.currentPageName = $state.current.name;
            $rootScope.index = false;
            $scope.typing = false;
            $scope.showIntern = false;
            $scope.company = null;
            $scope.search = null;
            $scope.to_date = null;
            $scope.hideIntern = false;
            $scope.comments = [];
            $scope.showInput = false;
            $scope.input = {};
            $scope.intern = {};
            $scope.lecturers = {};

            $scope.deleteIntern = function(internId) {
                internService.deleteIntern(internId)
                    .then(function(response) {
                        $('#close_modal_delete_intern').trigger('click');
                        $scope.alertSuccess("Xóa internship thành công!", "");
                        $scope.getAllStudentByInternshipTerm();
                    }, function(error) {
                        $('#close_modal_delete_intern').trigger('click');
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.createInternship = function() {
                if ($scope.intern.partnerId == 'other') {
                    $scope.intern.partnerId = 0;
                }
                internService.createIntern($scope.intern)
                    .then(function(response) {
                        $scope.alertSuccess("Tạo internship thành công!", "");
                        $scope.intern = {};
                        $scope.getAllStudentByInternshipTerm();
                    }, function(error) {
                        $scope.alertDanger(error.data.message, "");
                    })
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

            $scope.getAllStudentNoLecturers = function() {
                internService.getAllStudentNoLecturers()
                    .then(function(response) {
                        $scope.allStudentNoLecturers = response.data;
                        $scope.totalItems = response.data.length;
                        $scope.currentPage = 1;
                        $scope.entryLimit = 25;
                        if ($scope.entryLimit > $scope.totalItems) {
                            $scope.entryLimit = $scope.totalItems;
                        }
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                        $scope.$watch('search', function(newVal, oldVal) {
                            $scope.filtered = filterFilter($scope.allStudentNoLecturers, newVal);
                            $scope.totalItems = $scope.filtered.length;
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                            $scope.currentPage = 1;
                        }, true);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getNameAndIdOfLecturers = function() {
                internService.getNameAndIdOfLecturers()
                    .then(function(response) {
                        $scope.nameAndIdOfLecturers = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getNameAndIdOfPartnersFit = function() {
                alert(1);
                internService.getNameAndIdOfPartners("true")
                    .then(function(response) {
                        $scope.nameAndIdPartnersFit = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getNameAndIdOfPartners = function() {
                internService.getNameAndIdOfPartners("false")
                    .then(function(response) {
                        $scope.nameAndIdPartners = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getInternOfLecturers = function() {
                internService.getInternOfLecturers($rootScope.lecturersId)
                    .then(function(response) {
                        $scope.allInterns = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.addLecturersStudent = function() {
                internService.addLecturersStudent($scope.listStudent, $scope.lecturers.lecturersId)
                    .then(function() {
                        $scope.alertSuccess("Thêm giảng viên thành công!", "");
                        $scope.getAllStudentNoLecturers();
                        $scope.listStudent = [];
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.getAllLecturers = function() {
                lecturersService.getAllLecturers()
                    .then(function(response) {
                        $scope.allLecturers = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }
            $scope.listStudent = [];

            $scope.addStudent = function(student) {
                if (student.checked == true) {
                    $scope.listStudent.push({
                        id: student.id,
                        studentName: student.fullName
                    })
                } else {
                    for (i = 0; i <= $scope.listStudent.length; i++) {

                        if (student.id == $scope.listStudent[i].id) {
                            var index = $scope.listStudent.indexOf($scope.listStudent[i])
                            $scope.listStudent.splice(index, 1);
                            break;
                        }
                    }

                }
            }

            $scope.removeStudent = function(index) {
                $scope.listStudent.splice(index, 1);
            }

            $scope.createListStudentToAddLecturers = function() {
                $scope.listStudent = [];
                angular.forEach($scope.allInterns, function(intern) {
                    if (intern.checked == true) {
                        $scope.listStudent.push({
                            id: intern.id,
                            studentName: intern.student.fullName
                        })
                    }
                });
                console.log($scope.listStudent);
            }

            $scope.getAllStudentByInternshipTerm = function(){
                internService.getAllStudentByInternshipTerm($stateParams.internshipTermId)
                .then(function(response){
                    $scope.allInterns = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllInternshipByInternshipTerm = function() {
                internService.getAllInternshipByInternshipTerm($stateParams.internshipTermId)
                    .then(function(response) {
                        $scope.allInterns = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.loadAllInternshipTermPost = function(internshipTermId) {
                internService.loadPostOfInternshipTerm(internshipTermId)
                    .then(function(response) {
                        $scope.allPosts = response.data;
                    }, function(error) {
                        console.log(error);
                    });
            }

            $scope.closePost = function() {
                $scope.show_post = false;
            };

            $scope.showPost = function(post) {
                $scope.show_post = true;
                $scope.post = post;
            };

            $scope.alertDate = function() {
                console.log($scope.input.startDate);
            }

            $scope.createInternshipTerm = function() {
                if ($scope.input.year != "" && $scope.input.startDate != "" && $scope.input.endDate != "") {
                    console.log($scope.input.startDate)
                    internService.createInternshipTerm($scope.input)
                        .then(function(response) {
                            $scope.alertSuccess("Tạo kì thực tập thành công!", "")
                            $scope.input.year = "";
                            $scope.input.endDate = "";
                            $scope.input.startDate = "";
                            $scope.getAllInternshipTerm();
                        }, function(error) {
                            $scope.alertDanger(error.message, "")
                        });
                }
            }

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];
            $scope.dateOptions = {
                // dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.open2 = function() {
                $scope.popup2 = {};
                $scope.popup2.opened = true;
            };

            $scope.editInternshipTerm = function(startDate, endDate, internshipTermId) {
                startDate = new Date();
                $('#internshipTerm_' + internshipTermId).val(startDate);
                var curr_date = startDate.getDate();
                var curr_month = startDate.getMonth() + 1; //Months are zero based
                var curr_year = startDate.getFullYear();
                startDate = curr_year + "-" + curr_month + "-" + curr_date;
            }

            $scope.saveEditinternshipTerm = function(internshipTerm) {
                internService.editInternshipTerm(internshipTerm)
                    .then(function() {
                        $scope.alertSuccess("Sửa kì thực tập thành công!", "");
                    }, function(error) {
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.getAllInternshipTerm = function() {
                internService.getAllInternshipTerm()
                    .then(function(response) {
                        $scope.allInternshipTerm = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.comfirmDelete = function(id) {
                $scope.comfirmDeleteId = id;
            }

            $scope.deleteInternshipTerm = function(id) {
                internService.deleteInternshipTerm(id)
                    .then(function() {
                        $('#close_modal_delete_internship_term').trigger('click');
                        $scope.alertSuccess("Xóa kì thực tập thành công!", "");
                        $scope.getAllInternshipTerm();
                    }, function(error) {
                        $('#close_modal_delete_internship_term').trigger('click');
                        $scope.alertDanger("Không thể xóa kì thực tập này!", "");
                    })
            }

            $scope.showInput_ = function(id, filterValue) {
                $scope.showInput = true;
                $('#' + id).after('<td><input  id="' + id + '_" type="text" value="' + filterValue + '">' + '</td>');
                $('#' + id).remove();
            };

            $scope.changeFilterValue = function(data) {
                $scope.request = {
                    filter: data.filter
                };
                internService.changeFilterValue($scope.request, data.id)
                    .then(function(response) {
                    }, function(error) {
                        alert("ko thanh cong");
                        console.log(error);
                    })
            };

            $scope.saveManyFilterValue = function() {
                angular.forEach($scope.comments, function(comment) {
                    $scope.changeFilterValue(comment);
                    comment.check = false;
                })
            };

            $scope.searchDate = function(data) {
                //
            };

            $scope.showComment = function(partnerid) {

                if ($scope.hideIntern == false) {
                    $scope.hideIntern = true;
                    internService.showAllCommentOfOnePartner(partnerid)
                        .then(function(response) {
                            $scope.comments = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                } else {
                    $scope.hideIntern = false;
                }

            };

            $scope.showAllInternOfPartner = function() {
                $scope.partnerId = $stateParams.partnerId;
                internService.showAllInternOfPartner($stateParams.partnerId)
                    .then(function(response) {
                        $scope.allInternOfPartner = response.data;
                        $scope.count = $scope.allInternOfPartner.length;
                        angular.forEach($scope.allInternOfPartner, function(intern) {
                            if ($scope.company == null) {
                                $scope.company = intern.company;
                            }
                            if ($scope.company == null) {
                                $scope.company = intern.company;
                            }
                            infoService.loadStudentInfo(intern.studentId)
                                .then(function(response) {
                                    intern.studentInfo = response.data;
                                })
                        })
                    }, function(error) {
                        console.log(error)
                    })
            };

            $scope.showAllIntern_ = function() {
                if ($scope.showIntern == false || $scope.saveIntern == true) {
                    $scope.showIntern = true;
                    $scope.saveIntern = false;
                    $scope.showIsIntern();
                } else {
                    $scope.showIntern = false;
                }
            };
            $scope.showNotIntern = function() {
                $scope.notIntern = [];
                studentService.loadAllStudent()
                    .then(function(data) {
                        $scope.allIntern = data.data;
                        angular.forEach($scope.allIntern, function(v) {
                            if (v.internship == null) {
                                $scope.notIntern.push(v);
                            }
                        })
                    })
            };
            $scope.showIsIntern = function() {
                $scope.isIntern = [];
                studentService.loadAllStudent()
                    .then(function(data) {
                            $scope.allIntern = data.data;
                            angular.forEach($scope.allIntern, function(v) {
                                if (v.internship != null) {
                                    v.checked = false;
                                    $scope.isIntern.push(v);
                                }
                            })
                        },
                        function() {
                            //
                        })
            };
            $scope.getPartner = function() {
                internService.getPartner()
                    .then(function(data) {
                        $scope.partner = data.data;
                    })
            };

            $scope.showPartner = function() {
                if ($scope.create.partnerName == '') {
                    $scope.partner = false;
                } else {
                    $scope.getPartner();
                    $scope.partner = true;
                }
            };

            $scope.choosePartner = function(partner) {
                $scope.create.partnerName = partner.partnerName; //sau khi chon MSSV co the hien thi la ten hoac MSSV, tinh sau
                $scope.create.partnerId = partner.id;
                $scope.partner = false;
            };

            $scope.chooseStudent = function(student) {
                $scope.create.infoBySchool.studentCode = student.infoBySchool.studentCode; //sau khi chon MSSV co the hien thi la ten hoac MSSV, tinh sau
                $scope.create.studentId = student.id;
                $scope.typing = false;
            };

            $scope.creatIntern = function() {
                $scope.request = {
                    partnerId: $scope.create.partnerId,
                    company: $scope.create.partnerName,
                    startDate: $scope.create.startDate,
                    endDate: $scope.create.endDate,
                    supervisor: $scope.create.supervisor
                };
                internService.createIntern($scope.request, $scope.create.studentId)
                    .then(function() {
                        $scope.saveIntern = true;
                        $scope.showAllIntern_();
                        $scope.create.partnerId = '';
                        $scope.create.partnerName = '';
                        $scope.create.startDate = '';
                        $scope.create.endDate = '';
                        $scope.create.supervisor = '';
                    }, function(error) {
                        $scope.response = error;
                    });
                $scope.create.infoBySchool.studentCode = null;
            };

            $scope.showName = function() {
                if ($scope.create.infoBySchool.studentCode == '') {
                    $scope.typing = false;
                } else {
                    $scope.typing = true;
                    $scope.showNotIntern();
                }
            };
            $scope.count = 0;
            $scope.chooseIntern = function(intern) {
                if (intern.checked != true) {
                    intern.checked = true;
                    if ($scope.count == 0) {
                        $scope.count = 1;
                    } else {
                        $scope.count++;
                    }
                } else
                if (intern.checked == true) {
                    intern.checked = false;
                    $scope.count--;
                }
            };

            $scope.editIntern = function(intern) {
                internService.editIntern(intern)
                    .then(function() {
                        $scope.showIntern = false;
                        $scope.showAllIntern_();
                    })
            };

            $scope.selectAllId = false;
            $scope.selectAll = function() {
                if ($scope.selectAllId == false) {
                    $scope.count = 0;
                    angular.forEach($scope.isIntern, function(v) {
                        v.checked = true;
                        $scope.count++;
                    });
                    $scope.selectAllId = true;
                } else {
                    angular.forEach($scope.isIntern, function(v) {
                        v.checked = false;
                    });
                    $scope.count = 0;
                    $scope.selectAllId = false;
                }
            };

            $scope.delOne = function(intern) {
                internService.del(intern.internship.id, intern.id);
                $scope.count = 0;
                $scope.showIntern = false;
                $scope.showAllIntern_();
            };

            $scope.delAll = function() {
                angular.forEach($scope.isIntern, function(v) {
                    if (v.checked == true) {
                        internService.del(v.internship.id, v.id);
                    }
                });
                $scope.count = 0;
                $scope.showIntern = false;
                $scope.showAllIntern_();
            };

            $scope.comfirmDelete = function(id) {
                console.log(id);
                $scope.comfirmDeleteId = id;
            }

            $scope.alertWarning = function(warning, timeout) {
                $scope.warningMessage = warning;
                $scope.warning = true;
                $timeout(function() {
                    $(".alert").fadeTo(500, 0).slideUp(500, function() {
                        $scope.warning = false;
                        $scope.warningMessage = "";
                    });
                }, timeout);

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

(function() {
    var app = angular.module("lecturers", []);
    app.controller('lecturersCtrl', ['filterFilter', '$scope', 'lecturersService', '$location', '$rootScope', '$window',
        '$timeout', 'md5', '$state',
        function(filterFilter, $scope, lecturersService, $location, $rootScope, $window, $timeout, md5, $state) {
            $rootScope.currentPageName = $state.current.name;
            $scope.entry = '';
            $scope.input = {};
            $scope.getAllStudentClass = function() {
                lecturersService.getAllStudentClass()
                    .then(function(response) {
                        $scope.allStudentClass = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createStudentClass = function() {
                if ($scope.input.studentClass != null) {
                    lecturersService.createStudentClass($scope.input)
                        .then(function() {
                            $scope.alertSuccess("Thêm lớp khóa học thành công!", "");
                            $scope.getAllStudentClass();
                            $scope.input = {};
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }
            }

            $scope.deleteStudentClass = function(id) {
                $('#close_modal_delete_delete_class').trigger('click');
                lecturersService.deleteStudentClass(id)
                    .then(function() {
                        $scope.alertSuccess("Xóa lớp khóa học thành công!", "");
                        $scope.getAllStudentClass();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.message.data, "");
                    })
            }

            $scope.editStudentClass = function(studentClassId, classNameId) {
                var studentClass = $('#studentClass_' + studentClassId).text();
                $('#studentClass_' + studentClassId).html('<input id="studentClass_value_' + studentClassId + '" value="' + studentClass + '" style="border-radius:3px; border: 1px solid; width: 50%;"/>');
                var className = $('#className_' + studentClassId).text();
                $('#className_' + studentClassId).html('<input id="className_value_' + studentClassId + '" value="' + className + '" style="border-radius:3px; border: 1px solid; width: 50%;"/>');

                $('#edit_studentClass_' + studentClassId).hide();
                $('#save_edit_studentClass_' + studentClassId).show();


            }

            $scope.saveEditStudentClass = function(studentClassId) {
                var studentClass = $('#studentClass_value_' + studentClassId).val();
                var className = $('#className_value_' + studentClassId).val();
                $scope.request = {
                    id: studentClassId,
                    studentClass: studentClass,
                    className: className
                }
                lecturersService.editStudentCLass($scope.request)
                    .then(function() {
                        $('#save_edit_studentClass_' + studentClassId).hide();
                        $('#studentClass_' + studentClassId).html(studentClass);
                        $('#edit_studentClass_' + studentClassId).show();
                        $('#className_' + studentClassId).html(className);
                        $scope.alertSuccess('Sửa tên lớp thành công!', ''); //dang vuong o cho hien alert success
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
            }

            $scope.convert = function() {
                var xlf = document.getElementById('xlf');

                function handleFile(e) {
                    var files = e.target.files;
                    var i, f;
                    for (i = 0, f = files[i]; i != files.length; ++i) {
                        var reader = new FileReader();
                        var name = f.name;
                        reader.onload = function(e) {
                            var data = e.target.result;

                            var workbook = XLSX.read(data, { type: 'binary' });

                            var first_sheet_name = workbook.SheetNames[0];
                            /* DO SOMETHING WITH workbook HERE */
                            var worksheet = workbook.Sheets[first_sheet_name];
                            worksheet['B1'].w = "fullName";
                            worksheet['C1'].w = "subject";
                            worksheet['D1'].w = "phoneNumber";
                            worksheet['E1'].w = "emailvnu";
                            $rootScope.excel = XLSX.utils.sheet_to_json(worksheet);
                        };
                        reader.readAsBinaryString(f);
                    }
                }
                if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
            }

            $scope.setExcelTable = function() {
                $scope.excelTable = $rootScope.excel;
                angular.forEach($scope.excelTable, function(lecturers) {
                        lecturers.userName = lecturers.emailvnu.replace(/(?:@vnu.edu.vn|@gmail.com)/g, '');
                    })
            }

            $scope.send = function() {
                $scope.errorCount = 0;
                lecturersService.createLecturersFromExcel($scope.excelTable)
                    .then(function(response) {
                        $scope.excelTable = null;
                        angular.forEach(response.data, function(lecturers) {
                            if (lecturers.status == "userNameExisted") {
                                $('#' + lecturers.userName).css('background-color', '#f0ad4e');
                                $scope.errorCount++;
                            } else {
                                var index = response.data.indexOf(lecturers)
                                response.data.splice(index, 1);
                            }
                        });
                        if ($scope.errorCount != 0) {
                            $scope.alertDanger("Kiểm tra lại các giảng viên sau, UserName bị trùng", "");
                            $scope.excelTable = response.data;
                        } else {
                            $scope.alertSuccess("Nhập giảng viên thành công!", "");
                            $scope.getAllLecturers();
                        }
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, "");
                    })
            }

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
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                }
            }

            $scope.getAllLecturers = function() {
                lecturersService.getAllLecturers()
                    .then(function(response) {
                        $scope.allLecturers = response.data;
                        $scope.totalItems = response.data.length;
                        $scope.currentPage = 1;
                        $scope.entryLimit = 25;
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                        $scope.$watch('search', function(newVal, oldVal) {
                            $scope.filtered = filterFilter($scope.allLecturers, newVal);
                            $scope.totalItems = $scope.filtered.length;
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                            $scope.currentPage = 1;
                        }, true);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllFaculty = function() {
                lecturersService.getAllFaculty()
                    .then(function(response) {
                        $scope.allFaculty = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createFaculty = function() {
                lecturersService.createFaculty($scope.input)
                    .then(function() {
                        $scope.getAllFaculty();
                        $scope.alertSuccess("Tạo thêm khoa thành công!", "");
                    }, function(error) {
                        $scope.alertDanger(error.message, "");
                    })
            }

            $scope.createLecturers = function() {
                $scope.lecturers.role = "LECTURERS";
                $scope.lecturers.password = md5.createHash($scope.lecturers.password || '');
                lecturersService.createLecturers($scope.lecturers)
                    .then(function(response) {
                        $scope.alertSuccess("Thêm giảng viên thành công!", "");
                        $scope.lecturers = {};
                        $scope.getAllLecturers();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.confirmDelete = function(id, name) {
                console.log(id);
                $scope.confirmDeleteId = id;
                $scope.confirmDeleteName = name;
            }

            $scope.deleteLecturers = function(lecturersId) {
                $('#close_modal_delete_lecturers').trigger('click');
                lecturersService.deleteLecturers(lecturersId)
                    .then(function() {
                        $scope.alertSuccess("Xóa giảng viên thành công", ""),
                        $scope.getAllLecturers();
                    }, function(error) {
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.editLecturers = function(lecturersId) {
                var fullName = $('#fullName_' + lecturersId).text();
                $('#fullName_' + lecturersId).html('<input id="fullName_value_' + lecturersId + '" value="' + fullName + '" style="border-radius:3px; border: 1px solid;"/>');

                var email = $('#email_' + lecturersId).text();
                $('#email_' + lecturersId).html('<input id="email_value_' + lecturersId + '" value="' + email + '" style="border-radius:3px; border: 1px solid;"/>');

                var emailVNU = $('#emailVNU_' + lecturersId).text();
                $('#emailVNU_' + lecturersId).html('<input id="emailVNU_value_' + lecturersId + '" value="' + emailVNU + '" style="border-radius:3px; border: 1px solid;"/>');

                var subject = $('#subject_' + lecturersId).text();
                $('#subject_' + lecturersId).html('<input id="subject_value_' + lecturersId + '" value="' + subject + '" style="border-radius:3px; border: 1px solid; width: 70%;"/>');

                var phoneNumber = $('#phoneNumber_' + lecturersId).text();
                $('#phoneNumber_' + lecturersId).html('<input id="phoneNumber_value_' + lecturersId + '" value="' + phoneNumber + '" style="border-radius:3px; border: 1px solid; width: 70%;"/>');

                $('#edit_lecturers_' + lecturersId).hide();
                $('#save_edit_lecturers_' + lecturersId).show();
            }

            $scope.saveEditLecturers = function(lecturersId) {
                var fullName = $('#fullName_value_' + lecturersId).val();
                var email = $('#email_value_' + lecturersId).val();
                var emailVNU = $('#emailVNU_value_' + lecturersId).val();
                var subject = $('#subject_value_' + lecturersId).val();
                var phoneNumber = $('#phoneNumber_value_' + lecturersId).val();
                $scope.request = {
                        id: lecturersId,
                        fullName: fullName,
                        email: email,
                        emailVNU: emailVNU,
                        subject: subject,
                        phoneNumber: phoneNumber
                    }
                lecturersService.editLecturers($scope.request)
                    .then(function() {
                        $('#edit_lecturers_' + lecturersId).show();
                        $('#save_edit_lecturers_' + lecturersId).hide();
                        $('#fullName_' + lecturersId).html(fullName);
                        $('#email_' + lecturersId).html(email);
                        $('#emailVNU_' + lecturersId).html(emailVNU);
                        $('#subject_' + lecturersId).html(subject);
                        $('#phoneNumber_' + lecturersId).html(phoneNumber);
                        $scope.alertSuccess('Sửa Giảng viên thành công!', '');
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
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

(function() {
    var app = angular.module("loginAd", []);
    angular.module('loginAd')
        .controller('LoginAdCtrl', ['$scope', 'loginAdService', '$location', '$rootScope', '$window', 'md5',
            function($scope, loginAdService, $location, $rootScope, $window, md5) {
                $rootScope.loggedIn = false;
                $rootScope.admin = true;
                $scope.loginAd = function() {
                    $scope.request = {
                        userName: $scope.loginAd.username,
                        password: md5.createHash($scope.loginAd.password || '')
                    };

                    loginAdService.loginAd($scope.request)
                        .then(function(response) {
                            if (response.data.token != null) {
                                sessionStorage.setItem('Admin-Data', response.data.token);
                                sessionStorage.setItem('username', response.data.userName);
                                sessionStorage.setItem('idAdmin', response.data.id);
                                sessionStorage.setItem('role', response.data.role);
                                if (response.data.lecturers != null) {
                                    sessionStorage.setItem('lecturersId', response.data.lecturers.id);
                                }
                            }
                            if (response.data.role == 'ADMIN') {
                                window.location.href = $rootScope.clientAdd + '/admin';
                            } else if(response.data.role == 'LECTURERS'){

                                window.location.href = $rootScope.clientAdd + '/lecturers';
                            }
                        }, function(error) {
                            alert('dang nhap khong thanh cong');
                        })
                };
            }
        ])
}());

(function() {
    var app = angular.module("message", []);
    angular.module('message')
        .controller('messageCtrl', ['$timeout', '$scope', '$rootScope', '$location', '$window', 'messageService', '$state', '$sce',
            function($timeout, $scope, $rootScope, $location, $window, messageService, $state, $sce) {
                $rootScope.currentPageName = $state.current.name;
                $scope.message = {};
                $scope.reply = {};
                $rootScope.initPage = 1;
                $scope.deleteNotificationMessage = function(messageId) {
                    $('#close_modal_delete_message').trigger('click');
                    messageService.deleteNotificationMessage(messageId)
                        .then(function() {
                            $scope.getNotificationMessage();
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getNotificationMessage = function() {
                    messageService.getNotificationMessage()
                        .then(function(response) {
                            $scope.notificationMessage = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.createNotification = function() {
                    $scope.notification.content = $scope.notification.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    messageService.createNotificationMessage($scope.notification)
                        .then(function() {
                            $scope.getNotificationMessage();
                            $scope.notification.content = "";
                        }, function(error) {
                            console.log(error);
                        })
                }
                $scope.getAllMessage = function(page) {
                    $scope.page = page;
                    $rootScope.messages = [];
                    console.log($rootScope.initPage);
                    if ($rootScope.lastUpdated == undefined) {
                        currentTime = new Date();
                        var curr_date = currentTime.getDate();
                        var curr_month = currentTime.getMonth() + 1; //Months are zero based
                        var curr_year = currentTime.getFullYear();
                        var curr_hours = currentTime.getHours();
                        var curr_min = currentTime.getMinutes();
                        var curr_sec = currentTime.getSeconds();
                        currentTime = curr_year + "-" + curr_month + "-" + curr_date + " " + curr_hours + ":" + curr_min + ":" + curr_sec;
                        $rootScope.lastUpdated = currentTime;
                    }
                    messageService.getAllMessage($rootScope.initPage - 1, 20, $rootScope.lastUpdated)
                        .then(function(response) {
                            $rootScope.messagesCount = response.data.length;
                            angular.forEach(response.data.content, function(v) {
                                $rootScope.messages.push(v);
                            });

                            $rootScope.initPage++;
                            $scope.pages = [];
                            var page = response.data.totalPages;
                            for (var i = 1; i <= page; i++) {
                                if (i == $scope.page) {
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
                                if ($scope.page == page) {
                                    $scope.nextPage = {
                                        class: "disabled",
                                        page: page
                                    };
                                } else {
                                    $scope.nextPage = {
                                        class: "",
                                        page: parseInt($scope.page) + 1
                                    };
                                }
                                if ($scope.page == 1) {
                                    $scope.previousPage = {
                                        class: "disabled",
                                        page: 1
                                    };
                                } else {
                                    $scope.previousPage = {
                                        class: "",
                                        page: $scope.page - 1
                                    };
                                }

                            }
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getAllStudent = function(page) {
                    $scope.page = page;
                    studentService.getAllStudent(page - 1, 10)
                        .then(function(response) {
                            $scope.allStudents = response.data.content;
                            $scope.pages = [];
                            var page = response.data.totalPages;
                            for (var i = 1; i <= page; i++) {
                                if (i == $scope.page) {
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
                                if ($scope.page == page) {
                                    $scope.nextPage = {
                                        class: "disabled",
                                        page: page
                                    };
                                } else {
                                    $scope.nextPage = {
                                        class: "",
                                        page: parseInt($scope.page) + 1
                                    };
                                }
                                if ($scope.page == 1) {
                                    $scope.previousPage = {
                                        class: "disabled",
                                        page: 1
                                    };
                                } else {
                                    $scope.previousPage = {
                                        class: "",
                                        page: $scope.page - 1
                                    };
                                }

                            }
                        })
                }

                $scope.showMessage = function(message) {
                    if (message.messageType == 'Inbox') {
                        $scope.receiverName = message.senderName;
                        messageService.getOneMessage(message.id)
                            .then(function(response) {
                                $rootScope.selectedMessage = response.data;
                            }, function(error) {
                                content.log(error);
                            })
                    } else {
                        $scope.receiverName = message.senderName;
                        $rootScope.selectedMessage = message;
                    }
                    console.log($scope.receiverName);
                    if (message.status == 'NEW') {
                        messageService.markMessageAsSeen(message.id)
                            .then(function() {
                                message.status = "";
                            });
                    }
                }

                var handleFileSelect = function(evt) {
                    var file = evt.currentTarget.files[0];
                    $scope.message.fileName = evt.currentTarget.files[0].name;
                    $scope.message.fileType = evt.currentTarget.files[0].name.split('.').pop();
                    var reader = new FileReader();
                    reader.onload = function(evt) {
                        $scope.$apply(function($scope) {
                            $scope.message.attachFile = evt.target.result.split(',').pop();
                        });
                    };
                    reader.readAsDataURL(file);
                };
                angular.element(document.querySelector('#baocao')).on('change', handleFileSelect);

                $rootScope.markMessageAsSeen = function(messageId) {
                    messageService.markMessageAsSeen(messageId)
                        .then(function() {
                            //
                        });
                }

                $scope.getLinkFile = function(attachFileAdd) {
                    $rootScope.modalFileLink = $sce.trustAs($sce.RESOURCE_URL, "https://docs.google.com/gview?url=" + $rootScope.clientAdd + attachFileAdd + "&embedded=true");
                }

                $scope.getFileName = function(fileAdd) {
                    return fileAdd.split('/').pop();
                }

                $scope.getLinkDownLoad = function(fileAdd) {
                    return $rootScope.clientAdd + fileAdd;
                }

                $scope.sendMessage = function() {
                    if ($scope.message.content != undefined) {
                        $scope.message.content = $scope.message.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        messageService.createMessage($scope.message)
                            .then(function() {
                                $scope.message = {};
                                new PNotify({
                                    title: 'Gửi tin nhắn thành công!',
                                    type: 'success',
                                    styling: 'bootstrap3'
                                });
                            }, function(error) {
                                console.log(error);
                                $scope.alertDanger("Error", "");
                            })
                    }

                }

                $scope.replyMessage = function() {
                    if ($scope.reply.content != undefined) {
                        $scope.reply.content = $scope.reply.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        $scope.reply.receiverName = $scope.receiverName;
                        $scope.reply.messageId = $rootScope.selectedMessage.id;
                        messageService.createMessage($scope.reply)
                            .then(function(response) {
                                $scope.reply = {};
                                $rootScope.selectedMessage.messages.push(response.data);
                                $rootScope.selectedMessage.lastUpdated = new Date().getTime();
                            }, function(error) {
                                console.log(error);
                                $scope.alertDanger(error.data.message, "");
                            })
                    }
                }


                $scope.confirmDelete = function(id) {
                    $scope.confirmDeleteId = id;
                }

                $scope.alertWarning = function(warning, timeout) {
                    $scope.warningMessage = warning;
                    $scope.warning = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.warning = false;
                            $scope.warningMessage = "";
                        });
                    }, timeout);

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
(function () {
    var app = angular.module("notification",[]);
    app.controller('NotiCtrl', ['$scope', 'notificationService', '$location', '$rootScope', '$window',
        function ($scope, notificationService, $location, $rootScope, $window) {
            $scope.getAllNotification = function(){
                notificationService.getAllNotification()
                .then(function(response){
                    $rootScope.AllNotifications = response.data;
                }, function(error){
                    console.log(error);
                });
            }
        }])
}());
(function() {
    var app = angular.module("partner", []);
    angular.module('partner')
        .controller('partnerCtrl', ['filterFilter', '$window', '$scope', 'partnerService', 'studentService', '$location', '$rootScope',
            '$timeout', '$stateParams', 'messageService', 'md5', '$state',
            function(filterFilter, $window, $scope, partnerService, studentService, $location, $rootScope, $timeout, $stateParams, messageService, md5, $state) {
                $rootScope.currentPageName = $state.current.name;
                $scope.loadPartner = true;
                $scope.partnersRole = [
                    { role: 'VIP_PARTNER' },
                    { role: 'NORMAL_PARTNER' }
                ];
                $scope.post = {};
                $scope.role = $scope.partnersRole[0];
                $scope.editIma = false;
                $scope.request = {};
                $scope.editPostTimeModal = {};
                $scope.search = "";
                $scope.partner = {};
                $scope.input = {};
                $rootScope.currentPageName = $state.current.name;

                $scope.acceptPartner = function (){
                    $scope.listAcceptPartner = [];
                    angular.forEach($scope.allWaitPartner, function(partner){
                        if(partner.checked == true){
                            partner.status = null;
                            $scope.listAcceptPartner.push(partner);
                        }
                    })
                    console.log($scope.listAcceptPartner);
                    partnerService.acceptPartner($scope.listAcceptPartner)
                        .then(function(){
                            $scope.alertSuccess("Thành Công!", '');
                        }, function(error){
                            console.log(error);
                        })
                }

                $scope.notAcceptPartner = function(){
                    $scope.listAcceptPartner = [];
                    angular.forEach($scope.allWaitPartner, function(partner){
                        if(partner.checked == true){
                            partner.status = false;
                            $scope.listAcceptPartner.push(partner);
                        }
                    })
                    partnerService.acceptPartner($scope.listAcceptPartner)
                        .then(function(){
                            $scope.alertSuccess("Thành Công!", '');
                        }, function(error){
                            console.log(error);
                        })
                }

                $scope.getAllWaitpartner = function() {
                    partnerService.getAllWaitpartner()
                        .then(function(response) {
                            $scope.allWaitPartner = response.data;
                            angular.forEach($scope.allWaitPartner, function(partner){
                                partner.checked = false;
                            })
                            $scope.totalItems = response.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.allWaitPartner, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.editPartner = function(partner) {
                    $scope.Partner = partner;
                }

                $scope.editPartnerInfo = function() {
                    $('#close_edit_partnerInfo').trigger('click');
                    partnerService.editPartner($scope.Partner.id, $scope.Partner)
                        .then(function() {
                            $scope.alertSuccess("Sửa thông tin đối tác thành công!", "");
                            $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }

                $scope.deletePartner = function(partnerId) {
                    $('#close_modal_delete_partner').trigger('click');
                    partnerService.deletePartner(partnerId)
                        .then(function() {
                            $scope.alertSuccess("Xóa partner thành công!", "");
                            if ($rootScope.currentPageName == '/fit-partner') {
                                $scope.getFitPartner();
                            }
                            if ($rootScope.currentPageName == '/other-partner') {
                                $scope.getOtherPartner();
                            }
                            $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }

                $scope.showFollow = function(follows) {
                    $scope.modelFollows = follows;
                }

                $scope.getAllFollows = function() {
                    partnerService.getAllFollows()
                        .then(function(response) {
                            $scope.allFollows = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.showPartnerContact = function(partner) {
                    if (partner != "") {
                        $scope.partnerContacts = JSON.parse(partner);
                    } else {
                        $scope.partnerContacts = null;
                    }
                }

                $scope.data = {}; //init variable
                $scope.click = function() { //default function, to be override if browser supports input type='file'
                    $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
                }

                var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
                fileSelect.type = 'file';

                if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
                    return;
                }

                $scope.click = function() { //activate function to begin input file on click
                    fileSelect.click();
                }

                fileSelect.onchange = function() { //set callback to action after choosing file
                    var f = fileSelect.files[0],
                        r = new FileReader();

                    r.onloadend = function(e) { //callback after files finish loading

                        $scope.ima = e.target.result;
                        $scope.editIma = true;
                        $scope.$apply();
                    };

                    r.readAsDataURL(f); //once defined all callbacks, begin reading the file

                };

                $scope.showPostModal = function(post) {
                    $scope.modalPost = post;
                }

                $scope.editPost = function(post) {
                    $scope.editPostModal = post;
                }

                $scope.saveEditPost = function() {
                    if ($scope.editPostTimeModal.startDate != undefined) {
                        $scope.request.startDate = new Date($scope.editPostTimeModal.startDate).getTime() / 1000;
                    }
                    if ($scope.editPostTimeModal.expiryTime != undefined) {
                        $scope.request.expiryTime = new Date($scope.editPostTimeModal.expiryTime).getTime();
                    }
                    $scope.request.content = $scope.editPostModal.content;
                    $scope.request.hashtagDTO = $scope.obj;
                    $scope.request.requiredNumber = $scope.editPostModal.requiredNumber;
                    $scope.request.title = $scope.editPostModal.title;
                    $scope.request.partnerContactId = 0;
                    partnerService.editPost($scope.editPostModal.id, $scope.request)
                        .then(function(response) {
                            $('#close_modal_edit_post').trigger('click');
                            $scope.alertSuccess("Sửa post thành công", "");
                        }, function(error) {
                            $('#close_modal_edit_post').trigger('click');
                            $scope.alertDanger("Có lỗi xảy ra, hãy thử lại!", "");
                        })
                }


                $scope.createPost = function() {
                    if ($scope.post.postType != "") {
                        if ($scope.tags != "" && $scope.tags != undefined) {
                            var array = $scope.tags.split(',');
                            $scope.obj = [];
                            for (var i = 0; i < array.length; i++) {
                                $scope.obj.push({
                                    tag: array[i]
                                });

                            }
                        }
                        if ($scope.post.postType == 'Research') {
                            $scope.post.partnerContactId = 'no';
                        }
                        if ($scope.post.partnerContactId == 'other') {
                            $scope.post.partnerContactId = 0;
                        } else if ($scope.post.partnerContactId == 'no') {
                            $scope.post.partnerContactId = -1;
                        } else {
                            $scope.post.partnerContactDTO = null;
                        }
                        if ($scope.post.partner == 'other') {
                            $scope.partnerId = -1
                            $scope.post.partnerContactDTO = $scope.input.partnerContactDTO;
                        } else {
                            $scope.partnerId = $scope.Partner.id;
                            $scope.input.partner = null;
                            angular.forEach($scope.Partner.partnerContacts, function(contact) {
                                $scope.post.partnerContactId = contact.id;
                            });

                        }
                        $scope.request = {
                            content: $scope.post.content,
                            datePost: Date.now(),
                            hashtagDTO: $scope.obj,
                            partnerContactId: $scope.post.partnerContactId,
                            requiredNumber: $scope.post.requiredNumber,
                            title: $scope.post.title,
                            expiryTime: new Date($scope.post.expiryTime).getTime(),
                            partnerContactDTO: $scope.post.partnerContactDTO,
                            partner: $scope.input.partner,
                            postType: $scope.post.postType
                        };
                        if ($scope.request.postType != undefined && $scope.partnerId != undefined) {
                            partnerService.createPost($scope.partnerId, $scope.request)
                                .then(function(response) {
                                        $scope.alertSuccess("Thêm post thành công", "");
                                        $scope.loadAllPost();
                                        $scope.Partner = undefined;
                                        $scope.post = {};
                                    },
                                    function(error) {
                                        console.log(error);
                                        $scope.alertDanger(error.data.message, "");
                                    });
                        }

                    }

                };

                $scope.loadAllPostByInternshipTerm = function() {
                    if ($stateParams.internshipTermId) {
                        partnerService.loadAllPostByInternshipTerm($stateParams.internshipTermId)
                            .then(function(response) {
                                $scope.allPosts = response.data;
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }

                $scope.loadAllPost = function(postType, stateParams) {
                    if (stateParams != undefined) {
                        $state.transitionTo('/post/page=:page', { page: 1 }, { location: true, notify: false });
                        $stateParams.page = 1;
                    }
                    if ($stateParams.page) {
                        if (postType != undefined) {
                            sessionStorage.setItem('postType', postType);
                            $rootScope.postType = postType;
                        }
                        if (sessionStorage['postType'] == undefined) {
                            sessionStorage.setItem('postType', 'Recruitment');
                        }
                        if ($rootScope.postType == undefined) {
                            $rootScope.postType = sessionStorage['postType'];
                        }
                        $scope.activePage = $stateParams.page;
                        partnerService.loadLatestPost($stateParams.page - 1, 15, sessionStorage['postType'])
                            .then(function(response) {
                                $scope.allPosts = response.data.content;
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
                }

                $scope.selectPartner = function(partner) {
                    if (partner != "" && partner != 'other') {
                        $scope.Partner = JSON.parse(partner);
                    } else if (partner == 'other') {
                        $scope.input = {};
                    } else {
                        $scope.partnerContact = null;
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
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                    }
                }

                $scope.getOtherPartner = function() {
                    partnerService.getOtherPartner()
                        .then(function(response) {
                            $scope.otherPartners = response.data;
                            $scope.partners = response.data;
                            $scope.totalItems = response.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.otherPartners, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        })
                }

                $scope.getFitPartner = function() {
                    partnerService.getFitPartner()
                        .then(function(response) {
                            $scope.fitPartners = response.data;
                            $scope.partners = response.data;
                            $scope.totalItems = response.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.fitPartners, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        })
                }

                $scope.loadAllPartner = function() {
                    $scope.loadPartner = true;
                    partnerService.loadAllPartner()
                        .then(function(data) {
                            $scope.partners = data.data;
                            $scope.totalItems = data.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.partners, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        });

                };

                $scope.deletePost = function(postId) {
                    partnerService.deletePost(postId)
                        .then(function() {
                            $('#close_modal_delete_post').trigger('click');
                            $scope.alertSuccess("Xóa post thành công!", "");
                            $scope.loadAllPost();
                        }, function(error) {
                            console.log(error);
                            $('#close_modal_delete_post').trigger('click');
                            $scope.alertDanger("Có lỗi xảy ra, hãy reload và thử lại!", "");
                        })
                }

                $scope.deletePartnerContact = function(contactId) {
                    $('#close_modal_delete_partner_contact').trigger('click');
                    partnerService.deletePartnerContact(contactId)
                        .then(function() {
                            $scope.alertSuccess("Xóa liên hệ thành công!", "successdelete_edit");
                            $('#tr_contact_' + contactId).remove();
                            $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "danger");
                        })
                }

                $scope.editContact = function(contactId) {
                    var contactName = $('#contactName_' + contactId).text();
                    $('#contactName_' + contactId).html('<input id="contactName_value_' + contactId + '" value="' + contactName + '" style="border-radius:3px; border: 1px solid;" ng-keydown="editContactEnter($event, ' + contactId + ')"/>');

                    var email = $('#email_' + contactId).text();
                    $('#email_' + contactId).html('<input id="email_value_' + contactId + '" value="' + email + '" style="border-radius:3px; border: 1px solid;" ng-keydown="editContactEnter($event, ' + contactId + ')"/>');

                    var phone = $('#phone_' + contactId).text();
                    $('#phone_' + contactId).html('<input id="phone_value_' + contactId + '" value="' + phone + '" style="border-radius:3px; border: 1px solid; width: 70%;" ng-keydown="editContactEnter($event, ' + contactId + ')"/>');

                    var skype = $('#skype_' + contactId).text();
                    $('#skype_' + contactId).html('<input id="skype_value_' + contactId + '" value="' + skype + '" style="border-radius:3px; border: 1px solid; width: 70%;" ng-keydown="editContactEnter($event, ' + contactId + ')"/>');

                    $('#edit_contact_' + contactId).hide();
                    $('#save_edit_contact_' + contactId).show();
                }

                $scope.editContactEnter = function($event, contactId) {
                    if ($event.keyCode == 13) {
                        $('#save_edit_contact_' + contactId).trigger('click');
                    }
                }

                $scope.saveEditContact = function(contactId) {
                    var contactName = $('#contactName_value_' + contactId).val();
                    var email = $('#email_value_' + contactId).val();
                    var phone = $('#phone_value_' + contactId).val();
                    var skype = $('#skype_value_' + contactId).val();
                    $scope.request = {
                        contactName: contactName,
                        email: email,
                        phone: phone,
                        skype: skype
                    }
                    partnerService.editPartnerContact(contactId, $scope.request)
                        .then(function() {
                            $('#edit_contact_' + contactId).show();
                            $('#save_edit_contact_' + contactId).hide();
                            $('#contactName_' + contactId).html(contactName);
                            $('#email_' + contactId).html(email);
                            $('#phone_' + contactId).html(phone);
                            $('#skype_' + contactId).html(skype);
                            $scope.alertSuccess('Sửa liên hệ thành công!', 'successdelete_edit');
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, 'danger');
                        })
                }

                $scope.confirmDelete = function(id, name) {
                    $scope.confirmDeleteId = id;
                    $scope.confirmDeleteName = name;
                }

                $scope.createPartner = function() {
                    $scope.request = {
                        userName: $scope.partner.userName,
                        password: md5.createHash($scope.partner.password || ''),
                        role: $scope.role.role
                    };
                    $scope.partner.password = md5.createHash($scope.partner.password || '');
                    $scope.partner.role = $scope.role.role;
                    partnerService.createPartner($scope.partner)
                        .then(function(data) {
                            $scope.partner = {};
                            $scope.alertSuccess("Tạo đối tác thành công!", "")
                            $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger("Có lỗi khi tạo đối tác, hãy reload trang và thử lại!", "")
                            $scope.error = error;
                        })
                };

                $scope.getPartnerNameAndId = function() {
                    partnerService.getPartnerNameAndId('true')
                        .then(function(response) {
                            $scope.partnerNameAndId = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.createPartnerContact = function() {
                    partnerService.createPartnerContact($scope.input.partnerContact.partnerId, $scope.input.partnerContact)
                        .then(function(response) {
                            $scope.input.partnerContact = {};
                            $scope.alertSuccess("Thên liên hệ cho đối tác thành công!", "");
                            $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }

                $scope.showPartner = function(data) {
                    $rootScope.partner = data;
                    $location.path('/admin/partner/' + data.partnerId);
                };

                $scope.setPartnerInfo = function() {
                    $scope.partnerData = [];
                    $scope.partnerData.partnerName = $rootScope.partner.partnerName;
                    if ($rootScope.partner.status == "A") {
                        $scope.partnerData.status = true;
                    } else {
                        $scope.partnerData.status = false;
                    }
                    $scope.partnerData.userId = $rootScope.partner.userId;
                    $scope.partnerData.partnerId = $rootScope.partner.partnerId;
                };

                $scope.changeStatus = function(userId) {
                    studentService.changeStatus(userId)
                        .then(function() {
                            if ($scope.partnerData.status == true) {
                                $scope.partnerData.status = false;
                            } else {
                                $scope.partnerData.status = true;
                            }
                            alert("user status changed");
                        }, function(error) {

                        })
                };

                $scope.showPartnerContact = function(partnerContact, partnerName, partnerId) {
                    $scope.partnerContacts = partnerContact;
                    $scope.partnerName = partnerName;
                    $scope.partnerId = partnerId;
                }

                $scope.loadPartnerContact = function(partnerId, partnerName) {
                    $scope.partnerContact = [];
                    $scope.partnerName = partnerName;
                    partnerService.loadPartnerContact(partnerId)
                        .then(function(response) {
                            $scope.partnerContacts = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                };

                $scope.loadAllPartnerPost = function(partnerId) {
                    $scope.allPartnerPost = [];
                    partnerService.loadAllPartnerPost(partnerId)
                        .then(function(response) {
                            $scope.show_post = false;
                            $scope.allPartnerPost = response.data;
                            angular.forEach($scope.allPartnerPost, function(post) {
                                partnerService.getFollowOfPost(post.id)
                                    .then(function(respone) {
                                        post.follow = respone.data.length;
                                    })
                            });
                        }, function(error) {
                            console.log(error);
                        })
                };
                $scope.closePost = function() {
                    $scope.show_post = false;
                };

                $scope.showPost = function(post) {
                    $scope.show_post = true;
                    $scope.post = post;
                };

                $scope.loadPartner = function() {
                    if ($rootScope.partner != null) {
                        $scope.setPartnerInfo();
                    } else {
                        partnerService.loadPartner($stateParams.partnerId)
                            .then(function(respone) {
                                $scope.partnerData = [];
                                $scope.partnerData.partnerName = respone.data.partnerName;
                                if (respone.data.status == "A") {
                                    $scope.partnerData.status = true;
                                } else {
                                    $scope.partnerData.status = false;
                                }
                                $scope.partnerData.userId = respone.data.userId;
                                $scope.partnerData.partnerId = respone.data.partnerId;
                            })
                    }
                };

                $scope.alertWarning = function(warning, timeout) {
                    $scope.warningMessage = warning;
                    $scope.warning = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.warning = false;
                            $scope.warningMessage = "";
                        });
                    }, timeout);

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
(function() {
    var app = angular.module("student", []);
    angular.module('student')
        .controller('studentCtrl', ['lecturersService', 'internService', '$scope', 'studentService', 'messageService',
            '$timeout', '$location', '$rootScope', 'filterFilter', '$stateParams', 'orderByFilter', '$state', 'partnerService', '$compile',

            function(lecturersService, internService, $scope, studentService, messageService, $timeout, $location, $rootScope,
                filterFilter, $stateParams, orderBy, $state, partnerService, $compile) {
                $rootScope.currentPageName = $state.current.name;
                $scope.st = {};
                $scope.st.infoBySchool = {};
                $scope.st.infoBySchool.studentClass = "";
                $scope.studentInfoBySchool = [];
                $scope.entry = '';
                $scope.search = '';
                $scope.input = {};
                $scope.intern = {};
                $scope.lecturers = {};
                $scope.postTitle = "";
                $scope.type = null;
                $scope.downloadTypeLecturers = "";
                $scope.new = function(type) {
                    var count = 0;
                    $scope.currentPage = 1;
                    if (type == 'false') {
                        angular.forEach($scope.allStudents, function(student) {
                            if (student.lecturers == null) {
                                student.show = true;
                                count++;
                            } else {
                                student.show = false;
                            }
                        })
                        $scope.totalItems = count;
                    } else if (type == 'true') {
                        angular.forEach($scope.allStudents, function(student) {
                            if (student.lecturers != null) {
                                student.show = true;
                                count++;
                            } else {
                                student.show = false;
                            }
                        })
                        $scope.totalItems = count;
                    } else {
                        angular.forEach($scope.allStudents, function(student) {
                            student.show = true;
                        })
                    }
                }

                $scope.changeType = function(postType) {
                    if (postType == 'noFollow') {
                        $scope.getStudentNoInternshipTerm();
                    }
                    if (postType == 'Recruitment_other') {
                        $scope.typeName = 'Công ty ngoài';
                    }
                    if (postType == 'Recruitment') {
                        $scope.typeName = 'Đối tác';
                    }
                    if (postType == 'Research') {
                        $scope.typeName = 'Tại trường';
                    }
                    if (postType == "") {
                        $scope.typeName = "";
                    }
                    $scope.currentPage = 1;
                    var count = 0;
                    if (postType != 'noFollow' && postType != "") {
                        angular.forEach($scope.allFollows, function(v) {
                            if (v.postTitle == postType) {
                                count++;
                            }
                        })
                        $scope.totalItems = count;
                    }
                }

                $scope.filterPosttitle = function(item) {
                    if ($scope.postTitle == "") {
                        return item;
                    } else if (item.postTitle == $scope.postTitle) {
                        return item
                    }
                }

                $scope.getCount = function() {
                    if ($scope.postTitle != "") {
                        return filterFilter($scope.allFollows, { postTitle: $scope.postTitle }).length;
                    }

                }

                $scope.emptyOrNull = function(item) {
                    if ($scope.type == "true") {
                        return (item.lecturers === null)
                    } else {
                        return !(item.lecturers === null)
                    }
                }

                $scope.getCountStudentNoFollow = function() {
                    studentService.getCountStudentNoFollow()
                        .then(function(response) {
                            //
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getStudentNoInternshipTerm = function() {
                    studentService.getStudentNoInternshipTerm()
                        .then(function(response) {
                            $scope.noFollows = response.data;
                            $scope.totalItemsnoFollows = response.data.length;
                            $scope.currentPagenoFollows = 1;
                            $scope.entryLimitnoFollows = 25;
                            if ($scope.entryLimitnoFollows > $scope.totalItemsnoFollows) {
                                $scope.entryLimitnoFollows = $scope.totalItemsnoFollows;
                            }
                            $scope.noOfPagesnoFollows = Math.ceil($scope.totalItemsnoFollows / $scope.entryLimitnoFollows);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filterednoFollows = filterFilter($scope.noFollows, newVal);
                                $scope.totalItemsnoFollows = $scope.filterednoFollows.length;
                                $scope.noOfPagesnoFollows = Math.ceil($scope.totalItemsnoFollows / $scope.entryLimitnoFollows);
                                $scope.currentPagenoFollows = 1;
                            }, true);
                        })
                }



                $scope.removeLecturers = function(studentId) {
                    studentService.removeLecturers(studentId)
                        .then(function() {
                            $('#delete_student').trigger('click');
                            $scope.alertSuccess("Xóa giảng viên cho sinh viên thành công!", "");
                            $('#lecturers_' + studentId).text("");
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "danger_edit");
                        })
                }

                $scope.deleteIntern = function(internId, studentId) {
                    internService.deleteIntern(internId)
                        .then(function(response) {
                            $('#delete_student').trigger('click');
                            $('#close_modal_delete_intern').trigger('click');
                            $scope.alertSuccess("Xóa internship thành công!", "");
                            $('.internship_' + studentId).text("");
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "danger_edit");
                        })
                }

                $scope.createInternship = function() {
                    if ($scope.intern.partnerId == 'other' || $scope.intern.partnerNotFitId == 'other') {
                        $scope.intern.partnerId = 0;
                    }
                    if ($scope.intern.partnerNotFitId != 'other') {
                        $scope.intern.partnerId = $scope.intern.partnerNotFitId;
                    }
                    internService.createIntern($scope.intern)
                        .then(function(response) {
                            $scope.alertSuccess("Tạo internship thành công!", "");
                            $scope.intern = {};
                            $scope.getAllStudentByInternshipTerm();
                            if ($scope.intern.partnerNotFitId == 'other') {
                                $scope.getNameAndIdOfPartners;
                            }
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
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
                $scope.entrynoFollows = '';
                $scope.paginatenoFollows = function() {
                    if ($scope.entrynoFollows != '') {
                        if ($scope.entrynoFollows > $scope.totalItemsnoFollows) {
                            $scope.entryLimitnoFollows = $scope.totalItemsnoFollows;
                        } else {
                            $scope.entryLimitnoFollows = $scope.entrynoFollows;
                        }
                        $scope.noOfPagesnoFollows = Math.ceil($scope.totalItemsnoFollows / $scope.entryLimitnoFollows);
                    } else {
                        $scope.entryLimitnoFollows = 25;
                        if ($scope.entryLimitnoFollows > $scope.totalItemsnoFollows) {
                            $scope.entryLimitnoFollows = $scope.totalItemsnoFollows;
                        }
                        $scope.noOfPagesnoFollows = Math.ceil($scope.totalItemsnoFollows / $scope.entryLimitnoFollows);
                    }
                }

                $scope.getAllStudentNoLecturers = function() {
                    internService.getAllStudentNoLecturers()
                        .then(function(response) {
                            $scope.propertyName = '-infoBySchool.studentClass';
                            $scope.reverse = true;
                            $scope.allStudentNoLecturers = response.data;
                            $scope.allStudentNoLecturers = orderBy($scope.allStudentNoLecturers, $scope.propertyName, $scope.reverse);
                            $scope.totalItems = response.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 25;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.allStudentNoLecturers, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getAllStudentNoLecturersLastInternshipTerm = function() {
                    internService.getAllStudentNoLecturersLastInternshipTerm()
                        .then(function(response) {
                            $scope.propertyName = '-infoBySchool.studentClass';
                            $scope.reverse = true;
                            $scope.allStudentNoLecturers = response.data;
                            $scope.allStudentNoLecturers = orderBy($scope.allStudentNoLecturers, $scope.propertyName, $scope.reverse);
                            $scope.totalItems = response.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 25;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.allStudentNoLecturers, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getNameAndIdOfLecturers = function() {
                    internService.getNameAndIdOfLecturers()
                        .then(function(response) {
                            $scope.nameAndIdOfLecturers = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getNameAndIdOfPartnersFit = function() {
                    internService.getNameAndIdOfPartners("true")
                        .then(function(response) {
                            $scope.nameAndIdPartnersFit = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getNameAndIdOfPartners = function() {
                    internService.getNameAndIdOfPartners("false")
                        .then(function(response) {
                            $scope.nameAndIdPartners = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.saveScore = function(id) {
                    var diem = $('#input_diem_' + id).val();
                    if (!isNaN(diem)) {
                        var index = $scope.allStudents.findIndex(x => x.id === id);
                        if (index != -1) {
                            studentService.addScore($scope.allStudents[index].internship.id, diem)
                                .then(function() {
                                    $('#diem_thuc_tap_' + id).html(diem);
                                })
                        }
                    }

                }

                $scope.cancel = function(id) {
                    var index = $scope.allStudents.findIndex(x => x.id === id);
                    if (index != -1) {
                        if ($scope.allStudents[index].internship.score == null) {
                            $('#diem_thuc_tap_' + id).html('<td class=" " id="diem_thuc_tap_' + id + '">Chưa có</td>');
                        } else {
                            $('#diem_thuc_tap_' + id).html('<td class=" " id="diem_thuc_tap_' + id + '">' + $scope.allStudents[index].internship.score + '</td>');
                        }
                    }
                }

                $scope.addScore = function() {
                    angular.forEach($scope.allStudents, function(intern) {
                        if (intern.internship == null) {
                            intern.internship = {};
                        }

                        htmlVar = '<input type="text" style="width: 40px; padding-right: 7px;" id="input_diem_' + intern.id + '">    ' +
                            '<button ng-click="saveScore(' + intern.id + ')" class="btn btn-success btn-xs" style="padding-left: 10px;">Lưu</button>' +
                            '<button class="btn btn-danger btn-xs" ng-click="cancel(' + intern.id + ')">Hủy</button>';

                        if ($('#diem_thuc_tap_' + intern.id).text().indexOf('Chưa có') != -1 && $('#bao_cao_' + intern.id).text().indexOf('View') != -1) {
                            $('#diem_thuc_tap_' + intern.id).html($compile(htmlVar)($scope));
                        }
                    })
                }

                $scope.getInternOfLecturers = function() {
                    internService.getInternOfLecturers($rootScope.lecturersId)
                        .then(function(response) {
                            $scope.allStudents = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.addLecturersStudent = function() {
                    internService.addLecturersStudent($scope.listStudent, $scope.lecturers.lecturersId)
                        .then(function() {
                            $scope.alertSuccess("Thêm giảng viên thành công!", "");
                            $scope.getAllStudentNoLecturers();
                            $scope.listStudent = [];
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, "");
                        })
                }

                $scope.getAllLecturers = function() {
                    lecturersService.getAllLecturers()
                        .then(function(response) {
                            $scope.allLecturers = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }
                $scope.listStudent = [];

                $scope.addStudent = function(student) {
                    if (student.checked == true) {
                        $scope.listStudent.push({
                            id: student.id,
                            studentName: student.fullName,
                            emailVNU: student.infoBySchool.emailvnu
                        })
                    } else {
                        var index = $scope.listStudent.findIndex(x => x.id === student.id)
                        $scope.listStudent.splice(index, 1);

                    }
                }

                $scope.removeStudent = function(index, studentId) {
                    $scope.listStudent.splice(index, 1);
                    var index = $scope.allStudents.findIndex(x => x.id === studentId)
                    $scope.allStudents[index].checked = false;
                }

                $scope.createListStudentToAddLecturers = function() {
                    $scope.listStudent = [];
                    angular.forEach($scope.allInterns, function(intern) {
                        if (intern.checked == true) {
                            $scope.listStudent.push({
                                id: intern.id,
                                studentName: intern.student.fullName
                            })
                        }
                    });
                }

                $scope.getAllInternshipTerm = function() {
                    internService.getAllInternshipTerm()
                        .then(function(response) {
                            $scope.allInternshipTerm = response.data;
                            $rootScope.lastInternshipTermId = $scope.allInternshipTerm[$scope.allInternshipTerm.length - 1].id;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getAllPost = function() {
                    partnerService.loadAllPostByInternshipTerm(1)
                        .then(function(response) {
                            $scope.allposts = response.data;
                        })
                }

                $scope.selectPost = function(postId) {
                    $scope.postId = postId;
                }

                $scope.asd = function() {
                    angular.forEach($scope.listStudent, function(student) {
                        studentService.addFollow(student.emailVNU, $scope.postId)
                            .then(function() {

                            }, function(errors) {
                                console.log(student);
                            })
                    })
                }

                $scope.getAllStudentByInternshipTerm = function(lastInternshipTerm) {
                    if ($stateParams.internshipTermId == undefined && lastInternshipTerm == undefined) {
                        internService.getAllInternshipTerm()
                            .then(function(response) {
                                $scope.allInternshipTerm = response.data;
                                length = $scope.allInternshipTerm.length - 1;
                                $scope.lastInternTermId = $scope.allInternshipTerm[length].id;
                                internService.getAllStudentByInternshipTerm($scope.lastInternTermId)
                                    .then(function(response) {
                                        $scope.allStudents = response.data;
                                        $scope.propertyName = '-infoBySchool.studentClass';
                                        $scope.reverse = true;
                                        $scope.allStudents = orderBy($scope.allStudents, $scope.propertyName, $scope.reverse);
                                        angular.forEach($scope.allStudents, function(student) {
                                            student.show = true;
                                            student.checked = false;
                                        })
                                        $scope.internshipName = " Đợt " + $scope.allInternshipTerm[length].term + " năm " + $scope.allInternshipTerm[length].year;
                                        $scope.totalItems = response.data.length;
                                        $scope.currentPage = 1;
                                        $scope.entryLimit = 10;
                                        if ($scope.entryLimit > $scope.totalItems) {
                                            $scope.entryLimit = $scope.totalItems;
                                        }
                                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                                        $scope.$watch('search', function(newVal, oldVal) {
                                            $scope.filtered = filterFilter($scope.allStudents, newVal);
                                            $scope.totalItems = $scope.filtered.length;
                                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                            $scope.currentPage = 1;
                                        }, true);
                                    }, function(error) {
                                        console.log(error);
                                    })
                            }, function(error) {
                                console.log(error);
                            });
                    } else if (lastInternshipTerm != undefined && lastInternshipTerm != "") {
                        if (lastInternshipTerm == 'all') {

                        } else {
                            $scope.lastInternshipTerm = JSON.parse(lastInternshipTerm);
                            internService.getAllStudentByInternshipTerm($scope.lastInternshipTerm.id)
                                .then(function(response) {
                                    $scope.allStudents = response.data;
                                    $scope.internshipName = " Đợt " + $scope.lastInternshipTerm.term + " năm " + $scope.lastInternshipTerm.year;
                                    $scope.totalItems = response.data.length;
                                    $scope.currentPage = 1;
                                    $scope.entryLimit = 25;
                                    if ($scope.entryLimit > $scope.totalItems) {
                                        $scope.entryLimit = $scope.totalItems;
                                    }
                                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                                    $scope.$watch('search', function(newVal, oldVal) {
                                        $scope.filtered = filterFilter($scope.allStudents, newVal);
                                        $scope.totalItems = $scope.filtered.length;
                                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                        $scope.currentPage = 1;
                                    }, true);
                                }, function(error) {
                                    console.log(error);
                                })
                        }

                    } else if ($stateParams.internshipTermId != undefined) {
                        internService.getAllStudentByInternshipTerm($stateParams.internshipTermId)
                            .then(function(response) {
                                $scope.allStudents = response.data;
                            }, function(error) {
                                console.log(error);
                            })
                    }

                }

                $scope.getAllInternshipByInternshipTerm = function() {
                    internService.getAllInternshipByInternshipTerm($stateParams.internshipTermId)
                        .then(function(response) {
                            $scope.allInterns = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.loadAllInternshipTermPost = function(internshipTermId) {
                    internService.loadPostOfInternshipTerm(internshipTermId)
                        .then(function(response) {
                            $scope.allPosts = response.data;
                        }, function(error) {
                            console.log(error);
                        });
                }

                $scope.closePost = function() {
                    $scope.show_post = false;
                };

                $scope.showPost = function(post) {
                    $scope.show_post = true;
                    $scope.post = post;
                };

                $scope.alertDate = function() {
                    //
                }

                $scope.createInternshipTerm = function() {
                    if ($scope.input.year != "" && $scope.input.startDate != "" && $scope.input.endDate != "") {
                        console.log($scope.input.startDate)
                        internService.createInternshipTerm($scope.input)
                            .then(function(response) {
                                $scope.alertSuccess("Tạo kì thực tập thành công!", "")
                                $scope.input.year = "";
                                $scope.input.endDate = "";
                                $scope.input.startDate = "";
                                $scope.getAllInternshipTerm();
                            }, function(error) {
                                $scope.alertDanger(error.message, "")
                            });
                    }
                }

                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.altInputFormats = ['M!/d!/yyyy'];
                $scope.dateOptions = {
                    // dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1
                };

                $scope.open2 = function() {
                    $scope.popup2 = {};
                    $scope.popup2.opened = true;
                };

                $scope.editInternshipTerm = function(startDate, endDate, internshipTermId) {
                    startDate = new Date();
                    $('#internshipTerm_' + internshipTermId).val(startDate);
                    var curr_date = startDate.getDate();
                    var curr_month = startDate.getMonth() + 1; //Months are zero based
                    var curr_year = startDate.getFullYear();
                    startDate = curr_year + "-" + curr_month + "-" + curr_date;
                }

                $scope.saveEditinternshipTerm = function(internshipTerm) {
                    internService.editInternshipTerm(internshipTerm)
                        .then(function() {
                            $scope.alertSuccess("Sửa kì thực tập thành công!", "");
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }



                $scope.comfirmDelete = function(id) {
                    $scope.comfirmDeleteId = id;
                }

                $scope.deleteInternshipTerm = function(id) {
                    internService.deleteInternshipTerm(id)
                        .then(function() {
                            $('#close_modal_delete_internship_term').trigger('click');
                            $scope.alertSuccess("Xóa kì thực tập thành công!", "");
                            $scope.getAllInternshipTerm();
                        }, function(error) {
                            $('#close_modal_delete_internship_term').trigger('click');
                            $scope.alertDanger("Không thể xóa kì thực tập này!", "");
                        })
                }

                $scope.convertStudent1 = function() {
                    var xlf = document.getElementById('xlf1');

                    function handleFile(e) {
                        var files = e.target.files;
                        var i, f;
                        for (i = 0, f = files[i]; i != files.length; ++i) {
                            var reader = new FileReader();
                            var name = f.name;
                            reader.onload = function(e) {
                                var data = e.target.result;

                                var workbook = XLSX.read(data, { type: 'binary' });

                                var first_sheet_name = workbook.SheetNames[0];
                                /* DO SOMETHING WITH workbook HERE */
                                var worksheet = workbook.Sheets[first_sheet_name];
                                worksheet['A1'].w = "fullName";
                                $rootScope.excelStudent1 = XLSX.utils.sheet_to_json(worksheet);
                            };
                            reader.readAsBinaryString(f);
                        }
                    }
                    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
                }

                $scope.convertStudent2 = function() {
                    var xlf = document.getElementById('xlf2');

                    function handleFile(e) {
                        var files = e.target.files;
                        var i, f;
                        for (i = 0, f = files[i]; i != files.length; ++i) {
                            var reader = new FileReader();
                            var name = f.name;
                            reader.onload = function(e) {
                                var data = e.target.result;

                                var workbook = XLSX.read(data, { type: 'binary' });

                                var first_sheet_name = workbook.SheetNames[0];
                                /* DO SOMETHING WITH workbook HERE */
                                var worksheet = workbook.Sheets[first_sheet_name];
                                worksheet['A1'].w = "fullName";
                                $rootScope.excelStudent2 = XLSX.utils.sheet_to_json(worksheet);
                            };
                            reader.readAsBinaryString(f);
                        }
                    }
                    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
                }

                $scope.checkStudent = function() {
                    $scope.student1 = $rootScope.excelStudent1;
                    $scope.student2 = $rootScope.excelStudent2;
                    var stt = 1;
                    angular.forEach($scope.student1, function(v) {
                        if (v.fullName != undefined) {
                            v.fullName = v.fullName.trim().toLowerCase();
                        } else {
                            console.log(v);
                        }

                    })
                    angular.forEach($scope.student2, function(v) {
                        if (v.fullName != undefined) {
                            v.fullName = v.fullName.trim().toLowerCase();
                        } else {
                            console.log(v);
                        }
                    })
                    angular.forEach($scope.student2, function(student2) {
                        student2.stt = stt;
                        var index = $scope.student1.findIndex(x => x.fullName === student2.fullName)
                        if (index != -1) {
                            student2.checked = true;
                            $scope.student1[index].checked = true;
                        }
                        stt++;
                    });

                    angular.forEach($scope.student2, function(student) {
                        if (student.checked != true) {
                            console.log(student.stt + "-" + student.fullName);
                            $('#student_2_' + student.stt).css('background-color', '#f0ad4e');
                        }
                    });
                    angular.forEach($scope.student1, function(student) {
                        if (student.checked != true) {
                            $('#student_1_' + student.stt).css('background-color', '#f0ad4e');
                        }
                    });
                }

                $scope.convertNolecturers = function() {
                    var xlf = document.getElementById('xlf');

                    function handleFile(e) {
                        var files = e.target.files;
                        var i, f;
                        for (i = 0, f = files[i]; i != files.length; ++i) {
                            var reader = new FileReader();
                            var name = f.name;
                            reader.onload = function(e) {
                                var data = e.target.result;

                                var workbook = XLSX.read(data, { type: 'binary' });

                                var first_sheet_name = workbook.SheetNames[0];
                                /* DO SOMETHING WITH workbook HERE */
                                var worksheet = workbook.Sheets[first_sheet_name];
                                worksheet['A1'].w = "stt";
                                worksheet['B1'].w = "fullName";
                                worksheet['C1'].w = "class";
                                worksheet['D1'].w = "email";
                                worksheet['E1'].w = "lecturers";
                                worksheet['F1'].w = "lecturersEmail";
                                $rootScope.excel = XLSX.utils.sheet_to_json(worksheet);
                            };
                            reader.readAsBinaryString(f);
                        }
                    }
                    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
                }

                $scope.editEmail = function($event, data) {
                    if ($event.keyCode == 13) {
                        data.editEmail = data.stt;
                    }
                }
                $scope.editLecturers = function($event, data) {
                    if ($event.keyCode == 13) {
                        data.editLecturers = data.stt;
                    }
                }

                $scope.checkData = function() {
                    if ($scope.noLecturers == undefined) {
                        $scope.noLecturers = $rootScope.excel;
                    }
                    if ($scope.error != undefined) {
                        if ($scope.errors.length != 0) {
                            angular.forEach($scope.errors, function(v) {
                                $('#email_' + v.stt).css('background-color', '');
                                $('#lecturers_email_' + v.stt).css('background-color', '');
                            });
                        }
                    }
                    $scope.errors = [];
                    studentService.checkExcelLecturersAssignment($scope.noLecturers)
                        .then(function(response) {
                            angular.forEach(response.data, function(v) {
                                var count = 0;
                                if (v.email == 'nf') {
                                    $('#email_' + v.stt).css('background-color', '#f0ad4e');
                                    count++;
                                }
                                if (v.lecturersEmail == 'nf') {
                                    $('#lecturers_email_' + v.stt).css('background-color', '#f0ad4e');
                                    count++;
                                }
                                if (count != 0) {
                                    $scope.error = {
                                        error: "Dữ liệu ở dòng " + v.stt + " chưa chính xác",
                                        stt: v.stt
                                    };
                                    $scope.errors.push($scope.error);
                                }
                            })
                            console.log($scope.errors);
                            if ($scope.errors.length == 0) {
                                $scope.checkExcel = true;
                            } else {
                                $scope.checkExcel = false;
                            }
                        }, function(error) {
                            console.log(error);
                        })
                }


                $scope.upload = function() {
                    studentService.LecturersAssignmentExcel($scope.noLecturers)
                        .then(function() {
                            $scope.alertSuccess("Thêm giảng viên thành công!", "");
                            $scope.noLecturers = undefined;
                            $rootScope.excel = undefined;
                            $scope.getAllStudentNoLecturersLastInternshipTerm();
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger("Có lỗi xảy ra, hãy thử kiểm tra lại danh sách!", "");
                        })
                }

                $scope.getAllStudentClass = function() {
                    studentService.getAllStudentClass()
                        .then(function(response) {
                            $scope.allStudentClass = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.changedownloadType = function(downloadTypeLecturers, downloadType) {
                    if (downloadType == "") {
                        $scope.st.infoBySchool.studentClass = "";
                    }
                }

                $scope.changedownload = function(downloadType) {
                    if (downloadType == "") {
                        $scope.st.infoBySchool.studentClass = "";
                    }
                }

                $scope.exportDataNoLecturers = function() {
                    var count = 0;
                    var wb = {};
                    wb.Sheets = {};
                    wb.SheetNames = [];
                    /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
                    var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
                    var wscols = [];
                    wscols[1] = { wpx: 150 };
                    wscols[2] = { wpx: 100 };
                    wscols[3] = { wpx: 200 };
                    wscols[4] = { wpx: 200 };
                    wscols[5] = { wpx: 100 };
                    wscols[6] = { wpx: 200 };
                    wscols[7] = { wpx: 200 };
                    var ws = { '!ref': "A1:H" + ($scope.allStudents.length + 1) };
                    ws['!cols'] = wscols;
                    var i = 2;
                    ws['A1'] = {
                        h: "STT",
                        r: "STT",
                        t: "s",
                        v: "STT",
                        w: "STT"
                    };
                    ws['B1'] = {
                        h: "Họ và tên",
                        r: "Họ và tên",
                        t: "s",
                        v: "Họ và tên",
                        w: "Họ và tên"
                    };
                    ws['C1'] = {
                        h: "Lớp",
                        r: "Lớp",
                        t: "s",
                        v: "Lớp",
                        w: "Lớp"
                    };
                    ws['D1'] = {
                        h: "VNU email",
                        r: "VNU email",
                        t: "s",
                        v: "VNU email",
                        w: "VNU email"
                    };
                    ws['D1'] = {
                        h: "VNU email",
                        r: "VNU email",
                        t: "s",
                        v: "VNU email",
                        w: "VNU email"
                    };
                    ws['D1'] = {
                        h: "VNU email",
                        r: "VNU email",
                        t: "s",
                        v: "VNU email",
                        w: "VNU email"
                    };
                    ws['E1'] = {
                        h: "Email",
                        r: "Email",
                        t: "s",
                        v: "Email",
                        w: "Email"
                    };
                    ws['F1'] = {
                        h: "Phone",
                        r: "Phone",
                        t: "s",
                        v: "Phone",
                        w: "Phone"
                    };
                    ws['G1'] = {
                        h: "Giảng viên",
                        r: "Giảng viên",
                        t: "s",
                        v: "Giảng viên",
                        w: "Giảng viên"
                    };
                    ws['H1'] = {
                        h: "Email vnu của giảng viên",
                        r: "Email vnu của giảng viên",
                        t: "s",
                        v: "Email vnu của giảng viên",
                        w: "Email vnu của giảng viên"
                    };
                    ws['I1'] = {
                        h: "Nơi thực tập",
                        r: "Nơi thực tập",
                        t: "s",
                        v: "Nơi thực tập",
                        w: "Nơi thực tập"
                    };
                    var stt = 1;
                    angular.forEach($scope.allStudents, function(student) {
                        if (student.infoBySchool.studentClass == null) {
                            student.infoBySchool.studentClass = "";
                        }
                        if ($scope.downloadTypeLecturers == "") {
                            if (student.infoBySchool.studentClass.toLowerCase().indexOf($scope.st.infoBySchool.studentClass.toLowerCase()) != -1 || $scope.st.infoBySchool.studentClass == "") {
                                ws['A' + i] = {
                                    h: stt,
                                    r: stt,
                                    t: "s",
                                    v: stt,
                                    w: stt,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                                ws['B' + i] = {
                                    h: student.fullName,
                                    r: student.fullName,
                                    t: "s",
                                    v: student.fullName,
                                    w: student.fullName,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                                if (student.infoBySchool.studentClass == null) {
                                    student.infoBySchool.studentClass = "";
                                }
                                if (student.infoBySchool.grade == null) {
                                    student.infoBySchool.grade = "";
                                }
                                ws['C' + i] = {
                                    h: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                    r: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                    t: "s",
                                    v: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                    w: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };

                                ws['D' + i] = {
                                    h: student.infoBySchool.emailvnu,
                                    r: student.infoBySchool.emailvnu,
                                    t: "s",
                                    v: student.infoBySchool.emailvnu,
                                    w: student.infoBySchool.emailvnu,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                                if (student.email != null) {

                                    ws['E' + i] = {
                                        h: student.email,
                                        r: student.email,
                                        t: "s",
                                        v: student.email,
                                        w: student.email,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                }
                                if (student.phoneNumber != null) {
                                    ws['F' + i] = {
                                        h: student.phoneNumber,
                                        r: student.phoneNumber,
                                        t: "s",
                                        v: student.phoneNumber,
                                        w: student.phoneNumber,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                }
                                if (student.lecturers != null) {
                                    ws['G' + i] = {
                                        h: student.lecturers.fullName,
                                        r: student.lecturers.fullName,
                                        t: "s",
                                        v: student.lecturers.fullName,
                                        w: student.lecturers.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    ws['H' + i] = {
                                        h: student.lecturers.emailVNU,
                                        r: student.lecturers.emailVNU,
                                        t: "s",
                                        v: student.lecturers.emailVNU,
                                        w: student.lecturers.emailVNU,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                }

                                i++;
                                count++;
                                stt++;
                            }
                        } else if ($scope.downloadTypeLecturers == "noLecturers") {
                            if (student.infoBySchool.studentClass.toLowerCase().indexOf($scope.st.infoBySchool.studentClass.toLowerCase()) != -1 || $scope.st.infoBySchool.studentClass == "") {
                                if (student.lecturers == null) {
                                    ws['A' + i] = {
                                        h: stt,
                                        r: stt,
                                        t: "s",
                                        v: stt,
                                        w: stt,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    ws['B' + i] = {
                                        h: student.fullName,
                                        r: student.fullName,
                                        t: "s",
                                        v: student.fullName,
                                        w: student.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (student.infoBySchool.studentClass == null) {
                                        student.infoBySchool.studentClass = "";
                                    }
                                    if (student.infoBySchool.grade == null) {
                                        student.infoBySchool.grade = "";
                                    }
                                    ws['C' + i] = {
                                        h: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                        r: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                        t: "s",
                                        v: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                        w: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };

                                    ws['D' + i] = {
                                        h: student.infoBySchool.emailvnu,
                                        r: student.infoBySchool.emailvnu,
                                        t: "s",
                                        v: student.infoBySchool.emailvnu,
                                        w: student.infoBySchool.emailvnu,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (student.email != null) {

                                        ws['E' + i] = {
                                            h: student.email,
                                            r: student.email,
                                            t: "s",
                                            v: student.email,
                                            w: student.email,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    if (student.phoneNumber != null) {
                                        ws['F' + i] = {
                                            h: student.phoneNumber,
                                            r: student.phoneNumber,
                                            t: "s",
                                            v: student.phoneNumber,
                                            w: student.phoneNumber,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }

                                    i++;
                                    count++;
                                    stt++;
                                }
                            }
                        } else if ($scope.downloadTypeLecturers == "lecturers") {
                            if (student.infoBySchool.studentClass.toLowerCase().indexOf($scope.st.infoBySchool.studentClass.toLowerCase()) != -1 || $scope.st.infoBySchool.studentClass == "") {
                                if (student.lecturers != null) {
                                    ws['A' + i] = {
                                        h: stt,
                                        r: stt,
                                        t: "s",
                                        v: stt,
                                        w: stt,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    ws['B' + i] = {
                                        h: student.fullName,
                                        r: student.fullName,
                                        t: "s",
                                        v: student.fullName,
                                        w: student.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (student.infoBySchool.studentClass == null) {
                                        student.infoBySchool.studentClass = "";
                                    }
                                    if (student.infoBySchool.grade == null) {
                                        student.infoBySchool.grade = "";
                                    }
                                    ws['C' + i] = {
                                        h: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                        r: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                        t: "s",
                                        v: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                        w: student.infoBySchool.grade + student.infoBySchool.studentClass,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };

                                    ws['D' + i] = {
                                        h: student.infoBySchool.emailvnu,
                                        r: student.infoBySchool.emailvnu,
                                        t: "s",
                                        v: student.infoBySchool.emailvnu,
                                        w: student.infoBySchool.emailvnu,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };

                                    if (student.email != null) {

                                        ws['E' + i] = {
                                            h: student.email,
                                            r: student.email,
                                            t: "s",
                                            v: student.email,
                                            w: student.email,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    if (student.phoneNumber != null) {
                                        ws['F' + i] = {
                                            h: student.phoneNumber,
                                            r: student.phoneNumber,
                                            t: "s",
                                            v: student.phoneNumber,
                                            w: student.phoneNumber,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    ws['G' + i] = {
                                        h: student.lecturers.fullName,
                                        r: student.lecturers.fullName,
                                        t: "s",
                                        v: student.lecturers.fullName,
                                        w: student.lecturers.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    ws['H' + i] = {
                                        h: student.lecturers.emailVNU,
                                        r: student.lecturers.emailVNU,
                                        t: "s",
                                        v: student.lecturers.emailVNU,
                                        w: student.lecturers.emailVNU,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };


                                    i++;
                                    count++;
                                    stt++;
                                }
                            }
                        }

                    });
                    wb.SheetNames.push('Student List');
                    wb.Sheets['Student List'] = ws;

                    var wbout = XLSX.write(wb, wopts);

                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }
                    if (count == 0) {
                        $scope.alertWarning("Tên lớp không trùng!", 5000);
                    } else {
                        if ($scope.st.infoBySchool.studentClass == "") {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Student List - All.xlsx")
                        } else {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Registration List - " + $scope.st.infoBySchool.studentClass + ".xlsx");
                        }
                        $scope.alertSuccess("Xuất danh sách thành công!", "");
                        $scope.st.infoBySchool.studentClass = "";
                    }
                };

                $scope.exportDataRegistration = function() {
                    var count = 0;
                    var wb = {};
                    wb.Sheets = {};
                    wb.SheetNames = [];
                    /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
                    var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
                    var wscols = [];
                    wscols[0] = { wpx: 200 };
                    wscols[1] = { wpx: 150 };
                    wscols[2] = { wpx: 100 };
                    wscols[3] = { wpx: 200 };
                    wscols[4] = { wpx: 200 };
                    wscols[5] = { wpx: 200 };
                    wscols[6] = { wpx: 150 };
                    var ws = { '!ref': "A1:H" + ($scope.allFollows.length + 1) };
                    ws['!cols'] = wscols;
                    var i = 2;
                    ws['A1'] = {
                        h: "Student Name",
                        r: "Student Name",
                        t: "s",
                        v: "Student Name",
                        w: "Student Name"
                    };
                    ws['B1'] = {
                        h: "Student Code",
                        r: "Student Code",
                        t: "s",
                        v: "Student Code",
                        w: "Student Code"
                    };
                    ws['C1'] = {
                        h: "Class",
                        r: "Class",
                        t: "s",
                        v: "Class",
                        w: "Class"
                    };
                    ws['D1'] = {
                        h: "VNU email",
                        r: "VNU email",
                        t: "s",
                        v: "VNU email",
                        w: "VNU email"
                    };
                    ws['E1'] = {
                        h: "Email",
                        r: "Email",
                        t: "s",
                        v: "Email",
                        w: "Email"
                    };
                    ws['F1'] = {
                        h: "Phone",
                        r: "Phone",
                        t: "s",
                        v: "Phone",
                        w: "Phone"
                    };
                    ws['G1'] = {
                        h: "Company",
                        r: "Company",
                        t: "s",
                        v: "Company",
                        w: "Company"
                    };
                    ws['H1'] = {
                        h: "Type",
                        r: "Type",
                        t: "s",
                        v: "Type",
                        w: "Type"
                    };
                    var name = "";
                    angular.forEach($scope.allFollows, function(follow) {
                        if ($scope.postTitle != "") {
                            if (follow.postTitle == $scope.postTitle) {
                                if (follow.partnerName.toLowerCase().indexOf($scope.search.toLowerCase()) != -1 || $scope.search == "") {
                                    name = follow.partnerName;
                                    ws['A' + i] = {
                                        h: follow.student.fullName,
                                        r: follow.student.fullName,
                                        t: "s",
                                        v: follow.student.fullName,
                                        w: follow.student.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (follow.student.infoBySchool.studentCode != null) {
                                        ws['B' + i] = {
                                            h: follow.student.infoBySchool.studentCode,
                                            r: follow.student.infoBySchool.studentCode,
                                            t: "s",
                                            v: follow.student.infoBySchool.studentCode,
                                            w: follow.student.infoBySchool.studentCode,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }

                                    if (follow.student.infoBySchool.studentClass != null) {
                                        ws['C' + i] = {
                                            h: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                            r: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                            t: "s",
                                            v: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                            w: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }

                                    ws['D' + i] = {
                                        h: follow.student.infoBySchool.emailvnu,
                                        r: follow.student.infoBySchool.emailvnu,
                                        t: "s",
                                        v: follow.student.infoBySchool.emailvnu,
                                        w: follow.student.infoBySchool.emailvnu,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (follow.student.email != null) {
                                        ws['E' + i] = {
                                            h: follow.student.email,
                                            r: follow.student.email,
                                            t: "s",
                                            v: follow.student.email,
                                            w: follow.student.email,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    if (follow.student.phoneNumber != null) {
                                        ws['F' + i] = {
                                            h: follow.student.phoneNumber,
                                            r: follow.student.phoneNumber,
                                            t: "s",
                                            v: follow.student.phoneNumber,
                                            w: follow.student.phoneNumber,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    ws['G' + i] = {
                                        h: follow.partnerName,
                                        r: follow.partnerName,
                                        t: "s",
                                        v: follow.partnerName,
                                        w: follow.partnerName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if ($scope.typeName == "" || $scope.typeName == undefined) {
                                        ws['H' + i] = {
                                            h: follow.postTitle,
                                            r: follow.postTitle,
                                            t: "s",
                                            v: follow.postTitle,
                                            w: follow.postTitle,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    } else {
                                        ws['H' + i] = {
                                            h: $scope.typeName,
                                            r: $scope.typeName,
                                            t: "s",
                                            v: $scope.typeName,
                                            w: $scope.typeName,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    i++;
                                    count++;
                                }
                            }
                        } else if (follow.partnerName.toLowerCase().indexOf($scope.search.toLowerCase()) != -1 || $scope.search == "") {
                            name = follow.partnerName;
                            ws['A' + i] = {
                                h: follow.student.fullName,
                                r: follow.student.fullName,
                                t: "s",
                                v: follow.student.fullName,
                                w: follow.student.fullName,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center"
                                    }
                                }
                            };
                            if (follow.student.infoBySchool.studentCode != null) {
                                ws['B' + i] = {
                                    h: follow.student.infoBySchool.studentCode,
                                    r: follow.student.infoBySchool.studentCode,
                                    t: "s",
                                    v: follow.student.infoBySchool.studentCode,
                                    w: follow.student.infoBySchool.studentCode,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }

                            if (follow.student.infoBySchool.studentClass != null) {
                                ws['C' + i] = {
                                    h: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    r: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    t: "s",
                                    v: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    w: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }

                            ws['D' + i] = {
                                h: follow.student.infoBySchool.emailvnu,
                                r: follow.student.infoBySchool.emailvnu,
                                t: "s",
                                v: follow.student.infoBySchool.emailvnu,
                                w: follow.student.infoBySchool.emailvnu,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center"
                                    }
                                }
                            };
                            if (follow.student.email != null) {
                                ws['E' + i] = {
                                    h: follow.student.email,
                                    r: follow.student.email,
                                    t: "s",
                                    v: follow.student.email,
                                    w: follow.student.email,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }
                            if (follow.student.phoneNumber != null) {
                                ws['F' + i] = {
                                    h: follow.student.phoneNumber,
                                    r: follow.student.phoneNumber,
                                    t: "s",
                                    v: follow.student.phoneNumber,
                                    w: follow.student.phoneNumber,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }

                            ws['G' + i] = {
                                h: follow.partnerName,
                                r: follow.partnerName,
                                t: "s",
                                v: follow.partnerName,
                                w: follow.partnerName,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center"
                                    }
                                }
                            };
                            if ($scope.typeName == "" || $scope.typeName == undefined) {
                                ws['H' + i] = {
                                    h: follow.postTitle,
                                    r: follow.postTitle,
                                    t: "s",
                                    v: follow.postTitle,
                                    w: follow.postTitle,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            } else {
                                ws['H' + i] = {
                                    h: $scope.typeName,
                                    r: $scope.typeName,
                                    t: "s",
                                    v: $scope.typeName,
                                    w: $scope.typeName,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }
                            i++;
                            count++;
                        }

                    });
                    wb.SheetNames.push('Registration List');
                    wb.Sheets['Registration List'] = ws;

                    var wbout = XLSX.write(wb, wopts);

                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }
                    if (count == 0) {
                        $scope.alertWarning("Tên cty chưa chính xác!", 5000);
                    } else {
                        if ($scope.search == "") {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Registration List - All.xlsx")
                        } else {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Registration List - " + name + ".xlsx");
                        }
                        $scope.alertSuccess("Xuất danh sách thành công!", "");
                    }
                };



                $scope.createListStudentToSendMessage = function(status) {
                    $scope.listStudent = [];
                    angular.forEach($scope.allFollows, function(follow) {
                        if (follow.checked == true) {
                            $scope.partnerName = follow.partnerName;
                            $scope.listStudent.push({
                                studentName: follow.studentName,
                                receiverId: follow.student.id,
                                partnerId: follow.partnerId,
                                postId: follow.postId
                            })
                        }
                    });
                    $scope.message = {};
                    if (status == 'fail') {
                        $scope.message.title = "Thông báo không được nhận thực tập";
                        $scope.message.content = "Bạn không được nhận " + $scope.partnerName + " làm thực tập.";
                    } else {
                        $scope.message.title = "Thông báo được nhận thực tập";
                        $scope.message.content = "Chúc mừng bạn có thể chọn " + $scope.partnerName + "để làm thực tập";
                    }
                }

                $scope.createFailInterviewMessage = function() {
                    angular.forEach($scope.listStudent, function(message) {
                        message.title = $scope.message.title;
                        message.content = $scope.message.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        message.messageType = "Normal";
                    });
                    messageService.createFailInterviewMessage($scope.listStudent)
                        .then(function(response) {
                            $('#close_send_fail_interview_message').trigger('click');
                            $scope.alertSuccess("Gửi thông báo thành công!", "")
                            $scope.getAllFollow();
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, "");
                            $('#close_send_fail_interview_message').trigger('click');
                        })
                }

                $scope.sendMessage = function() {
                    angular.forEach($scope.listStudent, function(message) {
                        message.title = $scope.message.title;
                        message.content = $scope.message.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        message.messageType = "PassInterview";
                    });
                    messageService.createPassInterviewMessage($scope.listStudent)
                        .then(function(response) {
                            $scope.alertSuccess("Gửi thông báo thành công!", "successdelete_edit")
                            $scope.getAllFollow();
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.selectStudent = false;
                $scope.selectAllStudent = function(data) {
                    $scope.selectStudent = !$scope.selectStudent;
                    if (data != undefined) {
                        angular.forEach(data, function(student){
                            student.checked = $scope.selectStudent;
                        })
                    } else {
                        if ($scope.search == "") {
                            angular.forEach($scope.allFollows, function(follow) {
                                follow.checked = $scope.selectStudent;
                            });
                        } else {
                            angular.forEach($scope.allFollows, function(follow) {
                                if (follow.partnerName.toLowerCase().indexOf($scope.search.toLowerCase()) != -1) {
                                    follow.checked = $scope.selectStudent;
                                } else {
                                    follow.checked = false;
                                }
                            });
                        }
                    }

                }

                $scope.createListStudent = function(data){
                    $rootScope.listStudentOfLecturers = [];
                    angular.forEach(data, function(student){
                        if(student.checked == true){
                            $rootScope.listStudentOfLecturers.push(student);
                        }
                    })
                }

                $scope.checkChecked = function() {
                    angular.forEach($scope.allFollows, function(follow) {
                        //
                    });
                }

                $scope.getWaitInterviewFollow = function() {
                    studentService.getAllFollow()
                        .then(function(response) {
                            console.log(response.data);
                            $scope.allFollows = response.data;
                            $scope.totalItems = response.data.lefngth;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 25;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.allFollows, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getStudentByStudentCode = function() {
                    $scope.search = {};
                    studentService.getStudentByStudentCode($scope.search)
                        .then(function(response) {
                            $scope.allStudents = response.data;
                        }, function(error) {
                            console.log(error);
                            $scope.alertWarning("Không tìm có kết quả!", "");
                        })
                }

                $scope.deleteStudent = function(studentId) {
                    $('#close_modal_delete_student').trigger('click');
                    studentService.deleteStudent(studentId)
                        .then(function() {
                            $scope.alertSuccess("Xóa sinh viên thành công!", "");
                            $scope.getAllStudent($scope.page);
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, "");
                        })
                }

                $scope.confirmDelete = function(id, name, internId) {
                    $scope.confirmDeleteId = id;
                    $scope.confirmDeleteInternId = internId;
                    $scope.confirmDeleteName = name;
                }
                $scope.getAllStudent = function(page) {
                    $scope.page = page;
                    studentService.getAllStudent(page - 1, 20)
                        .then(function(response) {
                            $scope.allStudents = response.data.content;
                            $scope.pages = [];
                            var page = response.data.totalPages;
                            for (var i = 1; i <= page; i++) {
                                if (i == $scope.page) {
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
                                if ($scope.page == page) {
                                    $scope.nextPage = {
                                        class: "disabled",
                                        page: page
                                    };
                                } else {
                                    $scope.nextPage = {
                                        class: "",
                                        page: parseInt($scope.page) + 1
                                    };
                                }
                                if ($scope.page == 1) {
                                    $scope.previousPage = {
                                        class: "disabled",
                                        page: 1
                                    };
                                } else {
                                    $scope.previousPage = {
                                        class: "",
                                        page: $scope.page - 1
                                    };
                                }

                            }
                        })
                }



                $scope.saveOne = function() {
                    $scope.req = {
                        studentCode: $scope.student.studentCode,
                        major: $scope.student.major,
                        studentClass: $scope.student.studentClass,
                        diploma: $scope.student.diploma,
                        grade: $scope.student.grade,
                        graduationYear: $scope.student.graduationYear,
                        gpa: $scope.student.gpa,
                        studentName: $scope.student.studentName
                    };
                    studentService.saveData($scope.req, $scope.student.id)
                        .then(function(response) {
                            $('#close_modal_edit').trigger('click');
                            $scope.alertSuccess("Chỉnh sửa thông tin sinh viên thành công!", "");
                        }, function(error) {
                            $scope.alertDanger("Chỉnh sửa thông tin không thành công!", "danger");
                            console.log(error);
                        })
                };

                $scope.saveData_ = function() {
                    angular.forEach($scope.response, function(arr) {
                        if (arr.checked == true) {
                            studentService.saveData(arr, arr.id)
                                .then(function() {
                                    arr.checked = false;
                                }, function(error) {
                                    $scope.error = error;
                                })
                        }
                    })

                };
                $

                function showInput_(data, id) {
                    $('.' + data + '_' + id).after('<input type="text" value="' + data + '" ng-blur="hideInput(' + data + ',' + id + ')" ' +
                        'id="input_' + data + '_' + id + '">');
                $scope.hideInput = function(data, id) {
                    $('#input_' + data + '_' + id).remove();
                };
                $scope.selectId = function(v) {
                    if (v.checked != true) {
                        v.checked = true;
                    } else
                    if (v.checked == true) {
                        v.checked = false;
                    }
                };
                $scope.onChange = function(id) {
                    angular.forEach($scope.response, function(v) {
                        if (v.id == id && v.checked != true) {
                            v.checked = true;
                        }
                    });
                };
                $scope.selectAllId = false;
                $scope.selectAll = function() {
                    if ($scope.selectAllId == false) {
                        angular.forEach($scope.response, function(v) {
                            v.checked = true;
                        });
                        $scope.selectAllId = true;
                    } else {
                        angular.forEach($scope.response, function(v) {
                            v.checked = false;
                        });
                        $scope.selectAllId = false;
                    }
                };
                $scope.showInput = function() {
                    angular.forEach($scope.response, function(arr) {
                        if (arr.checked == true) {
                            showInput_(arr.studentCode, arr.id);
                            showInput_(arr.major, arr.id);
                            showInput_(arr.studentClass, arr.id);
                            showInput_(arr.diploma, arr.id);
                            showInput_(arr.grade, arr.id);
                            showInput_(arr.graduationYear, arr.id);
                        }
                    })
                };
                $scope.edit = function(data) {
                    $scope.student = data;
                };


                $scope.changeStatus = function(userId) {
                    studentService.changeStatus(userId)
                        .then(function() {
                            if ($scope.student.status == true) {
                                $scope.student.status = false;
                            } else {
                                $scope.student.status = true;
                            }
                            $scope.alertSuccess("Chuyển trạng thái thành công!", "successdelete_edit");
                        }, function(error) {
                            $scope.alertDanger("Có lỗi xảy ra, hãy reload lại trang và thử lại!", "danger");
                        })
                }

                $scope.convert = function() {
                    var xlf = document.getElementById('xlf');

                    function handleFile(e) {
                        var files = e.target.files;
                        var i, f;
                        for (i = 0, f = files[i]; i != files.length; ++i) {
                            var reader = new FileReader();
                            var name = f.name;
                            reader.onload = function(e) {
                                var data = e.target.result;

                                var workbook = XLSX.read(data, { type: 'binary' });

                                var first_sheet_name = workbook.SheetNames[0];
                                /* DO SOMETHING WITH workbook HERE */
                                var worksheet = workbook.Sheets[first_sheet_name];
                                $rootScope.excel = XLSX.utils.sheet_to_json(worksheet);
                            };
                            reader.readAsBinaryString(f);
                        }
                        $scope.setExcelTable();
                    }
                    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
                }

                $scope.setExcelTable = function() {
                    $scope.excelTable = $rootScope.excel;
                    angular.forEach($scope.excelTable, function(student) {
                        student.emailvnu = student.emailvnu.replace(/(?:@vnu.edu.vn|@gmail.com)/g, '');
                    })
                }


                $scope.alertWarning = function(warning, timeout) {
                    $scope.warningMessage = warning;
                    $scope.warning = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.warning = false;
                            $scope.warningMessage = "";
                        });
                    }, timeout);

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
 (function() {
     'use strict';

     angular.module('services')
         .factory('adminService', adminService);
     adminService.$inject = ['$log', '$http', '$q', '$rootScope'];

     function adminService($log, $http, $q, $rootScope) {
         return {
             getAllNotification: getAllNotification,
             loginAd: loginAd,
             logout: logout,
             getAllUser: getAllUser
         };
         function getAllNotification() {
             return $http({
                 url: $rootScope.serverAdd + '/notification/all/admin',
                 method: 'GET'
             })
         }

         function loginAd(data) {
             return $http({
                 url: $rootScope.serverAdd + '/admin/login',
                 method: 'POST',
                 data: data
             })
         }

         function logout() {
             return $http({
                 url: $rootScope.serverAdd + '/logout',
                 method: 'GET'
             })
         }
     }
 }());
angular.module('services').factory('httpRequestInterceptor', function ($rootScope, $q, $timeout) {
    return {
        request: function (requestConfig) {
            //default show toaster for all xhr, if some error doesn't need to show then set this var to false when handle failure
            $rootScope.showToaster = true;
            if (sessionStorage['Admin-Data']) {
                requestConfig.headers['auth-token'] = sessionStorage['Admin-Data'];
            }
            requestConfig.headers['Content-Type'] = 'application/json';
            //$rootScope.isShowOverlay = true;
            return requestConfig;
        },
        response: function (response) {
            // Do nothing on success response

            return response;
        },
        responseError: function (response) {

            return $q.reject(response);
        }
    };
});
angular.module('services').config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

 (function(){
    'use strict';
    angular.module('services')
        .factory('internService', internService);

    internService.$inject=['$log','$http','$q','$rootScope'];

    function internService($log,$http,$q,$rootScope){
        return {
            showAllIntern: showAllIntern,
            showIntern: showIntern,
            createIntern: createIntern,
            getPartner: getPartner,
            editIntern: editIntern,
            del: del,
            deleteIntern : deleteIntern,
            showAllInternOfPartner: showAllInternOfPartner,
            showAllCommentOfOnePartner : showAllCommentOfOnePartner,
            changeFilterValue : changeFilterValue,
            getAllInternshipTerm : getAllInternshipTerm,
            createInternshipTerm : createInternshipTerm,
            loadPostOfInternshipTerm : loadPostOfInternshipTerm,
            deleteInternshipTerm : deleteInternshipTerm,
            getAllInternshipByInternshipTerm : getAllInternshipByInternshipTerm,
            addLecturers : addLecturers,
            getInternOfLecturers : getInternOfLecturers,
            getNameAndIdOfPartners : getNameAndIdOfPartners,
            getNameAndIdOfLecturers : getNameAndIdOfLecturers,
            editInternshipTerm : editInternshipTerm,
            getAllStudentNoLecturers : getAllStudentNoLecturers,
            addLecturersStudent : addLecturersStudent,
            getAllStudentByInternshipTerm : getAllStudentByInternshipTerm,
            getAllStudentNoLecturersLastInternshipTerm : getAllStudentNoLecturersLastInternshipTerm
        };
        
        function getAllStudentNoLecturersLastInternshipTerm(){
            return $http({
                url: $rootScope.serverAdd + '/student/internshipTerm/no/lecturers',
                method: 'GET'
            })
        }

        function getAllStudentByInternshipTerm(internshipTermId){
            return $http({
                url: $rootScope.serverAdd + '/student/internshipTerm/' + internshipTermId,
                method: 'GET'
            })
        }

        function addLecturersStudent(data, lecturersId){
            return $http({
                url: $rootScope.serverAdd + '/student/add/lecturers/' + lecturersId,
                method: 'POST',
                data : data
            })
        }

        function getAllStudentNoLecturers(){
            return $http({
                url: $rootScope.serverAdd + '/student/no/lectutrers',
                method: 'GET'
            })
        }

        function editInternshipTerm(data){
            return $http({
                url: $rootScope.serverAdd + '/internshipTerm/edit',
                method: 'PUT',
                data : data
            })
        }

        function deleteIntern(internId){
            return $http({
                url: $rootScope.serverAdd + '/intern/' + internId,
                method: 'DELETE'
            })
        }

        function createIntern(data){
            return $http({
                url: $rootScope.serverAdd + '/intern/create',
                method: 'POST',
                data : data
            })
        }

        function getNameAndIdOfLecturers(){
            return $http({
                url: $rootScope.serverAdd + '/lecturers/nameAndId',
                method: 'GET'
            })
        }

        function getNameAndIdOfPartners(val){
            return $http({
                url: $rootScope.serverAdd + '/partner/nameAndId/user/' + val,
                method: 'GET'
            })
        }


        function getInternOfLecturers(lecturersId){
            return $http({
                url: $rootScope.serverAdd + '/lecturers/' + lecturersId + '/student',
                method: 'GET'
            })
        }

        function addLecturers(lecturersId, internId) {
            return $http({
                url: $rootScope.serverAdd + '/internship/add/lecturers/' + lecturersId + '/intern/' +internId,
                method: 'POST'
            })
        }

        function getAllInternshipByInternshipTerm(internshipTermId){
            return $http({
                url: $rootScope.serverAdd + '/intern/internshipTerm/' + internshipTermId,
                method: 'GET'
            })
        }

        function deleteInternshipTerm(internshipTermId){
            return $http({
                url: $rootScope.serverAdd + '/internshipTerm/' + internshipTermId + '/delete',
                method: 'DELETE'
            })
        }

        function loadPostOfInternshipTerm(internshipTermId){
            return $http({
                url: $rootScope.serverAdd + '/post/internshipTerm/' + internshipTermId,
                method: 'GET'
            })
        }

        function createInternshipTerm(data) {
            return $http({
                url: $rootScope.serverAdd + '/internshipTerm/create',
                method: 'POST',
                data: data
            })
        }

        function getAllInternshipTerm(){
            return $http({
                url: $rootScope.serverAdd + '/internshipTerm',
                method: 'GET'
            })
        }

        function showAllIntern(){
            return $http({
                url: $rootScope.serverAdd + '/intern',
                method: 'GET'
            })
        }

        function changeFilterValue(data, commentId){
            return $http({
                url: $rootScope.serverAdd + '/changeFilterValue/' + commentId,
                method: 'PUT',
                data: data
            })
        }

        function showAllCommentOfOnePartner(partnerId){
            return $http({
                url: $rootScope.serverAdd + '/showAllCommentOfOnePartner/' + partnerId,
                method: 'GET'
            })
        }

        function showAllInternOfPartner(partnerId){
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/internship',
                method: 'GET'
            })
        }

        function showIntern(internId){
            return $http({
                url: $rootScope.serverAdd + '/intern/' + internId,
                method: 'GET'
            })
        }
        
        function getPartner(){
            return $http({
                url: $rootScope.serverAdd + '/partner',
                method: 'GET'
            })
        }

        function editIntern(intern){
            return $http({
                url: $rootScope.serverAdd + '/intern/' + intern.id,
                method: 'PUT',
                data: intern
            })
        }
        
        function del(internId, studentId){
            return $http({
                url: $rootScope.serverAdd + '/intern/' + internId + '/' +studentId,
                method: 'DELETE'
            })
        }

    }
}());
(function() {
    'use strict';
    angular.module('services')
        .factory('lecturersService', lecturersService);

    lecturersService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function lecturersService($log, $http, $q, $rootScope) {
        return {
            getAllLecturers: getAllLecturers,
            createLecturers: createLecturers,
            getAllFaculty: getAllFaculty,
            createFaculty: createFaculty,
            deleteLecturers: deleteLecturers,
            createLecturersFromExcel: createLecturersFromExcel,
            getAllStudentClass: getAllStudentClass,
            createStudentClass: createStudentClass,
            deleteStudentClass: deleteStudentClass,
            editStudentCLass: editStudentCLass,
            editLecturers: editLecturers
        };

        function editLecturers(data){
            return $http({
                url:$rootScope.serverAdd + '/lecturers/info/edit',
                method: 'PUT',
                data : data
            })
        }

        function editStudentCLass(data){
            return $http({
                url:$rootScope.serverAdd + '/studentClass/edit',
                method: 'POST',
                data : data
            })
        }

        function getAllStudentClass() {
            return $http({
                url: $rootScope.serverAdd + '/studentClass',
                method: 'GET'
            })
        }

        function createStudentClass(data) {
            return $http({
                url: $rootScope.serverAdd + '/studentClass/create',
                method: 'POST',
                data: data
            })
        }

        function deleteStudentClass(studentClassId) {
            return $http({
                url: $rootScope.serverAdd + '/studentClass/' + studentClassId + '/delete',
                method: 'DELETE'
            })
        }

        function createLecturersFromExcel(data) {
            return $http({
                url: $rootScope.serverAdd + '/createLecturers',
                method: 'POST',
                data: data
            })
        }

        function deleteLecturers(lecturersId) {
            return $http({
                url: $rootScope.serverAdd + '/lecturers/delete/' + lecturersId,
                method: 'DELETE'
            })
        }

        function createLecturers(data) {
            return $http({
                url: $rootScope.serverAdd + '/createAccount',
                method: 'POST',
                data: data
            })
        }

        function createFaculty(data) {
            return $http({
                url: $rootScope.serverAdd + '/faculty/create',
                method: 'POST',
                data: data
            })
        }

        function getAllFaculty() {
            return $http({
                url: $rootScope.serverAdd + '/faculty',
                method: 'GET'
            })
        }

        function getAllLecturers() {
            return $http({
                url: $rootScope.serverAdd + '/lecturers',
                method: 'GET'
            })
        }


    }
}());

 (function () {
    'use strict';

    angular.module('services')
        .factory('loginAdService',loginAdService);
    loginAdService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function loginAdService($log, $http, $q,$rootScope) {
        return{
            loginAd: loginAd,
            logout: logout
        };
        function loginAd(data) {
            return $http({
                url: $rootScope.serverAdd + '/admin/login',
                method: 'POST',
                data: data
            })
        }
        function logout() {
            return $http({
                url: $rootScope.serverAdd + '/logout',
                method: 'GET'
            })
        }
    }
}());

(function() {
    'use strict';

    angular.module('services')
        .factory('messageService', messageService);
    messageService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function messageService($log, $http, $q, $rootScope) {
        return {
            createPassInterviewMessage: createPassInterviewMessage,
            getNewMessage: getNewMessage,
            getAllMessage: getAllMessage,
            createMessage: createMessage,
            getNotificationMessage: getNotificationMessage,
            createNotificationMessage: createNotificationMessage,
            deleteNotificationMessage: deleteNotificationMessage,
            createFailInterviewMessage: createFailInterviewMessage,
            getParentMessage: getParentMessage,
            markMessageAsSeen: markMessageAsSeen,
            getOneMessage: getOneMessage
        };

        function getOneMessage(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/messageId/' + messageId,
                method: 'GET'
            })
        }

        function markMessageAsSeen(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/' + messageId + '/seen',
                method: 'PUT'
            })
        }

        function getParentMessage(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/parent/' + messageId,
                method: 'GET'
            })
        }

        function getAllMessage(page, size, lastUpdated) {
            if(lastUpdated == undefined){
                lastUpdated = new Date().getTime();
            }
            return $http({
                url: $rootScope.serverAdd + '/message?&lastUpdated=' + lastUpdated + '&page=' + page + '&size=' + size,
                method: 'GET'
            })
        }

        function createFailInterviewMessage(data) {
            return $http({
                url: $rootScope.serverAdd + '/message/failInterview/create',
                method: 'POST',
                data: data
            })
        }

        function deleteNotificationMessage(messageId) {
            return $http({
                url: $rootScope.serverAdd + '/message/notification/delete/' + messageId,
                method: 'DELETE'
            })
        }

        function createNotificationMessage(data) {
            return $http({
                url: $rootScope.serverAdd + '/message/notification/create',
                method: 'POST',
                data: data
            })
        }

        function getNotificationMessage() {
            return $http({
                url: $rootScope.serverAdd + '/message/notification',
                method: 'GET'
            })
        }

        function createMessage(data) {
            return $http({
                url: $rootScope.serverAdd + '/message/create',
                method: 'POST',
                data: data
            })
        }

        function getNewMessage() {
            return $http({
                url: $rootScope.serverAdd + '/message/new',
                method: 'GET'
            })
        }

        function createPassInterviewMessage(data) {
            return $http({
                url: $rootScope.serverAdd + '/message/passInterview/create',
                method: 'POST',
                data: data
            })
        }
    }
}());
 (function () {
    'use strict';

    angular.module('services')
        .factory('notificationService',notificationService);
    notificationService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function notificationService($log, $http, $q,$rootScope) {
        return{
            getAllNotification: getAllNotification
        };
        function getAllNotification() {
            return $http({
                url: $rootScope.serverAdd + '/notification/all/admin',
                method: 'GET'
            })
        }
    }
}());

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
            acceptPartner: acceptPartner
        };

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

(function() {
    'use strict';
    angular.module('services')
        .factory('studentService', studentService);

    studentService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function studentService($log, $http, $q, $rootScope) {
        return {
            // loadInfo: student/
            saveData: saveData,
            infoBySchool: infoBySchool,
            loadAllStudent: loadAllStudent,
            del: del,
            changeStatus: changeStatus,
            createStudent: createStudent,
            getAllStudent: getAllStudent,
            deleteStudent: deleteStudent,
            getStudentByStudentCode: getStudentByStudentCode,
            getUserNameAndEmailVnu: getUserNameAndEmailVnu,
            getWaitInterviewFollow: getWaitInterviewFollow,
            removeLecturers: removeLecturers,
            checkExcelLecturersAssignment: checkExcelLecturersAssignment,
            LecturersAssignmentExcel: LecturersAssignmentExcel,
            getAllStudentClass : getAllStudentClass,
            getCountStudentNoFollow: getCountStudentNoFollow,
            getStudentNoInternshipTerm: getStudentNoInternshipTerm,
            addFollow: addFollow,
            getAllFollow: getAllFollow,
            addScore: addScore
        };

        function addScore(internId, score) {
            return $http({
                url: $rootScope.serverAdd + '/intern/' + internId + '/addscore',
                method: 'PUT',
                data: score
            })
        }

        function getAllFollow() {
            return $http({
                url: $rootScope.serverAdd + '/follows',
                method: 'GET'
            })
        }

        function addFollow(data, postId) {
            return $http({
                url: $rootScope.serverAdd + '/post/' + postId + '/follownew',
                method: 'POST',
                data: data
            })
        }

        function getStudentNoInternshipTerm() {
            return $http({
                url: $rootScope.serverAdd + '/student/no/internshipTerm',
                method: 'GET'
            })
        }
        
        function getCountStudentNoFollow() {
            return $http({
                url: $rootScope.serverAdd + '/getCountStudentNoFollow',
                method: 'GET'
            })
        }

        function getAllStudentClass() {
            return $http({
                url: $rootScope.serverAdd + '/studentClass',
                method: 'GET'
            })
        }

        function LecturersAssignmentExcel(data) {
            return $http({
                url: $rootScope.serverAdd + '/lecturers/assignment/excel',
                method: 'POST',
                data: data
            })
        }

        function checkExcelLecturersAssignment(data) {
            return $http({
                url: $rootScope.serverAdd + '/student/check/lecturers/excel',
                method: 'POST',
                data: data
            })
        }

        function removeLecturers(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student' + studentId + '/remove/lecturers',
                method: 'POST'
            })
        }

        function getWaitInterviewFollow() {
            return $http({
                url: $rootScope.serverAdd + '/follow/waitInterview',
                method: 'GET'
            })
        }


        function getUserNameAndEmailVnu(startId) {
            return $http({
                url: $rootScope.serverAdd + '/getUserNameAndEmailVnu/' + startId,
                method: 'GET'
            })
        }

        function getStudentByStudentCode(studentCode) {
            return $http({
                url: $rootScope.serverAdd + '/student/studentCode',
                method: 'POST',
                data: studentCode
            })
        }

        function deleteStudent(studentId) {
            return $http({
                url: $rootScope.serverAdd + '/student/delete/' + studentId,
                method: 'DELETE'
            })
        }

        function getAllStudent(page, size) {
            return $http({
                url: $rootScope.serverAdd + '/student/all?page=' + page + '&size=' + size,
                method: 'GET'
            })
        }

        function loadAllStudent() {
            return $http({
                url: $rootScope.serverAdd + '/student',
                method: 'GET'
            })
        }

        function infoBySchool() {
            return $http({
                url: $rootScope.serverAdd + '/infoBySchool',
                method: 'GET'
            })
        }

        function saveData(data, infoBySchoolId) {
            return $http({
                url: $rootScope.serverAdd + '/infoBySchool/' + infoBySchoolId,
                method: 'PUT',
                data: data
            })
        }

        function del(infoBySchoolId) {
            return $http({
                url: $rootScope.serverAdd + '/infoBySchool/' + infoBySchoolId,
                method: 'DELETE'
            })
        }

        function changeStatus(userId) {
            return $http({
                url: $rootScope.serverAdd + '/user/' + userId + '/status',
                method: 'PUT'
            })
        }

        function createStudent(data) {
            return $http({
                url: $rootScope.serverAdd + '/createStudent',
                method: 'POST',
                data: data
            })
        }
    }
}());

// Generated by CoffeeScript 1.7.1
/*
   Stomp Over WebSocket http://www.jmesnil.net/stomp-websocket/doc/ | Apache License V2.0

   Copyright (C) 2010-2013 [Jeff Mesnil](http://jmesnil.net/)
   Copyright (C) 2012 [FuseSource, Inc.](http://fusesource.com)
 */
(function(){var t,e,n,i,r={}.hasOwnProperty,o=[].slice;t={LF:"\n",NULL:"\x00"};n=function(){var e;function n(t,e,n){this.command=t;this.headers=e!=null?e:{};this.body=n!=null?n:""}n.prototype.toString=function(){var e,i,o,s,u;e=[this.command];o=this.headers["content-length"]===false?true:false;if(o){delete this.headers["content-length"]}u=this.headers;for(i in u){if(!r.call(u,i))continue;s=u[i];e.push(""+i+":"+s)}if(this.body&&!o){e.push("content-length:"+n.sizeOfUTF8(this.body))}e.push(t.LF+this.body);return e.join(t.LF)};n.sizeOfUTF8=function(t){if(t){return encodeURI(t).match(/%..|./g).length}else{return 0}};e=function(e){var i,r,o,s,u,a,c,f,h,l,p,d,g,b,m,v,y;s=e.search(RegExp(""+t.LF+t.LF));u=e.substring(0,s).split(t.LF);o=u.shift();a={};d=function(t){return t.replace(/^\s+|\s+$/g,"")};v=u.reverse();for(g=0,m=v.length;g<m;g++){l=v[g];f=l.indexOf(":");a[d(l.substring(0,f))]=d(l.substring(f+1))}i="";p=s+2;if(a["content-length"]){h=parseInt(a["content-length"]);i=(""+e).substring(p,p+h)}else{r=null;for(c=b=p,y=e.length;p<=y?b<y:b>y;c=p<=y?++b:--b){r=e.charAt(c);if(r===t.NULL){break}i+=r}}return new n(o,a,i)};n.unmarshall=function(n){var i;return function(){var r,o,s,u;s=n.split(RegExp(""+t.NULL+t.LF+"*"));u=[];for(r=0,o=s.length;r<o;r++){i=s[r];if((i!=null?i.length:void 0)>0){u.push(e(i))}}return u}()};n.marshall=function(e,i,r){var o;o=new n(e,i,r);return o.toString()+t.NULL};return n}();e=function(){var e;function r(t){this.ws=t;this.ws.binaryType="arraybuffer";this.counter=0;this.connected=false;this.heartbeat={outgoing:1e4,incoming:1e4};this.maxWebSocketFrameSize=16*1024;this.subscriptions={}}r.prototype.debug=function(t){var e;return typeof window!=="undefined"&&window!==null?(e=window.console)!=null?e.log(t):void 0:void 0};e=function(){if(Date.now){return Date.now()}else{return(new Date).valueOf}};r.prototype._transmit=function(t,e,i){var r;r=n.marshall(t,e,i);if(typeof this.debug==="function"){this.debug(">>> "+r)}while(true){if(r.length>this.maxWebSocketFrameSize){this.ws.send(r.substring(0,this.maxWebSocketFrameSize));r=r.substring(this.maxWebSocketFrameSize);if(typeof this.debug==="function"){this.debug("remaining = "+r.length)}}else{return this.ws.send(r)}}};r.prototype._setupHeartbeat=function(n){var r,o,s,u,a,c;if((a=n.version)!==i.VERSIONS.V1_1&&a!==i.VERSIONS.V1_2){return}c=function(){var t,e,i,r;i=n["heart-beat"].split(",");r=[];for(t=0,e=i.length;t<e;t++){u=i[t];r.push(parseInt(u))}return r}(),o=c[0],r=c[1];if(!(this.heartbeat.outgoing===0||r===0)){s=Math.max(this.heartbeat.outgoing,r);if(typeof this.debug==="function"){this.debug("send PING every "+s+"ms")}this.pinger=i.setInterval(s,function(e){return function(){e.ws.send(t.LF);return typeof e.debug==="function"?e.debug(">>> PING"):void 0}}(this))}if(!(this.heartbeat.incoming===0||o===0)){s=Math.max(this.heartbeat.incoming,o);if(typeof this.debug==="function"){this.debug("check PONG every "+s+"ms")}return this.ponger=i.setInterval(s,function(t){return function(){var n;n=e()-t.serverActivity;if(n>s*2){if(typeof t.debug==="function"){t.debug("did not receive server activity for the last "+n+"ms")}return t.ws.close()}}}(this))}};r.prototype._parseConnect=function(){var t,e,n,i;t=1<=arguments.length?o.call(arguments,0):[];i={};switch(t.length){case 2:i=t[0],e=t[1];break;case 3:if(t[1]instanceof Function){i=t[0],e=t[1],n=t[2]}else{i.login=t[0],i.passcode=t[1],e=t[2]}break;case 4:i.login=t[0],i.passcode=t[1],e=t[2],n=t[3];break;default:i.login=t[0],i.passcode=t[1],e=t[2],n=t[3],i.host=t[4]}return[i,e,n]};r.prototype.connect=function(){var r,s,u,a;r=1<=arguments.length?o.call(arguments,0):[];a=this._parseConnect.apply(this,r);u=a[0],this.connectCallback=a[1],s=a[2];if(typeof this.debug==="function"){this.debug("Opening Web Socket...")}this.ws.onmessage=function(i){return function(r){var o,u,a,c,f,h,l,p,d,g,b,m;c=typeof ArrayBuffer!=="undefined"&&r.data instanceof ArrayBuffer?(o=new Uint8Array(r.data),typeof i.debug==="function"?i.debug("--- got data length: "+o.length):void 0,function(){var t,e,n;n=[];for(t=0,e=o.length;t<e;t++){u=o[t];n.push(String.fromCharCode(u))}return n}().join("")):r.data;i.serverActivity=e();if(c===t.LF){if(typeof i.debug==="function"){i.debug("<<< PONG")}return}if(typeof i.debug==="function"){i.debug("<<< "+c)}b=n.unmarshall(c);m=[];for(d=0,g=b.length;d<g;d++){f=b[d];switch(f.command){case"CONNECTED":if(typeof i.debug==="function"){i.debug("connected to server "+f.headers.server)}i.connected=true;i._setupHeartbeat(f.headers);m.push(typeof i.connectCallback==="function"?i.connectCallback(f):void 0);break;case"MESSAGE":p=f.headers.subscription;l=i.subscriptions[p]||i.onreceive;if(l){a=i;h=f.headers["message-id"];f.ack=function(t){if(t==null){t={}}return a.ack(h,p,t)};f.nack=function(t){if(t==null){t={}}return a.nack(h,p,t)};m.push(l(f))}else{m.push(typeof i.debug==="function"?i.debug("Unhandled received MESSAGE: "+f):void 0)}break;case"RECEIPT":m.push(typeof i.onreceipt==="function"?i.onreceipt(f):void 0);break;case"ERROR":m.push(typeof s==="function"?s(f):void 0);break;default:m.push(typeof i.debug==="function"?i.debug("Unhandled frame: "+f):void 0)}}return m}}(this);this.ws.onclose=function(t){return function(){var e;e="Whoops! Lost connection to "+t.ws.url;if(typeof t.debug==="function"){t.debug(e)}t._cleanUp();return typeof s==="function"?s(e):void 0}}(this);return this.ws.onopen=function(t){return function(){if(typeof t.debug==="function"){t.debug("Web Socket Opened...")}u["accept-version"]=i.VERSIONS.supportedVersions();u["heart-beat"]=[t.heartbeat.outgoing,t.heartbeat.incoming].join(",");return t._transmit("CONNECT",u)}}(this)};r.prototype.disconnect=function(t,e){if(e==null){e={}}this._transmit("DISCONNECT",e);this.ws.onclose=null;this.ws.close();this._cleanUp();return typeof t==="function"?t():void 0};r.prototype._cleanUp=function(){this.connected=false;if(this.pinger){i.clearInterval(this.pinger)}if(this.ponger){return i.clearInterval(this.ponger)}};r.prototype.send=function(t,e,n){if(e==null){e={}}if(n==null){n=""}e.destination=t;return this._transmit("SEND",e,n)};r.prototype.subscribe=function(t,e,n){var i;if(n==null){n={}}if(!n.id){n.id="sub-"+this.counter++}n.destination=t;this.subscriptions[n.id]=e;this._transmit("SUBSCRIBE",n);i=this;return{id:n.id,unsubscribe:function(){return i.unsubscribe(n.id)}}};r.prototype.unsubscribe=function(t){delete this.subscriptions[t];return this._transmit("UNSUBSCRIBE",{id:t})};r.prototype.begin=function(t){var e,n;n=t||"tx-"+this.counter++;this._transmit("BEGIN",{transaction:n});e=this;return{id:n,commit:function(){return e.commit(n)},abort:function(){return e.abort(n)}}};r.prototype.commit=function(t){return this._transmit("COMMIT",{transaction:t})};r.prototype.abort=function(t){return this._transmit("ABORT",{transaction:t})};r.prototype.ack=function(t,e,n){if(n==null){n={}}n["message-id"]=t;n.subscription=e;return this._transmit("ACK",n)};r.prototype.nack=function(t,e,n){if(n==null){n={}}n["message-id"]=t;n.subscription=e;return this._transmit("NACK",n)};return r}();i={VERSIONS:{V1_0:"1.0",V1_1:"1.1",V1_2:"1.2",supportedVersions:function(){return"1.1,1.0"}},client:function(t,n){var r,o;if(n==null){n=["v10.stomp","v11.stomp"]}r=i.WebSocketClass||WebSocket;o=new r(t,n);return new e(o)},over:function(t){return new e(t)},Frame:n};if(typeof exports!=="undefined"&&exports!==null){exports.Stomp=i}if(typeof window!=="undefined"&&window!==null){i.setInterval=function(t,e){return window.setInterval(e,t)};i.clearInterval=function(t){return window.clearInterval(t)};window.Stomp=i}else if(!exports){self.Stomp=i}}).call(this);