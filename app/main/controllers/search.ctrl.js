(function() {
    var app = angular.module("search", []);
    app.controller('SearchCtrl', ['$scope', 'searchService', '$location', '$rootScope', '$window', '$routeParams',
            function($scope, searchService, $location, $rootScope, $window, $routeParams) {

                $scope.deleteRootScopeSearch = function(){
                    delete $rootScope.search.data;
                    delete $rootScope.search.input;
                }

                $scope.search = function() {
                    if ($rootScope.search.data && $rootScope.search.input) {
                        $scope.search.data = $rootScope.search.data;
                        $scope.search.input = $rootScope.search.input;
                        // console.log($scope.search.data);
                        // $scope.search();
                    }
                    $scope.result = true;
                    //search Partner
                    if ($scope.search.data == "searchPartner") {
                        //alert(1);
                        $scope.request = {
                            partnerName: $scope.search.input
                        };
                        searchService.searchPartner($scope.request)
                            .then(function(response) {
                                    console.log(response.data);
                                    if (response.data == '') {
                                        $scope.result = false;
                                    } else {
                                        $scope.searchPartner = response.data;
                                    }
                                },
                                function(error) {
                                    console.log(error);
                                })
                    }

                    //search by Post Description
                    if ($scope.search.data == "searchDescription") {
                        $scope.request = {
                            describePost: $scope.search.input
                        };
                        searchService.searchDescription($scope.request)
                            .then(function(response) {
                                    console.log(response.data);
                                    if (response.data == '') {
                                        $scope.result = false;
                                        // alert(1);
                                    } else {
                                        $scope.searchResponses = response.data;
                                    }

                                },
                                function(error) {
                                    console.log(error);
                                })
                    }

                    //search by post content
                    if ($scope.search.data == "searchContent") {
                        $scope.request = {
                            content: $scope.search.input
                        };
                        searchService.searchContent($scope.request)
                            .then(function(response) {
                                    console.log(response.data);
                                    if (response.data == '') {
                                        $scope.result = false;
                                    } else {
                                        $scope.searchResponses = response.data;
                                    }

                                },
                                function(error) {})
                    }

                    if ($scope.search.data == "searchStudent") {
                        //alert(1);
                        $scope.request = {
                            fullName: $scope.search.input
                        };
                        searchService.searchStudent($scope.request)
                            .then(function(response) {
                                    // console.log(response.data);
                                    if (response.data == '') {
                                        $scope.result = false;
                                    } else {
                                        $scope.searchResponses = response.data;
                                    }

                                    // $scope.searchResponses = response.data;
                                },
                                function(error) {
                                    console.log(error);
                                })
                    }
                    // alert(1);
                    $rootScope.search.data = $scope.search.data;
                    $rootScope.search.input = $scope.search.input;
                };

                $scope.show = function(data) {
                    $rootScope.partnerData = data;
                }
            }
        ])
}());
