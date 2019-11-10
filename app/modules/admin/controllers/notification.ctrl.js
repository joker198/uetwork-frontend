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