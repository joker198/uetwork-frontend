(function() {
    var app = angular.module("partnerInfo", []);
    app.controller('partnerInfoCtrl', ['$scope', 'partnerInfoService', 'partnerContactService', 'partnerPostService',
            '$stateParams', '$rootScope', '$route', '$window', '$location', '$cookies',
            function($scope, partnerInfoService, partnerContactService, partnerPostService, $stateParams, $rootScope, $window,
                $location, $route, $cookies) {
                $scope.partnerInfo = [];
                $scope.image = false;

                $scope.myImage = '';
                $scope.myCroppedImage = '';
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
                $scope.changeLogo = function() {
                    $scope.req = {
                        logo: $scope.myCroppedImage.substring(22)
                    };
                    partnerInfoService.changeLogo($scope.req)
                        .then(function() {
                                $scope.pic = true;
                                window.location.reload();
                            },
                            function(error) {
                                console.log(error);
                            });
                };

                $scope.showPartnerPost = function() {
                    partnerPostService.loadPost($stateParams.partnerId)
                        .then(function(response) {
                            $scope.partnerPosts = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.showTab = function() {
                    $scope.show = true;
                }

                $scope.showPartnerContact = function() {
                    $scope.show = false;
                    partnerContactService.loadContact($stateParams.partnerId)
                        .then(function(response) {
                            $scope.contacts = response.data;
                            angular.forEach($scope.contacts, function(contact) {
                                contact.tab = contact.id + "_" + contact.partnerId;
                            })
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.loadPartner = function() {
                    if ($rootScope.partnerData == null) {
                        partnerInfoService.loadPartnerInfo($stateParams.partnerId)
                            .then(function(data) {
                                    $scope.partnerInfo = data.data;
                                    if ($scope.partnerInfo.logo == null) {
                                        $scope.pic = false;
                                    } else {
                                        $scope.pic = true;
                                    }
                                },
                                function(error) {
                                    console.log(error);
                                });
                    } else {
                        $scope.partnerInfo = $rootScope.partnerData;
                    }
                    if ($scope.partnerInfo.averageRating == null) {
                        $scope.partnerInfo.averageRating = false;
                    }
                }

                $scope.loadPartnerInfo = function() {
                    partnerInfoService.loadPartnerInfo($cookies.get('partnerID'))
                        .then(function(data) {
                                $scope.partnerInfo = data.data;
                                if ($scope.partnerInfo.logo == null) {
                                    $scope.pic = false;
                                } else {
                                    $scope.pic = true;
                                }
                            },
                            function(error) {
                                console.log(error);
                            });
                };

                $scope.editPartnerInfo = function() {
                    partnerInfoService.editPartnerInfo($cookies.get('partnerInfoId'), $scope.partnerInfo)
                        .then(function() {
                                alert("Sửa thông tin thành công");
                                $scope.loadPartnerInfo();
                            },
                            function(error) {
                                console.log(error);
                            })
                };

                $scope.deletePartnerInfo = function() {
                    partnerInfoService.deletePartnerInfo($cookies.get('partnerID'))
                        .then(function() {
                                alert("Xóa thông tin thành công");
                                $scope.loadPartnerInfo();
                            },
                            function(error) {
                                console.log(error);
                            })
                };

                var init = function() {
                    if ($stateParams.partnerId) {
                        $scope.partnerIdSelected = $stateParams.partnerId;
                    }
                };
                init();

                $scope.follow = function(postId, postTitle) {
                    $scope.request = {
                        studentName: $rootScope.username,
                        postTitle: postTitle
                    };
                    partnerPostService.follow(postId, $rootScope.studentId, $scope.request)
                        .then(function() {}, function(error) {
                            console.log(error);
                        });
                    $scope.subs = true;
                };

                $scope.unfollow = function(postId) {
                    partnerPostService.unfollow(postId, $rootScope.studentId)
                        .then(function() {}, function(error) {
                            console.log(error);
                        });
                    $scope.subs = false;
                };

                $scope.checkFollow = function(postId) {
                    partnerPostService.checkFollow(postId, $rootScope.studentId)
                        .then(function(data) {
                            if (data.data.id == 0) {
                                $scope.subs = false;
                            } else {
                                $scope.subs = true;
                            }

                        }, function(error) {
                            console.log(error);
                        });
                };
            }
        ])
}());
