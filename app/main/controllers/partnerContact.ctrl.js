
(function () {
    var app = angular.module("partnerContact",[]);
    app.controller('partnerContactCtrl',['$scope', 'partnerContactService', '$rootScope','$window' ,'$location', '$cookies',
            function($scope,partnerContactService,$rootScope,$window,$location,$cookies){
                $scope.partnerContact=[];
                $scope.loadContact = function() {
                    partnerContactService.loadContact($cookies.get('partnerID'))
                        .then(function(data) {
                            $scope.partnerContact=data.data;
                        },
                        function(error) {
                            console.log(error);
                        })
                };

                $scope.createAContact = function() {
                    $scope.request ={
                        contactName : $scope.contactName,
                        address : $scope.address,
                        skype : $scope.skype,
                        email : $scope.email
                    };
                    partnerContactService.createAContact($cookies.get('partnerID'),$scope.request)
                        .then(function() {
                            $scope.contactName = '';
                            $scope.address = '';
                            $scope.skype = '';
                            $scope.email = '';
                            $scope.loadContact();
                        },
                        function(error){
                            console.log(error);
                        })
                };

                $scope.editAContact=function(id) {
                    angular.forEach($scope.partnerContact,function(arr) {
                        if(arr.id==id){
                            $scope.request=arr;
                        }
                    });
                    partnerContactService.editAContact(id,$scope.request)
                        .then(function() {
                            alert("Sửa thông tin thành công");
                            $scope.loadContact();
                        },
                        function(error){
                            console.log(error);
                        })
                };

                $scope.deleteAContact = function(id) {
                    partnerContactService.deleteAContact(id)
                        .then(function() {
                            alert("Xóa thành công");
                                $scope.loadContact();
                            },
                            function(error){
                                console.log(error);
                            })
                }
            }])
}());
