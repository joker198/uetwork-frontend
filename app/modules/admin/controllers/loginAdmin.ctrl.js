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
                                sessionStorage.setItem('userName', response.data.userName);
                                sessionStorage.setItem('idAdmin', response.data.id);
                                sessionStorage.setItem('role', response.data.role);
                                if (response.data.lecturers != null) {
                                    sessionStorage.setItem('lecturersId', response.data.lecturers.id);
                                }
                            }
                            if (response.data.role == 'ADMIN') {
                                window.location.href = $rootScope.clientAdd + '/admin';
                            } else if(response.data.role == 'LECTURERS'){
                                alert(1)
                                window.location.href = $rootScope.clientAdd + '/lecturers';
                            }
                        }, function(error) {
                            alert('dang nhap khong thanh cong');
                        })
                };
            }
        ])
}());
