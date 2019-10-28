(function() {
    var app = angular.module("intern", []);
    app.controller('internCtrl', ['$scope', 'internService', 'infoService', '$rootScope', '$window', '$location', '$cookies', '$state', '$timeout',
        function($scope, internService, infoService, $rootScope, $window, $location, $cookies, $state, $timeout) {
            $scope.comment = [];
            $scope.error_message = '';
            $rootScope.currentPage = $state.current.name;

            $scope.mess = {};
            // $scope.mess.

            // var date = new Date();
            // date.setDate(date.getDate() - 1);
            // date = date.getTime();
            // $scope.today = date;
            // console.log(date);

            $scope.createInternship = function() {
                internService.createInternship()
                    .then(function(response) {
                        console.log(response)
                        $scope.getCurrentInternshipOfInternshipTerm();
                    }, function(error) {
                        if(error.data.message == "Out of date"){
                            $scope.alertDanger("Quá hạn đăng ký", "");
                        } else {
                            $scope.alertDanger("Có lỗi xảy ra", "");
                        }
                    })
            }

            $scope.deleteInternship = function() {
                $("#close_select_partner").trigger('click');
                internService.deleteInternship()
                    .then(function(response) {
                        $window.location.href = $rootScope.clientAdd;
                    }, function(error) {
                        if(error.data.message == "Out of date"){
                            $scope.alertDanger("Quá hạn đăng ký/hủy", "");
                        } else {
                            $scope.alertDanger("Có lỗi xảy ra", "");
                        }
                    })
            }

            // $scope.getCurrentInternshipOfInternshipTerm = function() {
            //     internService.getCurrentInternshipOfInternshipTerm()
            //         .then(function(response) {
            //             console.log(response);
            //             $rootScope.internship = response.data;
            //         }, function(error) {
            //             console.log(error);
            //         })
            // }

            $scope.select = function(partnerId, partnerName) {
                $scope.selectedPartnerId = partnerId;
                $scope.selectedPartnerName = partnerName;
                $scope.showButton = true;
            }

            $scope.selectPartner = function() {
                $('#close_select_partner').trigger('click');
                internService.selectInternByPartnerId($scope.selectedPartnerId)
                    .then(function(response) {
                        $cookies.put('internId', response.data.id);
                        $rootScope.internId = $cookies.get('internId');
                        $scope.alertSuccess("Select Internship Success", "");
                    }, function(error) {
                        // alert(error.data.message);
                        console.log(error);
                        if (error.data.message == 'Internship is available!' || error.data.message == 'Cannot choose this partner!' || error.data.message == 'Please fill all your information in profile!') {
                            $scope.alertDanger(error.data.message, "");
                        }
                    })
            }

            $scope.getAllInternship = function() {
                internService.getAllInternship()
                    .then(function(response) {
                        $scope.allInternship = response.data;
                        $scope.internshipTermIds = [];
                        angular.forEach($scope.allInternship, function(intern) {
                            $scope.internshipTermIds.push(intern.internshipTerm.id);
                        })
                        // console.log(Math.max(...$scope.internshipTermIds));
                        $scope.currentInternshipTerm = Math.max(...$scope.internshipTermIds);
                        angular.forEach($scope.allInternship, function(intern) {
                            // console.log(intern.internshipType);
                            angular.forEach(intern.follows, function(f) {
                                if (f.status == "SELECTED") {
                                    intern.selected = true;
                                }
                            })
                            if (intern.internshipType != null) {
                                intern.internshipType = intern.internshipType.replace('Recruitment_other', 'Công ty');
                                intern.internshipType = intern.internshipType.replace('Recruitment', 'Công ty');
                                intern.internshipType = intern.internshipType.replace('company', 'Công ty');
                                intern.internshipType = intern.internshipType.replace('NCKH', 'Tại trường');
                            }
                        })
                        console.log(response.data);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.showIntern = function() {
                // if($cookies.get('internId']){
                internService.showIntern($rootScope.internId)
                    .then(function(response) {
                        console.log(response);
                        $scope.intern = response.data;
                    }, function(error) {
                        convert.log(error);
                    });
                // }
            };
            $scope.checkComment = function() {
                internService.checkComment($rootScope.internId)
                    .then(function(response) {
                        $scope.commented = response.data != "";
                        console.log($scope.commented);
                    }, function(error) {
                        console.log(error);
                    })
            };

            $scope.writeComment = function() {
                if ($scope.comment.content != '' && $scope.comment.rating > 0 && $scope.comment.rating <= 5) {
                    $scope.request = {
                        content: $scope.comment.content,
                        rating: $scope.comment.rating
                    };
                    internService.writeComment($scope.request, $scope.intern.partnerId)
                        .then(function(response) {
                            console.log(response);
                            alert("Commented")
                        }, function(error) {
                            console.log(error);
                            alert("Comment error")
                        })
                } else {
                    $scope.error_message = "Comment not null and Rating value must be between 1 and 5. ";
                }

            };

            $scope.convert = function() {
                var xlf = document.getElementById('xlf');

                function handleFile(e) {
                    var files = e.target.files;
                    var i, f;
                    for (i = 0, f = files[i]; i != files.length; ++i) {
                        var reader = new FileReader();
                        var name = f.name;
                        reader.onload = function(e) {
                            var data = e.target.result;

                            var workbook = XLSX.read(data, { type: 'binary' });

                            var first_sheet_name = workbook.SheetNames[0];
                            /* DO SOMETHING WITH workbook HERE */
                            var worksheet = workbook.Sheets[first_sheet_name];
                            $rootScope.excel = XLSX.utils.sheet_to_json(worksheet);

                            if ($rootScope.excel) {
                                console.log($rootScope.excel);
                            }
                        };
                        reader.readAsBinaryString(f);
                    }
                }
                if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

                // input_dom_element.addEventListener('change', handleFile, false);
            }

            $scope.setExcelTable = function() {
                // alert(1);
                // console.log($rootScope.excel);
                $scope.excelTable = $rootScope.excel;
                // $rootScope.excelTable =$rootScope.excel  ;
            }

            $scope.send = function() {
                internService.createMultiIntern($scope.excelTable)
                    .then(function() {

                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.showAllInternOfPartner = function() {
                internService.showAllInternOfPartner($cookies.get('partnerID'))
                    .then(function(response) {
                        $scope.allInternOfPartner = response.data;
                        console.log(response.data);
                        angular.forEach($scope.allInternOfPartner, function(intern) {
                            infoService.loadStudentInfo(intern.studentId)
                                .then(function(response) {
                                    intern.studentInfo = response.data;
                                })
                        })
                    }, function(error) {
                        console.log(error)
                    })
            }

            $scope.alertWarning = function(warning, timeout) {
                $scope.warningMessage = warning;
                $scope.warning = true;
                $timeout(function() {
                    // 
                    $(".alert").fadeTo(500, 0).slideUp(500, function() {
                        $scope.warning = false;
                        $scope.warningMessage = "";
                    });
                }, timeout);

            }


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
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.danger = false;
                            $scope.errorMessage = "";
                        });
                    }, 6000);
                }
            }
            $scope.alertSuccess = function(string, success, click) {
                $scope.successMessage = string;
                if (click == undefined) {
                    if (success == 'successdelete_edit') {
                        $scope.successdelete_edit = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.successdelete_edit = false;
                            });
                        }, 3000);
                    } else {
                        $scope.success = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.success = false;
                            });
                        }, 3000);
                    }
                } else {
                    if (success == 'successdelete_edit') {
                        $scope.successdelete_edit = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.successdelete_edit = false;
                            });
                        }, 30000);
                    } else {
                        $scope.success = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.success = false;
                            });
                        }, 30000);
                    }
                }
            }

        }
    ])
}());