//sau khi save intern thi khong thuc hien search intern dc nữa . chả hiểu vì sao
(function() {
    var app = angular.module("intern", []);
    app.controller('internCtrl', ['$scope', 'internService', 'studentService', 'infoService', '$rootScope', '$stateParams', 'lecturersService', '$window', '$location', '$timeout', 'filterFilter',
        function($scope, internService, studentService, infoService, $rootScope, $stateParams, lecturersService, $window, $location, $timeout, filterFilter) {
            $rootScope.currentPageName = $state.current.name;
            $rootScope.index = false;
            $scope.typing = false;
            $scope.showIntern = false;
            $scope.company = null;
            $scope.search = null;
            $scope.to_date = null;
            $scope.hideIntern = false;
            $scope.comments = [];
            $scope.showInput = false;
            $scope.input = {};
            $scope.intern = {};
            $scope.lecturers = {};

            $scope.deleteIntern = function(internId) {
                internService.deleteIntern(internId)
                    .then(function(response) {
                        $('#close_modal_delete_intern').trigger('click');
                        $scope.alertSuccess("Xóa internship thành công!", "");
                        $scope.getAllStudentByInternshipTerm();
                    }, function(error) {
                        $('#close_modal_delete_intern').trigger('click');
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.createInternship = function() {
                if ($scope.intern.partnerId == 'other') {
                    $scope.intern.partnerId = 0;
                }
                console.log($scope.intern);
                internService.createIntern($scope.intern)
                    .then(function(response) {
                        $scope.alertSuccess("Tạo internship thành công!", "");
                        $scope.intern = {};
                        $scope.getAllStudentByInternshipTerm();
                    }, function(error) {
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.entry = '';
            $scope.paginate = function() {
                // console.log($scope.entry);
                if ($scope.entry != '') {
                    if ($scope.entry > $scope.totalItems) {
                        $scope.entryLimit = $scope.totalItems;
                    } else {
                        $scope.entryLimit = $scope.entry;
                    }
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                } else {
                    $scope.entryLimit = 25;
                    if ($scope.entryLimit > $scope.totalItems) {
                        $scope.entryLimit = $scope.totalItems;
                    }
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                }
            }

            $scope.getAllStudentNoLecturers = function() {
                internService.getAllStudentNoLecturers()
                    .then(function(response) {
                        console.log(response.data);
                        $scope.allStudentNoLecturers = response.data;
                        $scope.totalItems = response.data.length;
                        $scope.currentPage = 1;
                        $scope.entryLimit = 25;
                        if ($scope.entryLimit > $scope.totalItems) {
                            $scope.entryLimit = $scope.totalItems;
                        }
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                        $scope.$watch('search', function(newVal, oldVal) {
                            $scope.filtered = filterFilter($scope.allStudentNoLecturers, newVal);
                            $scope.totalItems = $scope.filtered.length;
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                            $scope.currentPage = 1;
                        }, true);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getNameAndIdOfLecturers = function() {
                internService.getNameAndIdOfLecturers()
                    .then(function(response) {
                        console.log(response);
                        $scope.nameAndIdOfLecturers = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getNameAndIdOfPartnersFit = function() {
                alert(1);
                internService.getNameAndIdOfPartners("true")
                    .then(function(response) {
                        console.log(response);
                        $scope.nameAndIdPartnersFit = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getNameAndIdOfPartners = function() {
                internService.getNameAndIdOfPartners("false")
                    .then(function(response) {
                        console.log(response);
                        $scope.nameAndIdPartners = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getInternOfLecturers = function() {
                internService.getInternOfLecturers($rootScope.lecturersId)
                    .then(function(response) {
                        $scope.allInterns = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.addLecturersStudent = function() {
                // console.log($scope.listStudent);
                // console.log($scope.lecturers.lecturersId);

                internService.addLecturersStudent($scope.listStudent, $scope.lecturers.lecturersId)
                    .then(function() {
                        $scope.alertSuccess("Thêm giảng viên thành công!", "");
                        $scope.getAllStudentNoLecturers();
                        $scope.listStudent = [];
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.getAllLecturers = function() {
                lecturersService.getAllLecturers()
                    .then(function(response) {
                        $scope.allLecturers = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }
            $scope.listStudent = [];

            $scope.addStudent = function(student) {
                if (student.checked == true) {
                    $scope.listStudent.push({
                        id: student.id,
                        studentName: student.fullName
                    })
                } else {
                    // if ()
                    // function findStudent(st) {
                    //     return st.id === student.id;
                    // }

                    // var index = $scope.listStudent.find(findStudent);
                    // console.log(index);
                    // index = null;
                    // // $scope.listStudent.splice(index, 1);
                    // angular.forEach($scope.listStudent, function(st){
                    //     if(student.id == st.id){
                    //         $scope.listStudent.splice(st, 1);
                    //         $('#' + student.id).remove();
                    //         break;
                    //     }
                    // });
                    for (i = 0; i <= $scope.listStudent.length; i++) {

                        if (student.id == $scope.listStudent[i].id) {
                            console.log(student.id);
                            console.log($scope.listStudent[i]);
                            var index = $scope.listStudent.indexOf($scope.listStudent[i])
                            $scope.listStudent.splice(index, 1);
                            break;
                        }
                    }

                }
            }

            $scope.removeStudent = function(index) {
                $scope.listStudent.splice(index, 1);
            }

            $scope.createListStudentToAddLecturers = function() {
                $scope.listStudent = [];
                angular.forEach($scope.allInterns, function(intern) {
                    if (intern.checked == true) {
                        $scope.listStudent.push({
                            id: intern.id,
                            studentName: intern.student.fullName
                        })
                    }
                });
                console.log($scope.listStudent);
            }

            $scope.getAllStudentByInternshipTerm = function(){
                internService.getAllStudentByInternshipTerm($stateParams.internshipTermId)
                .then(function(response){
                    $scope.allInterns = response.data;
                        console.log(response);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllInternshipByInternshipTerm = function() {
                internService.getAllInternshipByInternshipTerm($stateParams.internshipTermId)
                    .then(function(response) {
                        $scope.allInterns = response.data;
                        console.log(response);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.loadAllInternshipTermPost = function(internshipTermId) {
                internService.loadPostOfInternshipTerm(internshipTermId)
                    .then(function(response) {
                        $scope.allPosts = response.data;
                    }, function(error) {
                        console.log(error);
                    });
            }

            $scope.closePost = function() {
                $scope.show_post = false;
            };

            $scope.showPost = function(post) {
                $scope.show_post = true;
                $scope.post = post;
            };

            $scope.alertDate = function() {
                console.log($scope.input.startDate);
            }

            $scope.createInternshipTerm = function() {
                if ($scope.input.year != "" && $scope.input.startDate != "" && $scope.input.endDate != "") {
                    console.log($scope.input.startDate)
                    internService.createInternshipTerm($scope.input)
                        .then(function(response) {
                            $scope.alertSuccess("Tạo kì thực tập thành công!", "")
                            $scope.input.year = "";
                            $scope.input.endDate = "";
                            $scope.input.startDate = "";
                            $scope.getAllInternshipTerm();
                        }, function(error) {
                            // console.log(error);
                            $scope.alertDanger(error.message, "")
                        });
                }
            }

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];
            $scope.dateOptions = {
                // dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.open2 = function() {
                $scope.popup2 = {};
                $scope.popup2.opened = true;
            };

            $scope.editInternshipTerm = function(startDate, endDate, internshipTermId) {
                // $('#nation_' + nationId).html('<div class="col-md-4 col-sm-4 col-xs-6">' + 
                //     '<input type="text" name="country" class="form-control col-md-6" ng-model="' + nationName + '" required /></div>');
                // var internshipTermName = $('#internshipTerm_' + internshipTermId).text();
                // console.log(startDate);
                // $('#internshipTerm_' + internshipTermId).val(startDate);
                startDate = new Date();
                $('#internshipTerm_' + internshipTermId).val(startDate);
                var curr_date = startDate.getDate();
                var curr_month = startDate.getMonth() + 1; //Months are zero based
                var curr_year = startDate.getFullYear();
                startDate = curr_year + "-" + curr_month + "-" + curr_date;
            }

            $scope.saveEditinternshipTerm = function(internshipTerm) {
                // console.log(nationId);
                // console.log(internshipTerm);
                internService.editInternshipTerm(internshipTerm)
                    .then(function() {
                        $scope.alertSuccess("Sửa kì thực tập thành công!", "");
                        // $scope.load
                    }, function(error) {
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.getAllInternshipTerm = function() {
                internService.getAllInternshipTerm()
                    .then(function(response) {
                        console.log(response.data);
                        $scope.allInternshipTerm = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.comfirmDelete = function(id) {
                $scope.comfirmDeleteId = id;
            }

            $scope.deleteInternshipTerm = function(id) {
                internService.deleteInternshipTerm(id)
                    .then(function() {
                        $('#close_modal_delete_internship_term').trigger('click');
                        $scope.alertSuccess("Xóa kì thực tập thành công!", "");
                        $scope.getAllInternshipTerm();
                    }, function(error) {
                        $('#close_modal_delete_internship_term').trigger('click');
                        $scope.alertDanger("Không thể xóa kì thực tập này!", "");
                    })
            }

            $scope.showInput_ = function(id, filterValue) {
                $scope.showInput = true;
                $('#' + id).after('<td><input  id="' + id + '_" type="text" value="' + filterValue + '">' + '</td>');
                $('#' + id).remove();
            };

            $scope.changeFilterValue = function(data) {
                $scope.request = {
                    filter: data.filter
                };
                internService.changeFilterValue($scope.request, data.id)
                    .then(function(response) {
                        console.log(response)
                    }, function(error) {
                        alert("ko thanh cong");
                        console.log(error);
                    })
            };

            $scope.saveManyFilterValue = function() {
                angular.forEach($scope.comments, function(comment) {
                    $scope.changeFilterValue(comment);
                    comment.check = false;
                })
            };

            $scope.searchDate = function(data) {
                // alert(data);
                // var myDate=data;
                // myDate=myDate.split("-");
                // var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];
                // // alert(new Date(newDate).getTime());
                // $scope.search.startDate = new Date(newDate).getTime()
            };

            $scope.showComment = function(partnerid) {

                if ($scope.hideIntern == false) {
                    $scope.hideIntern = true;
                    internService.showAllCommentOfOnePartner(partnerid)
                        .then(function(response) {
                            $scope.comments = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                } else {
                    $scope.hideIntern = false;
                }

            };

            $scope.showAllInternOfPartner = function() {
                $scope.partnerId = $stateParams.partnerId;
                internService.showAllInternOfPartner($stateParams.partnerId)
                    .then(function(response) {
                        $scope.allInternOfPartner = response.data;
                        $scope.count = $scope.allInternOfPartner.length;
                        // console.log(response.data);
                        angular.forEach($scope.allInternOfPartner, function(intern) {
                            if ($scope.company == null) {
                                $scope.company = intern.company;
                            }
                            if ($scope.company == null) {
                                $scope.company = intern.company;
                            }
                            infoService.loadStudentInfo(intern.studentId)
                                .then(function(response) {
                                    intern.studentInfo = response.data;
                                })
                        })
                    }, function(error) {
                        console.log(error)
                    })
            };
            // $scope.showAllInternOfpartner = function () {
            //     internService.showAllInternOfpartner($stateParams.partnerId)
            //         .then(function (response) {
            //             console.log(response);
            //         }, function (error) {
            //             console.log(error);
            //         })
            // };

            $scope.showAllIntern_ = function() {
                if ($scope.showIntern == false || $scope.saveIntern == true) {
                    $scope.showIntern = true;
                    $scope.saveIntern = false;
                    $scope.showIsIntern();
                } else {
                    $scope.showIntern = false;
                }
            };
            $scope.showNotIntern = function() {
                $scope.notIntern = [];
                studentService.loadAllStudent()
                    .then(function(data) {
                        $scope.allIntern = data.data;
                        angular.forEach($scope.allIntern, function(v) {
                            if (v.internship == null) {
                                $scope.notIntern.push(v);
                            }
                        })
                    })
            };
            $scope.showIsIntern = function() {
                $scope.isIntern = [];
                studentService.loadAllStudent()
                    .then(function(data) {
                            $scope.allIntern = data.data;
                            angular.forEach($scope.allIntern, function(v) {
                                if (v.internship != null) {
                                    v.checked = false;
                                    $scope.isIntern.push(v);
                                }
                            })
                        },
                        function() {

                        })
            };
            $scope.getPartner = function() {
                internService.getPartner()
                    .then(function(data) {
                        $scope.partner = data.data;
                    })
            };

            $scope.showPartner = function() {
                if ($scope.create.partnerName == '') {
                    $scope.partner = false;
                } else {
                    $scope.getPartner();
                    $scope.partner = true;
                }
            };

            $scope.choosePartner = function(partner) {
                $scope.create.partnerName = partner.partnerName; //sau khi chon MSSV co the hien thi la ten hoac MSSV, tinh sau
                $scope.create.partnerId = partner.id;
                $scope.partner = false;
            };

            $scope.chooseStudent = function(student) {
                $scope.create.infoBySchool.studentCode = student.infoBySchool.studentCode; //sau khi chon MSSV co the hien thi la ten hoac MSSV, tinh sau
                $scope.create.studentId = student.id;
                $scope.typing = false;
            };

            $scope.creatIntern = function() {
                $scope.request = {
                    partnerId: $scope.create.partnerId,
                    company: $scope.create.partnerName,
                    startDate: $scope.create.startDate,
                    endDate: $scope.create.endDate,
                    supervisor: $scope.create.supervisor
                };
                internService.createIntern($scope.request, $scope.create.studentId)
                    .then(function() {
                        $scope.saveIntern = true;
                        $scope.showAllIntern_();
                        $scope.create.partnerId = '';
                        $scope.create.partnerName = '';
                        $scope.create.startDate = '';
                        $scope.create.endDate = '';
                        $scope.create.supervisor = '';
                        //$scope.typing = false;
                    }, function(error) {
                        $scope.response = error;
                    });
                $scope.create.infoBySchool.studentCode = null;
            };

            $scope.showName = function() {
                //alert(1);
                if ($scope.create.infoBySchool.studentCode == '') {
                    //alert(2);
                    $scope.typing = false;
                } else {
                    //alert(3);
                    $scope.typing = true;
                    $scope.showNotIntern();
                }
            };
            $scope.count = 0;
            $scope.chooseIntern = function(intern) {
                if (intern.checked != true) {
                    intern.checked = true;
                    if ($scope.count == 0) {
                        $scope.count = 1;
                    } else {
                        $scope.count++;
                    }
                } else
                if (intern.checked == true) {
                    intern.checked = false;
                    $scope.count--;
                    // alert(v.checked);
                }
            };

            $scope.editIntern = function(intern) {
                internService.editIntern(intern)
                    .then(function() {
                        $scope.showIntern = false;
                        $scope.showAllIntern_();
                    })
            };

            $scope.selectAllId = false;
            $scope.selectAll = function() {
                if ($scope.selectAllId == false) {
                    $scope.count = 0;
                    angular.forEach($scope.isIntern, function(v) {
                        v.checked = true;
                        $scope.count++;
                    });
                    $scope.selectAllId = true;
                } else {
                    angular.forEach($scope.isIntern, function(v) {
                        v.checked = false;
                    });
                    $scope.count = 0;
                    $scope.selectAllId = false;
                }
            };

            $scope.delOne = function(intern) {
                internService.del(intern.internship.id, intern.id);
                $scope.count = 0;
                $scope.showIntern = false;
                $scope.showAllIntern_();
            };

            $scope.delAll = function() {
                angular.forEach($scope.isIntern, function(v) {
                    if (v.checked == true) {
                        internService.del(v.internship.id, v.id);
                    }
                });
                $scope.count = 0;
                $scope.showIntern = false;
                $scope.showAllIntern_();
            };

            $scope.comfirmDelete = function(id) {
                console.log(id);
                $scope.comfirmDeleteId = id;
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
                    }, 3000);
                } else {
                    $scope.success = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.success = false;
                        });
                    }, 3000);
                }

            }
        }
    ])
}());
