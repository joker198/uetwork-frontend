(function() {
    'use strict';

    var app = angular.module("myApp");
    app.controller('mainCtrl', ['$scope', '$rootScope', '$location', 'loginService', 'partnerInfoService', 'partnerPostService', '$cookies', '$state',
        'internService', 'messageService', '$window',
        function($scope, $rootScope, $location, loginService, partnerInfoService, partnerPostService, $cookies, $state, internService, messageService, $window) {

            $rootScope.serverAdd = "http://192.168.0.100:8180";
            $rootScope.clientAdd = "http://192.168.0.210:8000";
            $scope.response = [];
            $scope.socket = [];
            $scope.getCurrentInternshipOfInternshipTerm = function() {
                internService.getCurrentInternshipOfInternshipTerm()
                    .then(function(response) {
                        $rootScope.internship = response.data;
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
                    $scope.socket.stomp.subscribe("/user/" + $cookies.get('username') + "/**", function(message) {
                        $scope.response = JSON.parse(message.body);
                        if ($rootScope.currentPage == '/messages.inbox/:messageId') {
                            if ($scope.response.parentId == $rootScope.selectedMessage.id) {
                                $rootScope.selectedMessage.messages.push($scope.response);
                                $rootScope.selectedMessage.lastUpdeted = $scope.response.sendDate;
                                $rootScope.$apply();
                                $rootScope.markMessageAsSeen($scope.response.parentId);
                            } else if ($scope.response.parentId != $rootScope.selectedMessage.id) {
                                if ($rootScope.selectedMessage.messages != null) {
                                    if ($scope.response.parentId == $rootScope.selectedMessage.messages[0].id) {
                                        $rootScope.selectedMessage.messages.push($scope.response);
                                        $rootScope.selectedMessage.lastUpdeted = $scope.response.sendDate;
                                        $rootScope.$apply();
                                        $rootScope.markMessageAsSeen($scope.response.parentId);
                                        var switchC = true;
                                    }
                                }
                                if (switchC != true) {
                                    var index = $rootScope.newMessages.findIndex(x => x.id === $scope.response.parentId);
                                    if (index != -1) {
                                        $rootScope.newMessages[index].status = 'NEW';
                                        $rootScope.newMessages[index].lastUpdeted = $scope.response.sendDate;
                                        if ($rootScope.newMessages[index].messageType == 'Normal') {
                                            $rootScope.newMessages[index].messages.push($scope.response);

                                            $rootScope.$apply();
                                        }
                                    } else if (index == -1) {
                                        if ($scope.response.messageType == 'Reply') {
                                            index = $rootScope.newMessages.findIndex(x => x.parentId === $scope.response.parentId);
                                            if (index == -1) {
                                                $rootScope.newMessages.push($scope.response);
                                                $rootScope.messagesCount = $rootScope.newMessages.length;
                                                $rootScope.$apply();
                                            }
                                        } else {
                                            $rootScope.newMessages.push($scope.response);
                                            $rootScope.messagesCount = $rootScope.newMessages.length;
                                            $rootScope.$apply();
                                        }
                                    }
                                }
                            }
                        } else {
                            var index = $rootScope.newMessages.findIndex(x => x.id === $scope.response.parentId);
                            if (index != -1) {
                                $rootScope.newMessages[index].status = 'NEW';
                                $rootScope.newMessages[index].lastUpdeted = $scope.response.sendDate;
                                if ($rootScope.newMessages[index].messageType == 'Normal') {
                                    $rootScope.newMessages[index].messages.push($scope.response);

                                    $rootScope.$apply();
                                }
                            } else if (index == -1) {
                                if ($scope.response.messageType == 'Reply') {
                                    index = $rootScope.newMessages.findIndex(x => x.parentId === $scope.response.parentId);
                                    if (index == -1) {
                                        $rootScope.newMessages.push($scope.response);
                                        $rootScope.messagesCount = $rootScope.newMessages.length;
                                        $rootScope.$apply();
                                    }
                                } else {
                                    $rootScope.newMessages.push($scope.response);
                                    $rootScope.messagesCount = $rootScope.newMessages.length;
                                    $rootScope.$apply();
                                }
                            }
                            if ($rootScope.currentPage == '/messages.inbox') {
                                var index = $rootScope.messages.findIndex(x => x.id === $scope.response.parentId);
                                if (index != -1) {
                                    $rootScope.messages[index].status = 'NEW';
                                    $rootScope.messages[index].lastUpdeted = $scope.response.sendDate;
                                    $rootScope.$apply();
                                    if ($rootScope.messages[index].messageType == 'Normal') {
                                        $rootScope.messages[index].messages.push($scope.response);
                                    }
                                } else {
                                    $rootScope.messages.push($scope.response);
                                }
                                $rootScope.$apply();
                            }
                        }
                    });
                });
                $scope.socket.client.onclose = $scope.reconnect;
            };

            if ($cookies.get('User-Data')) {
                sessionStorage.setItem('User-Data', $cookies.get('User-Data'));
                $rootScope.loggedIn = true;
                $rootScope.index = true;
                $rootScope.id = $cookies.get('id');
                $rootScope.studentId = $cookies.get('studentId');
                $rootScope.username = $cookies.get('username');
                $rootScope.role = $cookies.get('role');
                $rootScope.internId = $cookies.get('internId');
                $rootScope.lecturersId = $cookies.get('lecturersId');
                $rootScope.lecturersName = $cookies.get('lecturersName');
                if ($rootScope.role == "NORMAL_PARTNER" || $rootScope.role == "VIP_PARTNER") {
                    //
                }
                $scope.initSockets();
            } else {
                $rootScope.loggedIn = false;
                $location.path('/login');
            }

            $scope.logout = function() {
                loginService.logout()
                    .then(function() {
                        var cookies = $cookies.getAll();
                        angular.forEach(cookies, function(v, k) {
                            $cookies.remove(k);
                        });
                        $window.location.href = $rootScope.clientAdd;
                    }, function(error) {
                        var cookies = $cookies.getAll();
                        angular.forEach(cookies, function(v, k) {
                            $cookies.remove(k);
                        });
                        $window.location.href = $rootScope.clientAdd;
                    })
            };

            $scope.getNewMessage = function() {
                messageService.getNewMessage()
                    .then(function(response) {
                        $rootScope.messagesCount = response.data.length;
                        $rootScope.newMessages = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.selectMessage = function(message) {
                $rootScope.selectedMessage = message;
            }

            $scope.getPartnerLogo = function() {
                partnerInfoService.getPartnerLogo()
                    .then(function(data) {
                        $scope.response = data.data;
                    }, function(error) {
                        console.log(error);
                    });
            };

            $scope.getLastestPost = function() {
                partnerPostService.loadPost(1)
                    .then(function(response) {
                        $scope.allPost = response.data;
                    }, function(error) {
                        console.log(error);
                    });
            };

            $scope.count = 1;
            $scope.slider = function() {
                if ($scope.count == 3) {
                    $scope.count = 1;
                } else {
                    $scope.count++;
                }
            };

            $scope.getNumber = function(num) {
                return new Array(num);
            };

            $scope.getTopComment = function() {
                internService.getTopComment()
                    .then(function(response) {
                        $scope.topComments = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            };

            $scope.indexLocation = function() {
                $window.location.href = $rootScope.clientAdd;
            };
            $rootScope.search = [];
            $scope.search = function() {
                $rootScope.search.data = $scope.search.data;
                $rootScope.search.input = $scope.search.input;
                $location.path('/search');
            }

            $scope.renderSlider = function() {
                partnerPostService.loadLatestPost(1, 3)
                    .then(function(response) {
                        $scope.slidePost = response.data.content;
                        $rootScope.sliderA = '' + '<div class="homepage-slider">' + '<div id="sequence">' + '<ul class="sequence-canvas">';
                        angular.forEach(response.data.content, function(post) {
                            $rootScope.sliderA = $rootScope.sliderA + '' + '<li class="bg4">' + '<h2 class="title">Cơ hội làm việc dễ dàng</h2>' + '<h3 class="subtitle">Trường Đại học Công nghệ khai giảng năm học 2016-2017</h3>' + '<img class="slide-img" src="img/service-icon/title2.png" alt="Slide 1" />' + '</li>';
                        });
                        $rootScope.sliderA = $rootScope.sliderA + '' + '</ul>' + '<div class="sequence-pagination-wrapper">' + '<ul class="sequence-pagination">' + '<li> 1 </li> <li> 2 </li> <li> 3 </li>' + '</ul> ' + '</div> ' + '</div> ' + '</div>';
                        var slider = $rootScope.sliderA;
                        $('#slider_home').after(slider);
                        $('.homepage-slider').css('visibility', 'visibile');
                    }, function(error) {
                        console.log(error);
                    })
            }

        }
    ])
}());
