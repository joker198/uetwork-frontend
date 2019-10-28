'use strict';

// Declare app level module which depends on views, and components
angular.module('services', []);
angular.module('myApp', [
    'ngRoute',
    'services',
    'login',
    'info',
    'jobSkill',
    'intern',
    'search',
    'ngImgCrop', //' khong co ng-img-crop-full-extended trong bower install'
    'summernote',
    'partnerInfo',
    'partnerContact',
    'partnerPost',
    'ngSanitize',
    'base64',
    // 'ngclipboard',
    // 'report',
    'ui.router',
    'ngCookies',
    'ui.bootstrap',
    'message',
    'angular-md5',
    'angucomplete-alt'
]).config(['$locationProvider', '$routeProvider', '$urlRouterProvider', '$stateProvider',
    function($locationProvider, $routeProvider, $urlRouterProvider, $stateProvider) {
        //neu da dang nhap thi ko vao dc trang login nua
        $locationProvider.html5Mode(true)
            .hashPrefix('');
        var $cookies;
        angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
            $cookies = _$cookies_;
        }]);
        if ($cookies.get('User-Data') == null) {
            $routeProvider
                .when('/login', {
                    templateUrl: '/main/views/login/login.html',
                    controller: 'LoginCtrl'
                })
                .when('/signup', {
                    templateUrl: '/main/views/signup/signup.html',
                    controller: 'LoginCtrl'
                }).otherwise({ redirectTo: '/login' });
        } else {
            $stateProvider
                .state('/404', {
                    url: '/404',
                    templateUrl: '404.html'
                })
                .state('/post/:postId', {
                    url: '/post/:postId',
                    templateUrl: 'main/views/partnerPost/showPost.html',
                    controller: 'partnerPostCtrl'
                })
                .state('/report', {
                    url: '/report',
                    templateUrl: '/main/views/report/report.html',
                    controller: 'reportCtrl'
                })
                .state('/messages', {
                    url: '/messages',
                    templateUrl: 'main/views/messages/messages.html'
                })
                .state('/messages.write-message', {
                    url: '/write-message',
                    templateUrl: 'main/views/messages/messages.write-message.html',
                    controller: 'messageCtrl'
                })
                .state('/messages.inbox', {
                    url: '/inbox',
                    templateUrl: 'main/views/messages/messages.inbox.html',
                    controller: 'messageCtrl'
                })
                .state('/messages.inbox/:messageId', {
                    url: '/inbox/:messageId',
                    templateUrl: 'main/views/messages/messages.show.html',
                    controller: 'messageCtrl'
                })
                .state('/messages.pass-interview', {
                    url: '/pass-interview',
                    templateUrl: 'main/views/messages/messages.pass.interview.html',
                    controller: 'messageCtrl'
                });

            // role student
            if ($cookies.get('role') == "STUDENT") {
                $urlRouterProvider.otherwise('/recruitment');
                if ($cookies.get('internId')) {
                    $stateProvider
                        .state('/user.intern', {
                            url: '/intern',
                            templateUrl: 'main/views/intern/intern.html',
                            controller: 'internCtrl'
                        });
                }
                $stateProvider
                    .state('home', {
                        url: '/home',
                        views: {
                            'slider': {
                                templateUrl: 'main/views/home/slider.html',
                                controller: 'partnerPostCtrl'
                            },
                            'logo': {
                                templateUrl: 'main/views/home/logo.html',
                                controller: 'mainCtrl'
                            },
                            // 'all-posts': {
                            //     templateUrl: 'main/views/partnerPost/post.all.html',
                            //     controller: 'partnerPostCtrl'
                            // },
                            'comment': {
                                templateUrl: 'main/views/home/comment.html',
                                controller: 'mainCtrl'
                            },
                            'gif-loader': {
                                templateUrl: 'main/views/home/gif-loader.html'
                            }

                        }
                    })
                    .state('recruitment', {
                        url: '/recruitment',
                        views: {
                            'fit-post': {
                                templateUrl: 'main/views/partnerPost/post.fit.all.html',
                                controller: 'partnerPostCtrl'
                            },
                            'other-post': {
                                templateUrl: 'main/views/partnerPost/post.other.all.html',
                                controller: 'partnerPostCtrl'
                            },
                            'reseach': {
                                templateUrl: 'main/views/partnerPost/post.reseach.all.html',
                                controller: 'partnerPostCtrl'
                            },
                            'registration': {
                                templateUrl: 'main/views/partnerPost/registration.html',
                                controller: 'partnerPostCtrl'
                            },
                            'internship': {
                                templateUrl: 'main/views/intern/internship.infomation.html',
                                controller: 'internCtrl'
                            }

                        }
                    })
                    .state('/comfirmationLink/:comfirmationLink', {
                        url: '/comfirmationLink/:comfirmationLink',
                        templateUrl: 'main/views/comfirmationLink/comfirmationLink.html',
                        controller: 'messageCtrl'
                    })
                    .state('/interview-List', {
                        url: '/interview-List',
                        templateUrl: 'main/views/student/interview-List.html',
                        controller: 'internCtrl'
                    })
                    .state('/user', {
                        url: '/user',
                        templateUrl: 'main/views/student/info.html',
                        controller: 'infoCtrl'
                    })
                    .state('/messages.confirmation-link', {
                        url: '/confirmation-link',
                        templateUrl: 'main/views/messages/comfirmationLink.html',
                        controller: 'messageCtrl'
                    })
                    .state('/user.info', {
                        url: '/info',
                        templateUrl: 'main/views/student/student.info.html',
                        controller: 'infoCtrl'
                    })
                    .state('/user.change-password', {
                        url: '/change-password',
                        templateUrl: 'main/views/student/student.changePassword.html',
                        controller: 'infoCtrl'
                    })
                    .state('/user.followed-post', {
                        url: '/followed-post',
                        templateUrl: 'main/views/student/student.followed-post.html',
                        controller: 'partnerPostCtrl'
                    })
                    .state('/user.infoBySchool', {
                        url: '/infoBySchool',
                        templateUrl: 'main/views/student/infoBySchool.html',
                        controller: 'infoCtrl'
                    })
                    .state('/user.work-experience', {
                        url: '/work-experience',
                        templateUrl: 'main/views/jobSkill/jobSkill.html',
                        controller: 'jobSkillCtrl'
                    })
                    .state('/user.internship', {
                        url: '/internship',
                        templateUrl: 'main/views/student/intern.html',
                        controller: 'internCtrl'
                    })
                    .state('/partner/:partnerId', {
                        url: '/partner/:partnerId',
                        templateUrl: 'main/views/partnerInfo/partner.info.html',
                        controller: 'partnerInfoCtrl'
                    })
                    .state('/search', {
                        url: '/search',
                        templateUrl: '/main/views/search/search.html',
                        controller: 'SearchCtrl'
                    });
                    // .state('/all-posts', {
                    //     url: '/all-posts',
                    //     templateUrl: '/main/views/partnerPost/post.all.html',
                    //     controller: 'partnerPostCtrl'
                    // })
                    // .state('/all-posts/page=:page', {
                    //     url: '/all-posts/page=:page',
                    //     templateUrl: '/main/views/partnerPost/post.all.html',
                    //     controller: 'partnerPostCtrl'
                    // });
            }
            if ($cookies.get('role') == "VIP_PARTNER") {
                $urlRouterProvider.otherwise('/partner/info');
                $stateProvider
                    .state('/student/:idStudent', {
                        url: '/student/:idStudent',
                        templateUrl: 'main/views/student/infoOfStudent.html',
                        controller: 'infoCtrl'
                    })
                    .state('/partner', {
                        url: '/partner',
                        templateUrl: 'main/views/partnerInfo/partner.html'
                    })
                    .state('/partner.info', {
                        url: '/info',
                        templateUrl: 'main/views/partnerInfo/partnerInfo.html',
                        controller: 'partnerInfoCtrl'
                    })
                    .state('/partner.contact', {
                        url: '/contact',
                        templateUrl: 'main/views/partnerContact/partnerContact.html',
                        controller: 'partnerContactCtrl'
                    })
                    .state('/partner.post', {
                        url: '/post',
                        templateUrl: 'main/views/partnerPost/partnerPost.html',
                        controller: 'partnerPostCtrl'
                    })
                    .state('/partner.add-post', {
                        url: '/add-post',
                        templateUrl: 'main/views/partnerPost/addPost.html',
                        controller: 'partnerPostCtrl'
                    })
                    .state('/partner.edit-post', {
                        url: '/edit-post',
                        templateUrl: 'main/views/partnerPost/addPost.html',
                        controller: 'partnerPostCtrl'
                    })
                    .state('/partner.insert-intern', {
                        url: '/insert-intern',
                        templateUrl: 'main/views/intern/partner.insert.intern.html',
                        controller: 'internCtrl'
                    })
                    .state('/partner.show-intern', {
                        url: '/show-intern',
                        templateUrl: 'main/views/intern/partner.show.intern.html',
                        controller: 'internCtrl'
                    })
                    .state('/search', {
                        url: '/search',
                        templateUrl: '/main/views/search/partner.search.html',
                        controller: 'SearchCtrl'
                    });
            }
        }
    }
]).directive('confirmationNeeded', function() {
    return {
        priority: 1,
        terminal: true,
        link: function(scope, element, attr) {
            var msg = attr.confirmationNeeded || "Are you sure?";
            var clickAction = attr.ngClick;
            element.bind('click', function() {
                if (window.confirm(msg)) {
                    scope.$eval(clickAction)
                }
            });
        }
    };
}).directive('loading', ['$http', function($http) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            scope.isLoading = function() {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function(v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
}]);

// {enabled: true, requireBase: false}
