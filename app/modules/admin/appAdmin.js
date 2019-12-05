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
        'angular-md5',
        'angucomplete-alt'
    ])
    .config(["$locationProvider", "$routeProvider", "$stateProvider", "$urlRouterProvider",
        function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(false).hashPrefix("");
            if (sessionStorage["Admin-Data"] == null) {
                //
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
                        .state("/recruit-list/create", {
                            url:"/recruit-list/create",
                            templateUrl: "modules/admin/views/internship-term/create-recruit-list.html",
                            controller: "partnerCtrl"
                        })
                        .state("/user/page=:page", {
                            url: "/user/page=:page",
                            views: {
                                "": {
                                    templateUrl: "modules/admin/views/user/user.all.html",
                                },
                                "modal_student_information@/user/page=:page": {
                                    templateUrl: "modules/admin/views/user/user.modal.student.information.html",
                                },
                                "modal_reset_password@/user/page=:page": {
                                    templateUrl: "modules/admin/views/user/user.password.reset.html",
                                }
                            }
                        })
                        .state("/user/search/username=:userName", {
                            url: "/user/search/username=:userName",
                            views: {
                                "": {
                                    templateUrl: "modules/admin/views/user/user.search.html",
                                    controller: "NotiCtrl"
                                },
                                "modal_student_information@/user/search/username=:userName": {
                                    templateUrl: "modules/admin/views/user/user.modal.student.information.html",
                                },
                                "modal_reset_password@/user/search/username=:userName": {
                                    templateUrl: "modules/admin/views/user/user.password.reset.html",
                                }
                            }
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
                            views: {
                                '': {
                                    templateUrl: "modules/admin/views/partner/partner.registration.html",
                                    controller: "partnerCtrl"
                                }
                            }
                        })
                        .state("/add-lecturers-student", {
                            url: "/add-lecturers-student",
                            templateUrl: "modules/admin/views/student/student.add.lecturers.html",
                            controller: "studentCtrl"
                        })
                        .state("/add-score", {
                            url: "/add-score",
                            templateUrl: "modules/admin/views/student/add.score.html",
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