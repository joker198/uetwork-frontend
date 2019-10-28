(function() {
    var app = angular.module("login", []);
    app.controller('LoginCtrl', ['$scope', 'loginService', '$location', '$rootScope', '$window', '$routeParams', '$cookies', 'md5', '$timeout',
        function($scope, loginService, $location, $rootScope, $window, $routeParams, $cookies, md5, $timeout) {
            $scope.signupInput = {};
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
                    }, 10000);
                } else {
                    $scope.success = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.success = false;
                        });
                    }, 10000);
                }

            }
            $scope.input = {};
            $scope.resetPassword = function() {
                if ($scope.input.emailVNU != null) {
                    $scope.waitReset = true;
                    loginService.resetPassword($scope.input)
                        .then(function() {
                            $scope.alertSuccess("<p>Please check your vnu mail box to received your password.</p>", "");
                            $scope.waitReset = false;
                        }, function(error) {
                            $scope.alertDanger("Error", "");
                            console.log(error.data);
                            $scope.waitReset = false;
                        })
                }
            }

            $scope.login = function() {
                if ($scope.login.username != null && $scope.login.password != null) {
                    $scope.request = {
                        userName: $scope.login.username,
                        password: md5.createHash($scope.login.password || '')
                    };
                    $scope.wait = true;
                    loginService.login($scope.request)
                        .then(function(response) {
                            $scope.wait = false;
                            console.log(response);
                            if (response.data.token != null) {
                                $cookies.put('User-Data', response.data.token);
                                $cookies.put('username', response.data.userName);
                                $cookies.put('id', response.data.id);
                                $cookies.put('role', response.data.role);
                                if (response.data.role == 'STUDENT') {
                                    $cookies.put('studentId', response.data.studentId);
                                    $cookies.put('studentInfoId', response.data.studentId);
                                    $cookies.put('infoBySchoolId', response.data.infoBySchoolId);
                                    if (response.data.internId != null) {
                                        $cookies.put('internId', response.data.internId);
                                        $cookies.put('lecturersId', response.data.lecturersId);
                                        $cookies.put('lecturersName', response.data.lecturersName)
                                    }
                                    $window.location.href = $rootScope.clientAdd;
                                } else {
                                    $cookies.put('partnerID', response.data.partnerId);
                                    $cookies.put('partnerInfoId', response.data.partnerId);
                                    $window.location.href = $rootScope.clientAdd;
                                }
                            }

                        }, function(error) {
                            console.log(error);
                            $scope.wait = false;
                            if(error.data.indexOf("Wrong password") != -1){
                                $scope.alertDanger("Wrong password!", "");
                            } else if(error.data.indexOf("User not fonud") != -1){
                                $scope.alertDanger("User not found!", "");
                            } else {
                                $scope.alertDanger("Error", "");
                            }
                        })
                }

            };
 // || error.data.messages == 'Missing information!' || error.data.messages == 'Username not match!' || error.data.messages == 'Missing email!' || error.data.messages == 'Wrong vnu email!'
            $scope.signup = function() {
                if ($scope.signupInput.emailvnu != null && $scope.signupInput.fullName != null) {
                    $scope.wait = true;
                    loginService.signup($scope.signupInput)
                        .then(function() {
                            $scope.alertSuccess("<p>REGISTER SUCCEED</p><p>Please check your vnu mail box to received your password.</p>");
                            $scope.signupInput = {};
                            $scope.wait = false;
                        }, function(error) {
                            console.log(error);
                            if (error.data.indexOf('Wrong vnu email!') != -1) {
                                $scope.alertDanger("Wrong vnu email!", "");
                                // $scope.signupInput = {};
                                $scope.wait = false;
                            }
                            if (error.data.indexOf('Missing email!') != -1) {
                                $scope.alertDanger("Missing email!", "");
                                // $scope.signupInput = {};
                                $scope.wait = false;
                            }
                            if (error.data.indexOf('Missing information!') != -1) {
                                $scope.alertDanger("Missing information!", "");
                                // $scope.signupInput = {};
                                $scope.wait = false;
                            }
                            if (error.data.indexOf('email existed!') != -1) {
                                $scope.alertDanger("Email existed!", "");
                                // $scope.signupInput = {};
                                $scope.wait = false;
                            } else {
                                $scope.alertDanger("Error, Please try again!", "");
                                // $scope.signupInput = {};
                                $scope.wait = false;
                            }
                        })
                }

            }

            $scope.getNotificationMessage = function() {
                loginService.getNotificationMessage()
                    .then(function(response) {
                        $scope.messages = response.data;
                    })
            }
        }
    ])
}());
