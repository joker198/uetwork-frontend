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
                    }
                    $scope.result = true;
                    if ($scope.search.data == "searchPartner") {
                        $scope.request = {
                            partnerName: $scope.search.input
                        };
                        searchService.searchPartner($scope.request)
                            .then(function(response) {
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

                    if ($scope.search.data == "searchDescription") {
                        $scope.request = {
                            describePost: $scope.search.input
                        };
                        searchService.searchDescription($scope.request)
                            .then(function(response) {
                                    if (response.data == '') {
                                        $scope.result = false;
                                    } else {
                                        $scope.searchResponses = response.data;
                                    }
                                },
                                function(error) {
                                    console.log(error);
                                })
                    }

                    if ($scope.search.data == "searchContent") {
                        $scope.request = {
                            content: $scope.search.input
                        };
                        searchService.searchContent($scope.request)
                            .then(function(response) {
                                    if (response.data == '') {
                                        $scope.result = false;
                                    } else {
                                        $scope.searchResponses = response.data;
                                    }

                                },
                                function(error) {})
                    }

                    if ($scope.search.data == "searchStudent") {
                        $scope.request = {
                            fullName: $scope.search.input
                        };
                        searchService.searchStudent($scope.request)
                            .then(function(response) {
                                    if (response.data == '') {
                                        $scope.result = false;
                                    } else {
                                        $scope.searchResponses = response.data;
                                    }
                                },
                                function(error) {
                                    console.log(error);
                                })
                    }
                    $rootScope.search.data = $scope.search.data;
                    $rootScope.search.input = $scope.search.input;
                };

                $scope.show = function(data) {
                    $rootScope.partnerData = data;
                }
            }
        ])
}());
