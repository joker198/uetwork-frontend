(function() {
    var app = angular.module("student", []);
    angular.module('student')
        .controller('studentCtrl', ['lecturersService', 'internService', '$scope', 'studentService', 'messageService',
            '$timeout', '$location', '$rootScope', 'filterFilter', '$stateParams', 'orderByFilter', '$state', 'partnerService', '$compile',
            '$sce',
            function(lecturersService, internService, $scope, studentService, messageService, $timeout, $location, $rootScope,
                filterFilter, $stateParams, orderBy, $state, partnerService, $compile, $sce) {
                // alert(1);
                $rootScope.currentPageName = $state.current.name;
                // console.log($rootScope.currentPage);
                $scope.st = {};
                $scope.st.infoBySchool = {};
                $scope.st.infoBySchool.studentClass = "";
                $scope.studentInfoBySchool = [];
                $scope.entry = '';
                $scope.search = '';
                $scope.input = {};
                $scope.intern = {};
                $scope.lecturers = {};
                $scope.postTitle = "";
                $scope.type = null;
                $scope.downloadTypeLecturers = "";
                $scope.listStudent = [];
                // $scope.type = {};
                // $scope.type.lecturers = null;

                $scope.filterLec = function(type) {
                    var count = 0;
                    $scope.currentPage = 1;
                    if (type == 'false') {
                        angular.forEach($scope.allStudents, function(student) {
                            if (student.lecturers == null) {
                                student.show = true;
                                count++;
                            } else {
                                student.show = false;
                            }
                        })
                        $scope.totalItems = count;
                    } else if (type == 'true') {
                        angular.forEach($scope.allStudents, function(student) {
                            if (student.lecturers != null) {
                                student.show = true;
                                count++;
                            } else {
                                student.show = false;
                            }
                        })
                        $scope.totalItems = count;
                    } else {
                        angular.forEach($scope.allStudents, function(student) {
                            student.show = true;
                        })
                    }
                }

                $scope.filterScore = function(type) {
                    var count = 0;
                    $scope.currentPage = 1;
                    if (type == 'false') {
                        angular.forEach($scope.allStudents, function(student) {
                            if (student.score == null) {
                                student.show = true;
                                count++;
                            } else {
                                student.show = false;
                            }
                        })
                        $scope.totalItems = count;
                    } else if (type == 'true') {
                        angular.forEach($scope.allStudents, function(student) {
                            if (student.score != null) {
                                student.show = true;
                                count++;
                            } else {
                                student.show = false;
                            }
                        })
                        $scope.totalItems = count;
                    } else {
                        angular.forEach($scope.allStudents, function(student) {
                            student.show = true;
                        })
                    }
                }

                $scope.changeType = function(postType) {
                    if (postType == 'noFollow') {
                        $scope.getStudentNoInternshipTerm();
                    }
                    if (postType == 'Recruitment_other') {
                        $scope.typeName = 'Công ty ngoài';
                    }
                    if (postType == 'Recruitment') {
                        $scope.typeName = 'Đối tác';
                    }
                    if (postType == 'Research') {
                        $scope.typeName = 'Tại trường';
                    }
                    if (postType == "") {
                        $scope.typeName = "";
                    }
                    $scope.currentPage = 1;
                    var count = 0;
                    if (postType != 'noFollow' && postType != "") {
                        // $scope.totalItems = filterFilter($scope.allFollows, { postTitle: $scope.postTitle }).length;
                        angular.forEach($scope.allFollows, function(v) {
                            if (v.postTitle == postType) {
                                count++;
                            }
                        })
                        $scope.totalItems = count;
                    }
                }

                $scope.filterPosttitle = function(item) {
                    if ($scope.postTitle == "") {
                        return item;
                    } else if (item.postTitle == $scope.postTitle) {
                        return item
                    }
                }

                $scope.getCount = function() {
                    if ($scope.postTitle != "") {
                        return filterFilter($scope.allFollows, { postTitle: $scope.postTitle }).length;
                    }

                }

                $scope.emptyOrNull = function(item) {

                    if ($scope.type == "true") {

                        return (item.lecturers === null)
                    } else {
                        return !(item.lecturers === null)
                    }
                }

                $scope.getCountStudentNoFollow = function() {
                    studentService.getCountStudentNoFollow()
                        .then(function(response) {
                            console.log(response.data);
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getStudentNoInternshipTerm = function() {
                    studentService.getStudentNoInternshipTerm()
                        .then(function(response) {
                            console.log(response);
                            $scope.noFollows = response.data;
                            $scope.totalItemsnoFollows = response.data.length;
                            $scope.currentPagenoFollows = 1;
                            $scope.entryLimitnoFollows = 25;
                            if ($scope.entryLimitnoFollows > $scope.totalItemsnoFollows) {
                                $scope.entryLimitnoFollows = $scope.totalItemsnoFollows;
                            }
                            $scope.noOfPagesnoFollows = Math.ceil($scope.totalItemsnoFollows / $scope.entryLimitnoFollows);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filterednoFollows = filterFilter($scope.noFollows, newVal);
                                $scope.totalItemsnoFollows = $scope.filterednoFollows.length;
                                $scope.noOfPagesnoFollows = Math.ceil($scope.totalItemsnoFollows / $scope.entryLimitnoFollows);
                                $scope.currentPagenoFollows = 1;
                            }, true);
                        })
                }



                $scope.removeLecturers = function(studentId) {
                    studentService.removeLecturers(studentId)
                        .then(function() {
                            $('#delete_student').trigger('click');
                            $scope.alertSuccess("Xóa giảng viên cho sinh viên thành công!", "");
                            $('#lecturers_' + studentId).text("");
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "danger_edit");
                        })
                }

                $scope.deleteIntern = function(internId, studentId) {
                    internService.deleteIntern(internId)
                        .then(function(response) {
                            $('#delete_student').trigger('click');
                            $('#close_modal_delete_intern').trigger('click');
                            $scope.alertSuccess("Xóa internship thành công!", "");
                            // $scope.getAllStudentByInternshipTerm();
                            $('.internship_' + studentId).text("");
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "danger_edit");
                        })
                }

                $scope.createInternship = function() {
                    if ($scope.intern.partnerId == 'other' || $scope.intern.partnerNotFitId == 'other') {
                        $scope.intern.partnerId = 0;
                    }
                    if ($scope.intern.partnerNotFitId != 'other') {
                        $scope.intern.partnerId = $scope.intern.partnerNotFitId;
                    }
                    console.log($scope.intern);
                    internService.createIntern($scope.intern)
                        .then(function(response) {
                            $scope.alertSuccess("Tạo internship thành công!", "");
                            $scope.intern = {};
                            $scope.getAllStudentByInternshipTerm();
                            if ($scope.intern.partnerNotFitId == 'other') {
                                $scope.getNameAndIdOfPartners;
                            }
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
                $scope.entrynoFollows = '';
                $scope.paginatenoFollows = function() {
                    // console.log($scope.entry);
                    if ($scope.entrynoFollows != '') {
                        if ($scope.entrynoFollows > $scope.totalItemsnoFollows) {
                            $scope.entryLimitnoFollows = $scope.totalItemsnoFollows;
                        } else {
                            $scope.entryLimitnoFollows = $scope.entrynoFollows;
                        }
                        $scope.noOfPagesnoFollows = Math.ceil($scope.totalItemsnoFollows / $scope.entryLimitnoFollows);
                    } else {
                        $scope.entryLimitnoFollows = 25;
                        if ($scope.entryLimitnoFollows > $scope.totalItemsnoFollows) {
                            $scope.entryLimitnoFollows = $scope.totalItemsnoFollows;
                        }
                        $scope.noOfPagesnoFollows = Math.ceil($scope.totalItemsnoFollows / $scope.entryLimitnoFollows);
                    }
                }

                $scope.getAllStudentNoLecturers = function() {
                    internService.getAllStudentNoLecturers()
                        .then(function(response) {
                            console.log(response.data);
                            $scope.propertyName = '-infoBySchool.studentClass';
                            $scope.reverse = true;
                            $scope.allStudentNoLecturers = response.data;
                            $scope.allStudentNoLecturers = orderBy($scope.allStudentNoLecturers, $scope.propertyName, $scope.reverse);
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

                $scope.getAllStudentNoLecturersLastInternshipTerm = function() {
                    internService.getAllStudentNoLecturersLastInternshipTerm()
                        .then(function(response) {
                            console.log(response.data);
                            $scope.propertyName = '-infoBySchool.studentClass';
                            $scope.reverse = true;
                            $scope.allStudentNoLecturers = response.data;
                            $scope.allStudentNoLecturers = orderBy($scope.allStudentNoLecturers, $scope.propertyName, $scope.reverse);
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

                $scope.saveScore = function(id) {
                    var diem = $('#input_diem_' + id).val();
                    if (!isNaN(diem)) {
                        console.log($('#input_diem_' + id).val());
                        var index = $scope.allStudents.findIndex(x => x.id === id);
                        if (index != -1) {
                            console.log($scope.allStudents[index].internship.id);
                            $scope.allStudents[index].loading = true;
                            studentService.addScore($scope.allStudents[index].internship.id, diem)
                                .then(function(response) {
                                    console.log(response)
                                    $('#diem_thuc_tap_' + id).text(' ' + diem);
                                    $scope.allStudents[index].loading = false;
                                    $scope.allStudents[index].internship.scope = diem;
                                }, function(error) {
                                    console.log(error)
                                    $scope.allStudents[index].loading = false;
                                    $scope.alertDanger('Thao tác không thành công!', '');
                                })
                        }
                    } else {
                        $scope.alertWarning('Điểm phải là số!', 5000);
                    }

                }

                $scope.cancel = function(id) {
                    var index = $scope.allStudents.findIndex(x => x.id === id);
                    if (index != -1) {
                        if ($scope.allStudents[index].internship.score == null) {
                            // $('#diem_thuc_tap_' + id).html('<td class=" " id="diem_thuc_tap_' + id + '">Chưa có</td>');
                            $('#diem_thuc_tap_' + id).text('Chưa có');
                        } else {
                            // $('#diem_thuc_tap_' + id).html('<td class=" " id="diem_thuc_tap_' + id + '">' + $scope.allStudents[index].internship.score + '</td>');
                            $('#diem_thuc_tap_' + id).text($scope.allStudents[index].internship.score);
                        }
                    }
                }

                $scope.editScore = function() {
                    angular.forEach($scope.allStudents, function(intern) {
                        if (intern.internship == null) {
                            intern.internship = {};
                        }

                        htmlVar = '<input type="text" style="width: 40px; padding-right: 7px;" id="input_diem_' + intern.id + '" value="' + intern.internship.score + '">    ' +
                            '<button ng-click="saveScore(' + intern.id + ')" class="btn btn-success btn-xs" style="padding-left: 10px;">Lưu</button>' +
                            '<button class="btn btn-danger btn-xs" ng-click="cancel(' + intern.id + ')">Hủy</button>' +
                            '<img src="https://kenhmp3.com/img/loading.gif" ng-if="intern.loading">';

                        if ($('#diem_thuc_tap_' + intern.id).text().indexOf('Chưa có') == -1 && $('#bao_cao_' + intern.id).text().indexOf('View') != -1) {
                            $('#diem_thuc_tap_' + intern.id).html($compile(htmlVar)($scope));
                        }
                    })
                }

                $scope.addScore = function() {
                    angular.forEach($scope.allStudents, function(intern) {
                        console.log(intern)
                        if (intern.internship == null) {
                            intern.internship = {};
                        }

                        htmlVar = '<input type="text" style="width: 40px; padding-right: 7px;" id="input_diem_' + intern.id + '">    ' +
                            '<button ng-click="saveScore(' + intern.id + ')" class="btn btn-success btn-xs" style="padding-left: 10px;">Lưu</button>' +
                            '<button class="btn btn-danger btn-xs" ng-click="cancel(' + intern.id + ')">Hủy</button>';

                        if ($('#diem_thuc_tap_' + intern.id).text().indexOf('Chưa có') != -1 && $('#bao_cao_' + intern.id).text().indexOf('View') != -1) {
                            $('#diem_thuc_tap_' + intern.id).html($compile(htmlVar)($scope));
                        }
                    })
                }

                $scope.getInternOfLecturers = function() {
                    internService.getInternOfLecturers($rootScope.lecturersId)
                        .then(function(response) {
                            console.log(response.data)
                            $scope.allStudents = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.editLecturersStudent = function(student) {
                    if (student.id != undefined && student.selectedLecturers != undefined) {
                        // console.log(student.selectedLecturers.originalObject);
                        $scope.request = {
                            id: student.id,
                            lecturersId: student.selectedLecturers.originalObject.lecturersId,
                            internId: student.id,
                        }
                        // console.log($scope.request);
                        studentService.editLecturersStudent($scope.request)
                            .then(function() {
                                $scope.alertSuccess("Chỉnh sửa giảng viên thành công!", "");
                                $scope.clearAngucompleteAltInput('findLecturers_' + $scope.request.id);
                                $scope.getAllStudentByInternshipTerm();
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }

                $scope.clearAngucompleteAltInput = function(id) {
                    $scope.$broadcast('angucomplete-alt:clearInput', id);
                }

                $scope.addLecturersStudent = function() {
                    console.log($scope.selectedLecturers);
                    if ($scope.selectedLecturers != undefined) {
                        console.log($scope.listStudent);
                        internService.addLecturersStudent($scope.listStudent, $scope.selectedLecturers.originalObject.lecturersId)
                            .then(function() {
                                $scope.alertSuccess("Thêm giảng viên thành công!", "");
                                // $scope.getAllStudentNoLecturers();
                                $scope.getAllStudentByInternshipTerm();
                                $scope.clearAngucompleteAltInput('findLecturers');
                                $scope.listStudent = [];
                            }, function(error) {
                                console.log(error);
                                $scope.alertDanger(error.data.message, "");
                            })
                    } else if ($scope.selectedLec != undefined) {
                        internService.addLecturersStudent($scope.listStudent, $scope.selectedLec.id)
                            .then(function() {
                                $scope.alertSuccess("Thêm giảng viên thành công!", "");
                                // $scope.getAllStudentNoLecturers();
                                $scope.getAllStudentByInternshipTerm();
                                $scope.selectedLec = undefined;
                                $scope.clearAngucompleteAltInput('findLecturers');
                                $scope.listStudent = [];
                            }, function(error) {
                                console.log(error);
                                $scope.alertDanger(error.data.message, "");
                            })
                    }
                }

                $scope.selectedLecturersModal = function(lecturers) {
                    $scope.selectedLecturers = undefined;
                    $scope.selectedLec = lecturers;
                    // $scope.test = lecturers.fullName;
                }

                $scope.removeLecturersFind = function() {
                    $scope.selectedLec = undefined;
                }

                $scope.getAllLecturers = function() {
                    lecturersService.getAllLecturers()
                        .then(function(response) {
                            $scope.allLecturers = response.data;
                            $scope.totalItemslecturers = response.data.length;
                            $scope.currentPagelecturers = 1;
                            $scope.entryLimitlecturers = 10;
                            $scope.noOfPageslecturers = Math.ceil($scope.totalItemslecturers / $scope.entryLimitlecturers);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filteredlecturers = filterFilter($scope.allLecturers, newVal);
                                $scope.totalItemslecturers = $scope.filteredlecturers.length;
                                $scope.noOfPageslecturers = Math.ceil($scope.totalItemslecturers / $scope.entryLimitlecturers);
                                $scope.currentPagelecturers = 1;
                            }, true);
                        }, function(error) {
                            console.log(error);
                        })
                }
                $scope.listStudent = [];

                $scope.addStudent = function(student) {
                    if (student.checked == true) {
                        $scope.listStudent.push({
                            id: student.student.id,
                            studentName: student.student.fullName,
                            emailVNU: student.student.infoBySchool.emailvnu,
                            internId: student.id,
                        })
                    } else {
                        var index = $scope.listStudent.findIndex(x => x.id === student.id)
                        $scope.listStudent.splice(index, 1);
                        // for (i = 0; i <= $scope.listStudent.length; i++) {
                        //     if (student.id == $scope.listStudent[i].id) {
                        //         $scope.listStudent.splice(i, 1);
                        //         break;
                        //     }
                        // }

                    }
                }

                $scope.removeStudent = function(index, studentId) {
                    $scope.listStudent.splice(index, 1);
                    var index = $scope.allStudents.findIndex(x => x.id === studentId)
                    $scope.allStudents[index].checked = false;
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

                $scope.getAllInternshipTerm = function() {
                    internService.getAllInternshipTerm()
                        .then(function(response) {
                            console.log(response.data);
                            $scope.allInternshipTerm = response.data;
                            $rootScope.lastInternshipTermId = $scope.allInternshipTerm[$scope.allInternshipTerm.length - 1].id;
                            angular.forEach($scope.allInternshipTerm, function(internshipTerm) {
                                if (internshipTerm.startDate != null) {
                                    internshipTerm.startDate = Date.parse(internshipTerm.startDate);
                                    internshipTerm.startDate = new Date(internshipTerm.startDate)
                                    var curr_date = internshipTerm.startDate.getDate();
                                    var curr_month = internshipTerm.startDate.getMonth() + 1; //Months are zero based
                                    var curr_year = internshipTerm.startDate.getFullYear();
                                    if (parseInt(curr_month) < 10) {
                                        curr_month = "0" + curr_month;
                                    }
                                    if (parseInt(curr_date) < 10) {
                                        curr_date = "0" + curr_date;
                                    }
                                    internshipTerm.startDate = curr_year + "-" + curr_month + "-" + curr_date;
                                }
                                if (internshipTerm.endDate != null) {
                                    internshipTerm.endDate = Date.parse(internshipTerm.endDate);
                                    internshipTerm.endDate = new Date(internshipTerm.endDate)
                                    var curr_date = internshipTerm.endDate.getDate();
                                    var curr_month = internshipTerm.endDate.getMonth() + 1; //Months are zero based
                                    var curr_year = internshipTerm.endDate.getFullYear();
                                    if (parseInt(curr_month) < 10) {
                                        curr_month = "0" + curr_month;
                                    }
                                    if (parseInt(curr_date) < 10) {
                                        curr_date = "0" + curr_date;
                                    }
                                    internshipTerm.endDate = curr_year + "-" + curr_month + "-" + curr_date;
                                }
                                if (internshipTerm.expiredDate != null) {
                                    internshipTerm.expiredDate = Date.parse(internshipTerm.expiredDate);
                                    internshipTerm.expiredDate = new Date(internshipTerm.expiredDate)
                                    var curr_date = internshipTerm.expiredDate.getDate();
                                    var curr_month = internshipTerm.expiredDate.getMonth() + 1; //Months are zero based
                                    var curr_year = internshipTerm.expiredDate.getFullYear();
                                    if (parseInt(curr_month) < 10) {
                                        curr_month = "0" + curr_month;
                                    }
                                    if (parseInt(curr_date) < 10) {
                                        curr_date = "0" + curr_date;
                                    }
                                    internshipTerm.expiredDate = curr_year + "-" + curr_month + "-" + curr_date;
                                }
                            })
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getAllPost = function() {
                    partnerService.loadAllPostByInternshipTerm(1)
                        .then(function(response) {
                            console.log(response);
                            $scope.allposts = response.data;
                        })
                }

                $scope.selectPost = function(postId) {
                    $scope.postId = postId;
                }

                $scope.asd = function() {
                    console.log($scope.listStudent);
                    console.log($scope.postId);
                    angular.forEach($scope.listStudent, function(student) {
                        studentService.addFollow(student.emailVNU, $scope.postId)
                            .then(function() {
                                alert("Thêm thông tin thành công");
                            }, function(errors) {
                                console.log(student);
                                alert("Thêm thông tin không thành công");
                            })
                    })
                }

                $scope.getAllStudentByInternshipTerm = function(lastInternshipTerm) {
                    if ($stateParams.internshipTermId == undefined && lastInternshipTerm == undefined) {
                        internService.getAllInternshipTerm()
                            .then(function(response) {
                                console.log(response.data);
                                $scope.allInternshipTerm = response.data;
                                length = $scope.allInternshipTerm.length - 1;
                                $scope.lastInternTermId = $scope.allInternshipTerm[length].id;
                                // $scope.allInternshipTerm[length].checked = true;
                                // $scope.lastInternTermId = 1;
                                console.log($scope.lastInternTermId);
                                $scope.showNotiLecturers = !$scope.allInternshipTerm[length].notiLecturers;
                                $scope.showNotiScore = !$scope.allInternshipTerm[length].notiScore;
                                internService.getAllStudentByInternshipTerm($scope.lastInternTermId)
                                    .then(function(response) {
                                        console.log(response.data);
                                        $scope.allStudents = response.data;
                                        $scope.propertyName = '-infoBySchool.studentClass';
                                        $scope.reverse = true;
                                        $scope.showButtonNotiLecturers = true;
                                        $scope.showButtonNotiScore = true;
                                        $scope.allStudents = orderBy($scope.allStudents, $scope.propertyName, $scope.reverse);
                                        angular.forEach($scope.allStudents, function(student) {
                                            student.show = true;
                                            student.checked = false;
                                            if (student.lecturers == null) {
                                                // console.log(student);
                                                $scope.showButtonNotiLecturers = false;
                                            }
                                            if (student.score == null) {
                                                $scope.showButtonNotiScore = false;
                                            }
                                        });
                                        $scope.internshipName = " Đợt " + $scope.allInternshipTerm[length].term + " năm " + $scope.allInternshipTerm[length].year;
                                        $scope.totalItems = response.data.length;
                                        $scope.currentPage = 1;
                                        $scope.entryLimit = 10;
                                        if ($scope.entryLimit > $scope.totalItems) {
                                            $scope.entryLimit = $scope.totalItems;
                                        }
                                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                                        $scope.$watch('search', function(newVal, oldVal) {
                                            $scope.filtered = filterFilter($scope.allStudents, newVal);
                                            $scope.totalItems = $scope.filtered.length;
                                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                            $scope.currentPage = 1;
                                        }, true);
                                    }, function(error) {
                                        console.log(error);
                                    })
                            }, function(error) {
                                console.log(error);
                            });
                    } else if (lastInternshipTerm != undefined && lastInternshipTerm != "") {
                        if (lastInternshipTerm == 'all') {

                        } else {
                            $scope.lastInternshipTerm = JSON.parse(lastInternshipTerm);
                            internService.getAllStudentByInternshipTerm($scope.lastInternshipTerm.id)
                                .then(function(response) {
                                    $scope.allStudents = response.data;
                                    $scope.internshipName = " Đợt " + $scope.lastInternshipTerm.term + " năm " + $scope.lastInternshipTerm.year;
                                    $scope.totalItems = response.data.length;
                                    $scope.currentPage = 1;
                                    $scope.entryLimit = 25;
                                    if ($scope.entryLimit > $scope.totalItems) {
                                        $scope.entryLimit = $scope.totalItems;
                                    }
                                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                                    $scope.$watch('search', function(newVal, oldVal) {
                                        $scope.filtered = filterFilter($scope.allStudents, newVal);
                                        $scope.totalItems = $scope.filtered.length;
                                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                        $scope.currentPage = 1;
                                    }, true);
                                    console.log(response);
                                }, function(error) {
                                    console.log(error);
                                })
                        }

                    } else if ($stateParams.internshipTermId != undefined) {
                        internService.getAllStudentByInternshipTerm($stateParams.internshipTermId)
                            .then(function(response) {
                                $scope.allStudents = response.data;
                                console.log(response);
                            }, function(error) {
                                console.log(error);
                            })
                    }

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
                    if ($scope.input.year != "" && $scope.input.startDate != "" && $scope.input.endDate != "" &&
                        $scope.input.expiredDate != "") {
                        if ($scope.input.startDate != null) {
                            // $scope.input.startDate = Date.parse($scope.input.startDate);
                            $scope.input.startDate = new Date($scope.input.startDate)
                            var curr_date = $scope.input.startDate.getDate();
                            var curr_month = $scope.input.startDate.getMonth() + 1; //Months are zero based
                            var curr_year = $scope.input.startDate.getFullYear();
                            if (parseInt(curr_month) < 10) {
                                curr_month = "0" + curr_month;
                            }
                            if (parseInt(curr_date) < 10) {
                                curr_date = "0" + curr_date;
                            }
                            $scope.input.startDate = curr_year + "-" + curr_month + "-" + curr_date;
                        }
                        if ($scope.input.endDate != null) {
                            // $scope.input.endDate = Date.parse($scope.input.endDate);
                            $scope.input.endDate = new Date($scope.input.endDate)
                            var curr_date = $scope.input.endDate.getDate();
                            var curr_month = $scope.input.endDate.getMonth() + 1; //Months are zero based
                            var curr_year = $scope.input.endDate.getFullYear();
                            if (parseInt(curr_month) < 10) {
                                curr_month = "0" + curr_month;
                            }
                            if (parseInt(curr_date) < 10) {
                                curr_date = "0" + curr_date;
                            }
                            $scope.input.endDate = curr_year + "-" + curr_month + "-" + curr_date;
                        }
                        if ($scope.input.expiredDate != null) {
                            // $scope.input.expiredDate = Date.parse($scope.input.expiredDate);
                            $scope.input.expiredDate = new Date($scope.input.expiredDate)
                            var curr_date = $scope.input.expiredDate.getDate();
                            var curr_month = $scope.input.expiredDate.getMonth() + 1; //Months are zero based
                            var curr_year = $scope.input.expiredDate.getFullYear();
                            if (parseInt(curr_month) < 10) {
                                curr_month = "0" + curr_month;
                            }
                            if (parseInt(curr_date) < 10) {
                                curr_date = "0" + curr_date;
                            }
                            $scope.input.expiredDate = curr_year + "-" + curr_month + "-" + curr_date;
                        }
                        console.log($scope.input)
                        internService.createInternshipTerm($scope.input)
                            .then(function(response) {
                                $scope.alertSuccess("Tạo kì thực tập thành công!", "")
                                $scope.input.year = "";
                                $scope.input.endDate = "";
                                $scope.input.startDate = "";
                                $scope.input.expiredDate = "";
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

                $scope.editInternshipTerm = function(startDate, endDate, expiredDate, internshipTermId) {
                    // $('#nation_' + nationId).html('<div class="col-md-4 col-sm-4 col-xs-6">' + 
                    //     '<input type="text" name="country" class="form-control col-md-6" ng-model="' + nationName + '" required /></div>');
                    // var internshipTermName = $('#internshipTerm_' + internshipTermId).text();
                    // console.log(startDate);
                    // $('#internshipTerm_' + internshipTermId).val(startDate);
                    // startDate = new Date();
                    // $('#internshipTerm_' + internshipTermId).val(startDate);
                    // var curr_date = startDate.getDate();
                    // var curr_month = startDate.getMonth() + 1; //Months are zero based
                    // var curr_year = startDate.getFullYear();
                    // startDate = curr_year + "-" + curr_month + "-" + curr_date;
                }

                $scope.saveEditinternshipTerm = function(internshipTerm) {
                    // console.log(nationId);
                    console.log(internshipTerm);
                    if (internshipTerm.startDate != null) {
                        // internshipTerm.startDate = Date.parse(internshipTerm.startDate);
                        internshipTerm.startDate = new Date(internshipTerm.startDate)
                        var curr_date = internshipTerm.startDate.getDate();
                        var curr_month = internshipTerm.startDate.getMonth() + 1; //Months are zero based
                        var curr_year = internshipTerm.startDate.getFullYear();
                        if (parseInt(curr_month) < 10) {
                            curr_month = "0" + curr_month;
                        }
                        if (parseInt(curr_date) < 10) {
                            curr_date = "0" + curr_date;
                        }
                        internshipTerm.startDate = curr_year + "-" + curr_month + "-" + curr_date;
                    }
                    if (internshipTerm.endDate != null) {
                        // internshipTerm.endDate = Date.parse(internshipTerm.endDate);
                        internshipTerm.endDate = new Date(internshipTerm.endDate)
                        var curr_date = internshipTerm.endDate.getDate();
                        var curr_month = internshipTerm.endDate.getMonth() + 1; //Months are zero based
                        var curr_year = internshipTerm.endDate.getFullYear();
                        if (parseInt(curr_month) < 10) {
                            curr_month = "0" + curr_month;
                        }
                        if (parseInt(curr_date) < 10) {
                            curr_date = "0" + curr_date;
                        }
                        internshipTerm.endDate = curr_year + "-" + curr_month + "-" + curr_date;
                    }
                    if (internshipTerm.expiredDate != null) {
                        // internshipTerm.expiredDate = Date.parse(internshipTerm.expiredDate);
                        internshipTerm.expiredDate = new Date(internshipTerm.expiredDate)
                        var curr_date = internshipTerm.expiredDate.getDate();
                        var curr_month = internshipTerm.expiredDate.getMonth() + 1; //Months are zero based
                        var curr_year = internshipTerm.expiredDate.getFullYear();
                        if (parseInt(curr_month) < 10) {
                            curr_month = "0" + curr_month;
                        }
                        if (parseInt(curr_date) < 10) {
                            curr_date = "0" + curr_date;
                        }
                        internshipTerm.expiredDate = curr_year + "-" + curr_month + "-" + curr_date;
                    }
                    internService.editInternshipTerm(internshipTerm)
                        .then(function() {
                            $scope.alertSuccess("Sửa kì thực tập thành công!", "");
                            // $scope.load
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
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

                $scope.convertStudent1 = function() {
                    var xlf = document.getElementById('xlf1');

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
                                worksheet['A1'].w = "fullName";
                                $rootScope.excelStudent1 = XLSX.utils.sheet_to_json(worksheet);
                            };
                            reader.readAsBinaryString(f);
                        }
                    }
                    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

                    // input_dom_element.addEventListener('change', handleFile, false);
                }

                $scope.convertStudent2 = function() {
                    var xlf = document.getElementById('xlf2');

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
                                worksheet['A1'].w = "fullName";
                                $rootScope.excelStudent2 = XLSX.utils.sheet_to_json(worksheet);
                            };
                            reader.readAsBinaryString(f);
                        }
                    }
                    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

                    // input_dom_element.addEventListener('change', handleFile, false);
                }

                $scope.checkStudent = function() {
                    console.log(635);
                    // console.log($rootScope.excelStudent1);
                    $scope.student1 = $rootScope.excelStudent1;
                    $scope.student2 = $rootScope.excelStudent2;
                    var stt = 1;
                    angular.forEach($scope.student1, function(v) {
                        if (v.fullName != undefined) {
                            v.fullName = v.fullName.trim().toLowerCase();
                        } else {
                            console.log(v);
                        }

                    })
                    angular.forEach($scope.student2, function(v) {
                        if (v.fullName != undefined) {
                            v.fullName = v.fullName.trim().toLowerCase();
                        } else {
                            console.log(v);
                        }
                    })
                    angular.forEach($scope.student2, function(student2) {
                        // angular.forEach($rootScope.excelStudent1, function(student1){
                        // console.log(student2);
                        student2.stt = stt;
                        var index = $scope.student1.findIndex(x => x.fullName === student2.fullName)
                        if (index != -1) {
                            student2.checked = true;
                            $scope.student1[index].checked = true;
                        }
                        // for (i = 0; i <= $scope.student1.length; i++) {
                        //     if ($scope.student1[i] != undefined && student2 != undefined) {
                        //         if ($scope.student1[i].fullName.toLowerCase().indexOf(student2.fullName.toLowerCase()) != -1) {
                        //             student2.checked = true;
                        //             break;
                        //         }
                        //     } else if($scope.student1[i] == undefined){
                        //         console.log(i);
                        //     }
                        // }
                        stt++;
                    });

                    angular.forEach($scope.student2, function(student) {
                        if (student.checked != true) {
                            console.log(student.stt + "-" + student.fullName);
                            $('#student_2_' + student.stt).css('background-color', '#f0ad4e');
                        }
                    });
                    angular.forEach($scope.student1, function(student) {
                        if (student.checked != true) {
                            // console.log(student.stt + "-" + student.fullName);
                            $('#student_1_' + student.stt).css('background-color', '#f0ad4e');
                        }
                    });
                }

                $scope.excelAddScore = function() {
                    var xlf = document.getElementById('excel-add-score');

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
                                // STT}}</td>
                                // class}}</td>
                                // studentCode}}</
                                // emailvnu}}</td>
                                // lecturers}}</td
                                // lecturersEmail}
                                worksheet['A1'].w = "stt";
                                worksheet['B1'].w = "studentCode";
                                worksheet['C1'].w = "fullName";
                                worksheet['D1'].w = "birthday";
                                worksheet['E1'].w = "courseClass";
                                worksheet['F1'].w = "lecturersName";
                                worksheet['G1'].w = "score";
                                // worksheet['D1'].w = "email";
                                // worksheet['E1'].w = "lecturers";
                                // worksheet['F1'].w = "lecturersEmail";
                                $rootScope.excelScore = XLSX.utils.sheet_to_json(worksheet);
                                $timeout(function() {
                                    $scope.$apply();
                                });
                                // $scope.checkExcelAddScore($rootScope.excelScore);
                            };
                            reader.readAsBinaryString(f);
                        }
                    }
                    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

                    // input_dom_element.addEventListener('change', handleFile, false);
                }

                $scope.clearInputFileExcel = function() {
                    $('#excel-add-score').val(null);
                    $scope.dataExcelScore = null;
                    $rootScope.excelScore = null;
                    $scope.errors = [1];
                }

                $scope.errors = [1];
                $scope.editStudentCode = function($event, data) {
                    if ($event.keyCode == 13) {
                        data.editStudentCode = data.stt;
                        // console.log($scope.dataExcelScore);
                    }
                }

                $scope.editScore = function($event, data) {
                    if ($event.keyCode == 13) {
                        data.editScore = data.stt;
                        // console.log($scope.dataExcelScore);
                    }
                }

                $scope.checkExcelAddScore = function() {
                    // console.log($rootScope.excelScore);
                    $scope.excelScoreCheck = true;
                    $scope.errors = [];
                    studentService.checkExcelAddScore($rootScope.excelScore)
                        .then(function(response) {
                            console.log(response.data);
                            // $rootScope.excelScore = response.data;
                            $rootScope.excelScore = response.data;
                            var array = [];
                            $timeout(function() {
                                angular.forEach($rootScope.excelScore, function(value, key) {
                                    if (array[value.studentCode] == undefined) {
                                        array[value.studentCode] = {};
                                        array[value.studentCode].count = 1;
                                        array[value.studentCode].array = [];
                                    } else {
                                        array[value.studentCode].count++;
                                    }
                                    array[value.studentCode].array.push(value);
                                    // array[d.studentCode].studentCode = d.studentCode;
                                    if (value.message != null) {
                                        $scope.errors.push(value);
                                        // $('#message_' + d.stt).css('background-color', '#f0ad4e');
                                    }
                                });
                                angular.forEach(array, function(k) {
                                    if (k.count > 1) {
                                        angular.forEach(k.array, function(a) {
                                            var index = $rootScope.excelScore.findIndex(x => x.stt === a.stt);
                                            if (index != -1) {
                                                $rootScope.excelScore[index].message = "Mã SV trùng";
                                                $rootScope.excelScore[index].check = false;
                                            }
                                        });

                                    }
                                });
                                $timeout(function() {
                                    $scope.$apply();
                                    console.log($rootScope.excelScore)
                                }, 500);
                            });
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger('Có lỗi xảy ra, không thể kiểm tra file!', '');
                        })
                }

                $scope.submitScore = function() {
                    $('#close_modal_confirmNotiScore').trigger('click');
                    studentService.submitScore()
                        .then(function() {
                            $scope.showNotiScore = false;
                            $scope.showButtonNotiScore = false;
                            $scope.alertSuccess('Gửi thông báo thành công', '');
                        }, function(error) {
                            console.log(error);
                        });
                }

                $scope.submitLecturers = function() {
                    $('#close_modal_confirmNotiLecturers').trigger('click');
                    studentService.submitLecturers()
                        .then(function() {
                            $scope.showNotiLecturers = false;
                            $scope.showButtonNotiLecturers = false;
                            $scope.alertSuccess('Gửi thông tin thành công', '');
                        }, function(error) {
                            console.log(error);
                        });
                }

                $scope.uploadDataExcelScore = function() {
                    if ($rootScope.excelScore != null && $scope.errors.length == 0) {
                        // console.log($scope.dataExcelScore);
                        studentService.addExcelAddScore($rootScope.excelScore)
                            .then(function(response) {
                                // console.log(response.data);
                                $scope.clearInputFileExcel();
                                $scope.getAllStudentByInternshipTerm();
                                $scope.alertSuccess('Nhập điểm thành công!', '');
                                // $scope
                            })
                    }
                }

                $scope.convertNolecturers = function() {
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
                                // STT}}</td>
                                // class}}</td>
                                // studentCode}}</
                                // emailvnu}}</td>
                                // lecturers}}</td
                                // lecturersEmail}
                                worksheet['A1'].w = "stt";
                                worksheet['B1'].w = "fullName";
                                worksheet['C1'].w = "class";
                                worksheet['D1'].w = "email";
                                worksheet['E1'].w = "lecturers";
                                worksheet['F1'].w = "lecturersEmail";
                                $rootScope.excel = XLSX.utils.sheet_to_json(worksheet);
                            };
                            reader.readAsBinaryString(f);
                        }
                    }
                    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

                    // input_dom_element.addEventListener('change', handleFile, false);
                }

                // $scope.editLecturerOfStudent = function(student) {
                //     // console.log(student)
                //     $timeout(function(s = student) {
                //         $scope.$broadcast('angucomplete-alt:changeInput', 'findLecturers_' + s.id, s.lecturers.lecturersName);
                //     });

                //     // $('#findLecturers_' + student.id).triggerHandler("click");
                // }



                $scope.editEmail = function($event, data) {
                    if ($event.keyCode == 13) {
                        data.editEmail = data.stt;
                    }
                }

                $scope.editLecturers = function($event, data) {
                    if ($event.keyCode == 13) {
                        data.editLecturers = data.stt;
                    }
                }

                $scope.checkData = function() {
                    // alert(1);
                    console.log($rootScope.excel);
                    if ($scope.noLecturers == undefined) {
                        $scope.noLecturers = $rootScope.excel;
                    }
                    if ($scope.error != undefined) {
                        if ($scope.errors.length != 0) {
                            console.log($scope.errors);
                            angular.forEach($scope.errors, function(v) {
                                $('#email_' + v.stt).css('background-color', '');
                                $('#lecturers_email_' + v.stt).css('background-color', '');
                            });
                        }
                    }
                    $scope.errors = [];
                    studentService.checkExcelLecturersAssignment($scope.noLecturers)
                        .then(function(response) {
                            angular.forEach(response.data, function(v) {
                                var count = 0;
                                if (v.email == 'nf') {
                                    $('#email_' + v.stt).css('background-color', '#f0ad4e');
                                    count++;
                                }
                                if (v.lecturersEmail == 'nf') {
                                    $('#lecturers_email_' + v.stt).css('background-color', '#f0ad4e');
                                    count++;
                                }
                                if (count != 0) {
                                    $scope.error = {
                                        error: "Dữ liệu ở dòng " + v.stt + " chưa chính xác",
                                        stt: v.stt
                                    };
                                    $scope.errors.push($scope.error);
                                }
                            })
                            console.log($scope.errors);
                            if ($scope.errors.length == 0) {
                                $scope.checkExcel = true;
                            } else {
                                $scope.checkExcel = false;
                            }
                        }, function(error) {
                            console.log(error);
                        })
                }


                $scope.upload = function() {
                    studentService.LecturersAssignmentExcel($scope.noLecturers)
                        .then(function() {
                            $scope.alertSuccess("Thêm giảng viên thành công!", "");
                            $scope.noLecturers = undefined;
                            $rootScope.excel = undefined;
                            $scope.getAllStudentNoLecturersLastInternshipTerm();
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger("Có lỗi xảy ra, hãy thử kiểm tra lại danh sách!", "");
                        })
                }

                $scope.getAllStudentClass = function() {
                    studentService.getAllStudentClass()
                        .then(function(response) {
                            console.log(response);
                            $scope.allStudentClass = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.changedownloadType = function(downloadTypeLecturers, downloadType) {
                    if (downloadType == "") {
                        $scope.st.infoBySchool.studentClass = "";
                    }
                    // if (downloadTypeLecturers == "") {
                    //     $scope.downloadTypeLecturers = "";
                    // }
                }

                $scope.changedownload = function(downloadType) {
                    if (downloadType == "") {
                        $scope.st.infoBySchool.studentClass = "";
                    }
                }

                $scope.exportDataNoLecturers = function() {
                    // $scope.exportDataExcel = $scope.allContract;
                    var count = 0;
                    console.log($scope.allStudents);
                    // alasql('SELECT * INTO XLSX("xlsx.xlsx",{headers:true}) FROM ?', [$scope.exportDataExcel]);
                    var wb = {};
                    wb.Sheets = {};
                    wb.SheetNames = [];
                    /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
                    var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
                    var wscols = [];
                    wscols[1] = { wpx: 150 };
                    wscols[2] = { wpx: 100 };
                    wscols[3] = { wpx: 200 };
                    wscols[4] = { wpx: 200 };
                    wscols[5] = { wpx: 100 };
                    wscols[6] = { wpx: 200 };
                    wscols[7] = { wpx: 200 };
                    wscols[8] = { wpx: 200 };
                    wscols[9] = { wpx: 200 };
                    wscols[10] = { wpx: 200 };
                    wscols[11] = { wpx: 200 };
                    wscols[12] = { wpx: 200 };
                    wscols[13] = { wpx: 200 };
                    var ws = { '!ref': "A1:J" + ($scope.allStudents.length + 1) };
                    ws['!cols'] = wscols;
                    // ws['A1'] = { h: "test", r: "<t>test</t>", t: "s", v: "test", w: "test" }
                    var i = 2;
                    ws['A1'] = {
                        h: "STT",
                        r: "STT",
                        t: "s",
                        v: "STT",
                        w: "STT"
                    };
                    ws['B1'] = {
                        h: "Họ và tên",
                        r: "Họ và tên",
                        t: "s",
                        v: "Họ và tên",
                        w: "Họ và tên"
                    };
                    ws['C1'] = {
                        h: "Lớp",
                        r: "Lớp",
                        t: "s",
                        v: "Lớp",
                        w: "Lớp"
                    };
                    ws['D1'] = {
                        h: "VNU email",
                        r: "VNU email",
                        t: "s",
                        v: "VNU email",
                        w: "VNU email"
                    };
                    ws['D1'] = {
                        h: "VNU email",
                        r: "VNU email",
                        t: "s",
                        v: "VNU email",
                        w: "VNU email"
                    };
                    ws['D1'] = {
                        h: "VNU email",
                        r: "VNU email",
                        t: "s",
                        v: "VNU email",
                        w: "VNU email"
                    };
                    ws['E1'] = {
                        h: "Email",
                        r: "Email",
                        t: "s",
                        v: "Email",
                        w: "Email"
                    };
                    ws['F1'] = {
                        h: "Phone",
                        r: "Phone",
                        t: "s",
                        v: "Phone",
                        w: "Phone"
                    };
                    ws['G1'] = {
                        h: "Giảng viên",
                        r: "Giảng viên",
                        t: "s",
                        v: "Giảng viên",
                        w: "Giảng viên"
                    };
                    ws['H1'] = {
                        h: "Email vnu của giảng viên",
                        r: "Email vnu của giảng viên",
                        t: "s",
                        v: "Email vnu của giảng viên",
                        w: "Email vnu của giảng viên"
                    };
                    ws['I1'] = {
                        h: "Nơi thực tập",
                        r: "Nơi thực tập",
                        t: "s",
                        v: "Nơi thực tập",
                        w: "Nơi thực tập"
                    };
                    ws['J1'] = {
                        h: "Công ty đã trúng",
                        r: "Công ty đã trúng",
                        t: "s",
                        v: "Công ty đã trúng",
                        w: "Công ty đã trúng"
                    };
                    var stt = 1;
                    angular.forEach($scope.allStudents, function(student) {
                        if (student.student.infoBySchool.studentClass == null) {
                            student.student.infoBySchool.studentClass = "";
                        }
                        if ($scope.downloadTypeLecturers == "") {
                            if (student.student.infoBySchool.studentClass.toLowerCase().indexOf($scope.st.infoBySchool.studentClass.toLowerCase()) != -1 || $scope.st.infoBySchool.studentClass == "") {
                                ws['A' + i] = {
                                    h: stt,
                                    r: stt,
                                    t: "s",
                                    v: stt,
                                    w: stt,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                                ws['B' + i] = {
                                    h: student.student.fullName,
                                    r: student.student.fullName,
                                    t: "s",
                                    v: student.student.fullName,
                                    w: student.student.fullName,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                                if (student.student.infoBySchool.studentClass == null) {
                                    student.student.infoBySchool.studentClass = "";
                                }
                                if (student.student.infoBySchool.grade == null) {
                                    student.student.infoBySchool.grade = "";
                                }
                                ws['C' + i] = {
                                    h: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                    r: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                    t: "s",
                                    v: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                    w: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };

                                ws['D' + i] = {
                                    h: student.student.infoBySchool.emailvnu,
                                    r: student.student.infoBySchool.emailvnu,
                                    t: "s",
                                    v: student.student.infoBySchool.emailvnu,
                                    w: student.student.infoBySchool.emailvnu,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                                if (student.student.email != null) {

                                    ws['E' + i] = {
                                        h: student.student.email,
                                        r: student.student.email,
                                        t: "s",
                                        v: student.student.email,
                                        w: student.student.email,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                }
                                if (student.student.phoneNumber != null) {
                                    ws['F' + i] = {
                                        h: student.student.phoneNumber,
                                        r: student.student.phoneNumber,
                                        t: "s",
                                        v: student.student.phoneNumber,
                                        w: student.student.phoneNumber,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                }
                                if (student.lecturers != null) {
                                    ws['G' + i] = {
                                        h: student.lecturers.fullName,
                                        r: student.lecturers.fullName,
                                        t: "s",
                                        v: student.lecturers.fullName,
                                        w: student.lecturers.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    ws['H' + i] = {
                                        h: student.lecturers.emailVNU,
                                        r: student.lecturers.emailVNU,
                                        t: "s",
                                        v: student.lecturers.emailVNU,
                                        w: student.lecturers.emailVNU,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                }
                                if (student.partnerName != null) {
                                    ws['I' + i] = {
                                        h: student.partnerName,
                                        r: student.partnerName,
                                        t: "s",
                                        v: student.partnerName,
                                        w: student.partnerName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                }
                                if (student.follows != null && student.follows != undefined) {
                                    // student.follows.forEach
                                    var pName = " ";
                                    angular.forEach(student.follows, function(follow) {
                                        if (follow.status == "PASS") {
                                            pName += follow.partnerName + ", ";
                                        }
                                    });
                                    pName = pName.slice(0, -1);
                                    ws['J' + i] = {
                                        h: pName,
                                        r: pName,
                                        t: "s",
                                        v: pName,
                                        w: pName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                }

                                i++;
                                count++;
                                stt++;
                                // console.log(excel);
                            }
                        } else if ($scope.downloadTypeLecturers == "noLecturers") {
                            if (student.student.infoBySchool.studentClass.toLowerCase().indexOf($scope.st.infoBySchool.studentClass.toLowerCase()) != -1 || $scope.st.infoBySchool.studentClass == "") {
                                if (student.lecturers == null) {
                                    ws['A' + i] = {
                                        h: stt,
                                        r: stt,
                                        t: "s",
                                        v: stt,
                                        w: stt,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    ws['B' + i] = {
                                        h: student.student.fullName,
                                        r: student.student.fullName,
                                        t: "s",
                                        v: student.student.fullName,
                                        w: student.student.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (student.student.infoBySchool.studentClass == null) {
                                        student.student.infoBySchool.studentClass = "";
                                    }
                                    if (student.student.infoBySchool.grade == null) {
                                        student.student.infoBySchool.grade = "";
                                    }
                                    ws['C' + i] = {
                                        h: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                        r: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                        t: "s",
                                        v: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                        w: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };

                                    ws['D' + i] = {
                                        h: student.student.infoBySchool.emailvnu,
                                        r: student.student.infoBySchool.emailvnu,
                                        t: "s",
                                        v: student.student.infoBySchool.emailvnu,
                                        w: student.student.infoBySchool.emailvnu,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (student.email != null) {

                                        ws['E' + i] = {
                                            h: student.student.email,
                                            r: student.student.email,
                                            t: "s",
                                            v: student.student.email,
                                            w: student.student.email,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    if (student.student.phoneNumber != null) {
                                        ws['F' + i] = {
                                            h: student.student.phoneNumber,
                                            r: student.student.phoneNumber,
                                            t: "s",
                                            v: student.student.phoneNumber,
                                            w: student.student.phoneNumber,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    if (student.partnerName != null) {
                                        ws['I' + i] = {
                                            h: student.partnerName,
                                            r: student.partnerName,
                                            t: "s",
                                            v: student.partnerName,
                                            w: student.partnerName,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    if (student.follows != null && student.follows != undefined) {
                                        // student.follows.forEach
                                        var pName = " ";
                                        angular.forEach(student.follows, function(follow) {
                                            if (follow.status == "PASS") {
                                                pName += follow.partnerName + ", ";
                                            }
                                        });
                                        pName = pName.slice(0, -1);
                                        ws['J' + i] = {
                                            h: pName,
                                            r: pName,
                                            t: "s",
                                            v: pName,
                                            w: pName,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    i++;
                                    count++;
                                    stt++;
                                    // console.log(excel);
                                }
                            }
                        } else if ($scope.downloadTypeLecturers == "lecturers") {
                            if (student.student.infoBySchool.studentClass.toLowerCase().indexOf($scope.st.infoBySchool.studentClass.toLowerCase()) != -1 || $scope.st.infoBySchool.studentClass == "") {
                                if (student.lecturers != null) {
                                    ws['A' + i] = {
                                        h: stt,
                                        r: stt,
                                        t: "s",
                                        v: stt,
                                        w: stt,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    ws['B' + i] = {
                                        h: student.student.fullName,
                                        r: student.student.fullName,
                                        t: "s",
                                        v: student.student.fullName,
                                        w: student.student.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (student.student.infoBySchool.studentClass == null) {
                                        student.student.infoBySchool.studentClass = "";
                                    }
                                    if (student.student.infoBySchool.grade == null) {
                                        student.student.infoBySchool.grade = "";
                                    }
                                    ws['C' + i] = {
                                        h: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                        r: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                        t: "s",
                                        v: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                        w: student.student.infoBySchool.grade + student.student.infoBySchool.studentClass,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };

                                    ws['D' + i] = {
                                        h: student.student.infoBySchool.emailvnu,
                                        r: student.student.infoBySchool.emailvnu,
                                        t: "s",
                                        v: student.student.infoBySchool.emailvnu,
                                        w: student.student.infoBySchool.emailvnu,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };

                                    if (student.student.email != null) {

                                        ws['E' + i] = {
                                            h: student.student.email,
                                            r: student.student.email,
                                            t: "s",
                                            v: student.student.email,
                                            w: student.student.email,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    if (student.student.phoneNumber != null) {
                                        ws['F' + i] = {
                                            h: student.student.phoneNumber,
                                            r: student.student.phoneNumber,
                                            t: "s",
                                            v: student.student.phoneNumber,
                                            w: student.student.phoneNumber,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    ws['G' + i] = {
                                        h: student.student.lecturers.fullName,
                                        r: student.student.lecturers.fullName,
                                        t: "s",
                                        v: student.student.lecturers.fullName,
                                        w: student.student.lecturers.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    ws['H' + i] = {
                                        h: student.student.lecturers.emailVNU,
                                        r: student.student.lecturers.emailVNU,
                                        t: "s",
                                        v: student.student.lecturers.emailVNU,
                                        w: student.student.lecturers.emailVNU,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (student.partnerName != null) {
                                        ws['I' + i] = {
                                            h: student.partnerName,
                                            r: student.partnerName,
                                            t: "s",
                                            v: student.partnerName,
                                            w: student.partnerName,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    if (student.follows != null && student.follows != undefined) {
                                        // student.follows.forEach
                                        var pName = " ";
                                        angular.forEach(student.follows, function(follow) {
                                            if (follow.status == "PASS") {
                                                pName += follow.partnerName + ", ";
                                            }
                                        });
                                        pName = pName.slice(0, -1);
                                        ws['J' + i] = {
                                            h: pName,
                                            r: pName,
                                            t: "s",
                                            v: pName,
                                            w: pName,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }


                                    i++;
                                    count++;
                                    stt++;
                                }
                                // console.log(excel);
                            }
                        }

                    });
                    wb.SheetNames.push('Student List');
                    wb.Sheets['Student List'] = ws;

                    var wbout = XLSX.write(wb, wopts);

                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }
                    if (count == 0) {
                        $scope.alertWarning("Tên lớp không trùng!", 5000);
                    } else {
                        if ($scope.st.infoBySchool.studentClass == "") {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Student List - All.xlsx")
                        } else {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Registration List - " + $scope.st.infoBySchool.studentClass + ".xlsx");
                        }
                        $scope.alertSuccess("Xuất danh sách thành công!", "");
                        $scope.st.infoBySchool.studentClass = "";
                    }
                };

                $scope.exportDataRegistrationResearch = function() {
                    // $scope.exportDataExcel = $scope.allContract;
                    var count = 0;
                    // console.log($scope.exportDataExcel);
                    // alasql('SELECT * INTO XLSX("xlsx.xlsx",{headers:true}) FROM ?', [$scope.exportDataExcel]);
                    var wb = {};
                    wb.Sheets = {};
                    wb.SheetNames = [];
                    /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
                    var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
                    var wscols = [];
                    wscols[0] = { wpx: 200 };
                    wscols[1] = { wpx: 150 };
                    wscols[2] = { wpx: 100 };
                    wscols[3] = { wpx: 200 };
                    wscols[4] = { wpx: 200 };
                    wscols[5] = { wpx: 200 };
                    wscols[6] = { wpx: 150 };
                    var ws = { '!ref': "A1:G" + ($scope.allFollows.length + 1) };
                    ws['!cols'] = wscols;
                    // ws['A1'] = { h: "test", r: "<t>test</t>", t: "s", v: "test", w: "test" }
                    var i = 2;
                    ws['A1'] = {
                        h: "Student Name",
                        r: "Student Name",
                        t: "s",
                        v: "Student Name",
                        w: "Student Name"
                    };
                    ws['B1'] = {
                        h: "Student Code",
                        r: "Student Code",
                        t: "s",
                        v: "Student Code",
                        w: "Student Code"
                    };
                    ws['C1'] = {
                        h: "Class",
                        r: "Class",
                        t: "s",
                        v: "Class",
                        w: "Class"
                    };
                    ws['D1'] = {
                        h: "VNU email",
                        r: "VNU email",
                        t: "s",
                        v: "VNU email",
                        w: "VNU email"
                    };
                    ws['E1'] = {
                        h: "Email",
                        r: "Email",
                        t: "s",
                        v: "Email",
                        w: "Email"
                    };
                    ws['F1'] = {
                        h: "Phone",
                        r: "Phone",
                        t: "s",
                        v: "Phone",
                        w: "Phone"
                    };
                    ws['G1'] = {
                        h: "Lecturers",
                        r: "Lecturers",
                        t: "s",
                        v: "Lecturers",
                        w: "Lecturers"
                    };
                    var name = "";
                    angular.forEach($scope.allFollows, function(follow) {
                        if (follow.postTitle.toLowerCase().indexOf("research") != -1) {
                            name = follow.partnerName;
                            ws['A' + i] = {
                                h: follow.student.fullName,
                                r: follow.student.fullName,
                                t: "s",
                                v: follow.student.fullName,
                                w: follow.student.fullName,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center"
                                    }
                                }
                            };
                            if (follow.student.infoBySchool.studentCode != null) {
                                ws['B' + i] = {
                                    h: follow.student.infoBySchool.studentCode,
                                    r: follow.student.infoBySchool.studentCode,
                                    t: "s",
                                    v: follow.student.infoBySchool.studentCode,
                                    w: follow.student.infoBySchool.studentCode,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }

                            if (follow.student.infoBySchool.grade == null) {
                                follow.student.infoBySchool.grade = " ";
                            }
                            if (follow.student.infoBySchool.studentClass != null) {
                                ws['C' + i] = {
                                    h: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    r: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    t: "s",
                                    v: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    w: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }

                            ws['D' + i] = {
                                h: follow.student.infoBySchool.emailvnu,
                                r: follow.student.infoBySchool.emailvnu,
                                t: "s",
                                v: follow.student.infoBySchool.emailvnu,
                                w: follow.student.infoBySchool.emailvnu,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center"
                                    }
                                }
                            };
                            if (follow.student.email != null) {
                                ws['E' + i] = {
                                    h: follow.student.email,
                                    r: follow.student.email,
                                    t: "s",
                                    v: follow.student.email,
                                    w: follow.student.email,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }
                            if (follow.student.phoneNumber != null) {
                                ws['F' + i] = {
                                    h: follow.student.phoneNumber,
                                    r: follow.student.phoneNumber,
                                    t: "s",
                                    v: follow.student.phoneNumber,
                                    w: follow.student.phoneNumber,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }

                            if (follow.lecturersName != null)
                                ws['G' + i] = {
                                    h: follow.lecturersName,
                                    r: follow.lecturersName,
                                    t: "s",
                                    v: follow.lecturersName,
                                    w: follow.lecturersName,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            i++;
                            count++;
                            // console.log(excel);
                        }

                    });
                    wb.SheetNames.push('Research List');
                    wb.Sheets['Research List'] = ws;

                    var wbout = XLSX.write(wb, wopts);

                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }
                    if (count == 0) {
                        $scope.alertWarning("Tên cty chưa chính xác!", 5000);
                    } else {
                        if ($scope.search == "") {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Research List - All.xlsx")
                        } else {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Research List - " + name + ".xlsx");
                        }
                        // $scope.alertSuccess("Xuất danh sách thành công!", "");
                    }
                };

                $scope.exportDataRegistration = function() {
                    console.log($scope.allFollows);
                    // $scope.exportDataExcel = $scope.allContract;
                    var count = 0;
                    // console.log($scope.exportDataExcel);
                    // alasql('SELECT * INTO XLSX("xlsx.xlsx",{headers:true}) FROM ?', [$scope.exportDataExcel]);
                    var wb = {};
                    wb.Sheets = {};
                    wb.SheetNames = [];
                    /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
                    var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
                    var wscols = [];
                    wscols[0] = { wpx: 200 };
                    wscols[1] = { wpx: 150 };
                    wscols[2] = { wpx: 100 };
                    wscols[3] = { wpx: 200 };
                    wscols[4] = { wpx: 200 };
                    wscols[5] = { wpx: 200 };
                    wscols[6] = { wpx: 150 };
                    var ws = { '!ref': "A1:H" + ($scope.allFollows.length + 1) };
                    ws['!cols'] = wscols;
                    // ws['A1'] = { h: "test", r: "<t>test</t>", t: "s", v: "test", w: "test" }
                    var i = 2;
                    ws['A1'] = {
                        h: "Student Name",
                        r: "Student Name",
                        t: "s",
                        v: "Student Name",
                        w: "Student Name"
                    };
                    ws['B1'] = {
                        h: "Student Code",
                        r: "Student Code",
                        t: "s",
                        v: "Student Code",
                        w: "Student Code"
                    };
                    ws['C1'] = {
                        h: "Class",
                        r: "Class",
                        t: "s",
                        v: "Class",
                        w: "Class"
                    };
                    ws['D1'] = {
                        h: "VNU email",
                        r: "VNU email",
                        t: "s",
                        v: "VNU email",
                        w: "VNU email"
                    };
                    ws['E1'] = {
                        h: "Email",
                        r: "Email",
                        t: "s",
                        v: "Email",
                        w: "Email"
                    };
                    ws['F1'] = {
                        h: "Phone",
                        r: "Phone",
                        t: "s",
                        v: "Phone",
                        w: "Phone"
                    };
                    ws['G1'] = {
                        h: "Company",
                        r: "Company",
                        t: "s",
                        v: "Company",
                        w: "Company"
                    };
                    ws['H1'] = {
                        h: "Type",
                        r: "Type",
                        t: "s",
                        v: "Type",
                        w: "Type"
                    };
                    var name = "";
                    angular.forEach($scope.allFollows, function(follow) {
                        if ($scope.postTitle != "") {
                            if (follow.postTitle == $scope.postTitle) {
                                if (follow.partnerName.toLowerCase().indexOf($scope.search.toLowerCase()) != -1 || $scope.search == "") {
                                    name = follow.partnerName;
                                    ws['A' + i] = {
                                        h: follow.student.fullName,
                                        r: follow.student.fullName,
                                        t: "s",
                                        v: follow.student.fullName,
                                        w: follow.student.fullName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (follow.student.infoBySchool.studentCode != null) {
                                        ws['B' + i] = {
                                            h: follow.student.infoBySchool.studentCode,
                                            r: follow.student.infoBySchool.studentCode,
                                            t: "s",
                                            v: follow.student.infoBySchool.studentCode,
                                            w: follow.student.infoBySchool.studentCode,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }

                                    if (follow.student.infoBySchool.studentClass != null) {
                                        ws['C' + i] = {
                                            h: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                            r: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                            t: "s",
                                            v: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                            w: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }

                                    ws['D' + i] = {
                                        h: follow.student.infoBySchool.emailvnu,
                                        r: follow.student.infoBySchool.emailvnu,
                                        t: "s",
                                        v: follow.student.infoBySchool.emailvnu,
                                        w: follow.student.infoBySchool.emailvnu,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if (follow.student.email != null) {
                                        ws['E' + i] = {
                                            h: follow.student.email,
                                            r: follow.student.email,
                                            t: "s",
                                            v: follow.student.email,
                                            w: follow.student.email,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    if (follow.student.phoneNumber != null) {
                                        ws['F' + i] = {
                                            h: follow.student.phoneNumber,
                                            r: follow.student.phoneNumber,
                                            t: "s",
                                            v: follow.student.phoneNumber,
                                            w: follow.student.phoneNumber,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    ws['G' + i] = {
                                        h: follow.partnerName,
                                        r: follow.partnerName,
                                        t: "s",
                                        v: follow.partnerName,
                                        w: follow.partnerName,
                                        s: {
                                            alignment: {
                                                wrapText: true,
                                                vertical: "center"
                                            }
                                        }
                                    };
                                    if ($scope.typeName == "" || $scope.typeName == undefined) {
                                        ws['H' + i] = {
                                            h: follow.postTitle,
                                            r: follow.postTitle,
                                            t: "s",
                                            v: follow.postTitle,
                                            w: follow.postTitle,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    } else {
                                        ws['H' + i] = {
                                            h: $scope.typeName,
                                            r: $scope.typeName,
                                            t: "s",
                                            v: $scope.typeName,
                                            w: $scope.typeName,
                                            s: {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                }
                                            }
                                        };
                                    }
                                    i++;
                                    count++;
                                    // console.log(excel);
                                }
                            }
                        } else if (follow.partnerName.toLowerCase().indexOf($scope.search.toLowerCase()) != -1 || $scope.search == "") {
                            name = follow.partnerName;
                            ws['A' + i] = {
                                h: follow.student.fullName,
                                r: follow.student.fullName,
                                t: "s",
                                v: follow.student.fullName,
                                w: follow.student.fullName,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center"
                                    }
                                }
                            };
                            if (follow.student.infoBySchool.studentCode != null) {
                                ws['B' + i] = {
                                    h: follow.student.infoBySchool.studentCode,
                                    r: follow.student.infoBySchool.studentCode,
                                    t: "s",
                                    v: follow.student.infoBySchool.studentCode,
                                    w: follow.student.infoBySchool.studentCode,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }

                            if (follow.student.infoBySchool.studentClass != null) {
                                ws['C' + i] = {
                                    h: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    r: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    t: "s",
                                    v: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    w: "K" + follow.student.infoBySchool.grade + follow.student.infoBySchool.studentClass,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }

                            ws['D' + i] = {
                                h: follow.student.infoBySchool.emailvnu,
                                r: follow.student.infoBySchool.emailvnu,
                                t: "s",
                                v: follow.student.infoBySchool.emailvnu,
                                w: follow.student.infoBySchool.emailvnu,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center"
                                    }
                                }
                            };
                            if (follow.student.email != null) {
                                ws['E' + i] = {
                                    h: follow.student.email,
                                    r: follow.student.email,
                                    t: "s",
                                    v: follow.student.email,
                                    w: follow.student.email,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }
                            if (follow.student.phoneNumber != null) {
                                ws['F' + i] = {
                                    h: follow.student.phoneNumber,
                                    r: follow.student.phoneNumber,
                                    t: "s",
                                    v: follow.student.phoneNumber,
                                    w: follow.student.phoneNumber,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }

                            ws['G' + i] = {
                                h: follow.partnerName,
                                r: follow.partnerName,
                                t: "s",
                                v: follow.partnerName,
                                w: follow.partnerName,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center"
                                    }
                                }
                            };
                            if ($scope.typeName == "" || $scope.typeName == undefined) {
                                ws['H' + i] = {
                                    h: follow.postTitle,
                                    r: follow.postTitle,
                                    t: "s",
                                    v: follow.postTitle,
                                    w: follow.postTitle,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            } else {
                                ws['H' + i] = {
                                    h: $scope.typeName,
                                    r: $scope.typeName,
                                    t: "s",
                                    v: $scope.typeName,
                                    w: $scope.typeName,
                                    s: {
                                        alignment: {
                                            wrapText: true,
                                            vertical: "center"
                                        }
                                    }
                                };
                            }
                            i++;
                            count++;
                            // console.log(excel);
                        }

                    });
                    wb.SheetNames.push('Registration List');
                    wb.Sheets['Registration List'] = ws;

                    var wbout = XLSX.write(wb, wopts);

                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }
                    if (count == 0) {
                        $scope.alertWarning("Tên cty chưa chính xác!", 5000);
                    } else {
                        if ($scope.search == "") {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Registration List - All.xlsx")
                        } else {
                            saveAs(new Blob([s2ab(wbout)], { type: "" }), "Registration List - " + name + ".xlsx");
                        }
                        $scope.alertSuccess("Xuất danh sách thành công!", "");
                    }
                };



                $scope.createListStudentToSendMessage = function(status) {
                    $scope.listStudent = [];
                    angular.forEach($scope.allFollows, function(follow) {
                        if (follow.checked == true) {
                            $scope.partnerName = follow.partnerName;
                            $scope.listStudent.push({
                                studentName: follow.studentName,
                                receiverId: follow.student.id,
                                // internId: follow.internship.id,
                                partnerId: follow.partnerId,
                                postId: follow.postId,
                                postTitle: follow.postTitle
                            })
                        }
                    });
                    $scope.message = {};
                    if (status == 'fail') {
                        $scope.message.title = "Thông báo không được nhận thực tập";
                        $scope.message.content = "Bạn không được nhận " + $scope.partnerName + " làm thực tập.";
                    } else {
                        $scope.message.title = "Thông báo được nhận thực tập";
                        $scope.message.content = "Chúc mừng bạn có thể chọn " + $scope.partnerName + " để làm thực tập";
                    }

                    console.log($scope.listStudent);
                }

                $scope.createFailInterviewMessage = function() {
                    angular.forEach($scope.listStudent, function(message) {
                        message.title = $scope.message.title;
                        message.content = $scope.message.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        message.messageType = "Normal";
                    });
                    messageService.createFailInterviewMessage($scope.listStudent)
                        .then(function(response) {
                            $('#close_send_fail_interview_message').trigger('click');
                            $scope.alertSuccess("Gửi thông báo thành công!", "")

                            $scope.getAllFollowByInternshipTerm();
                            $scope.listStudent = [];
                            $scope.selectStudent = false;
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, "");
                            $scope.listStudent = [];
                            $scope.selectStudent = false;
                        })
                    $('#close_send_fail_interview_message').trigger('click');
                    // console.log($scope.listStudent);
                }

                $scope.sendMessage = function() {
                    angular.forEach($scope.listStudent, function(message) {
                        message.title = $scope.message.title;
                        message.content = $scope.message.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        message.messageType = "PassInterview";
                    });
                    messageService.createPassInterviewMessage($scope.listStudent)
                        .then(function(response) {
                            $scope.alertSuccess("Gửi thông báo thành công!", "successdelete_edit")
                            $scope.getAllFollowByInternshipTerm();
                            $('#close_send_pass_interview_message').trigger('click');
                            $scope.listStudent = [];
                            $scope.selectStudent = false;
                        }, function(error) {
                            console.log(error);
                            $('#close_send_pass_interview_message').trigger('click');
                            $scope.listStudent = [];
                            $scope.selectStudent = false;
                        })
                    // console.log($scope.listStudent);
                }

                $scope.selectStudent = false;
                $scope.selectAllStudent = function(data) {
                    $scope.selectStudent = !$scope.selectStudent;
                    if (data != undefined) {
                        angular.forEach(data, function(student) {
                            student.checked = $scope.selectStudent;
                        })
                    } else {
                        if ($scope.search == "") {
                            angular.forEach($scope.allFollows, function(follow) {
                                follow.checked = $scope.selectStudent;
                            });
                        } else {
                            angular.forEach($scope.allFollows, function(follow) {
                                if (follow.partnerName.toLowerCase().indexOf($scope.search.toLowerCase()) != -1) {
                                    if (follow.status == 'WAIT') {
                                        follow.checked = $scope.selectStudent;
                                    }
                                } else {
                                    follow.checked = false;
                                }
                            });
                        }
                    }

                }

                $scope.createListStudent = function(data) {
                    $rootScope.listStudentOfLecturers = [];
                    angular.forEach(data, function(student) {
                        if (student.checked == true) {
                            $rootScope.listStudentOfLecturers.push(student);
                        }
                    })
                    console.log($rootScope.listStudentOfLecturers);
                }

                $scope.checkChecked = function() {
                    angular.forEach($scope.allFollows, function(follow) {
                        console.log(follow.studentName + follow.checked);
                    });
                }

                // $scope.filterCode = function(){
                //     $scope.list1 = ["15021039","14020029","14020141","14020224","14020235","14020284","14020292","14020344","14020390","14020438","14020480","14020602","14020797","15020876","15020912","15020922","15020951","15020953","15020969","15020977","15021038","15021048","15021058","15021061","15021070","15021120","15021133","15021139","15021149","15021150","15021169","15021288","15021295","15021316","15021317","15021320","15021327","15021328","15021332","15021358","15021360","15021363","15021366","15021370","15021377","15021384","15021394","15021414","15021426","15021440","15021468","15021469","15021471","15021473","15021483","15021486","15021603","15021606","15021750","15021766","15021768","15021790","15021793","15021794","15021800","15021801","15021803","15021804","15021809","15021833","15021834","15021837","15021854","15021859","15021881","15021889","15021897","15021914","15021952","15021987","15021994","15022013","15022018","15022032","15022062","15022073","15022822","15022829","15022834","15022842","15022844","15022846","15022848","15022858","15022861","15022865","15022886","chungnv_58","gianglt_58","khoapvv_57","lamht_57","thangnh_58","thanhttb_58"]
                //     $scope.list2 = ["14020029","14020224","14020235","14020284","14020390","14020797","15020876","15020912","15020922","15020951","15020953","15020969","15020977","15021038","15021048","15021058","15021061","15021064","15021070","15021120","15021133","15021139","15021149","15021150","15021156","15021165","15021167","15021169","15021288","15021316","15021317","15021320","15021327","15021328","15021332","15021358","15021363","15021366","15021370","15021377","15021384","15021394","15021414","15021422","15021426","15021440","15021446","15021468","15021469","15021471","15021473","15021483","15021489","15021494","15021603","15021606","15021745","15021750","15021766","15021790","15021793","15021794","15021800","15021801","15021803","15021804","15021809","15021833","15021834","15021837","15021859","15021881","15021889","15021897","15021914","15021952","15021987","15021994","15022013","15022018","15022023","15022032","15022062","15022073","15022822","15022823","15022829","15022834","15022842","15022844","15022846","15022858","15022865","15022886","chungnv_58","gianglt_58","thangnh_58","thanhttb_58"]
                //     angular.forEach($scope.list1, function(e1){
                //         var index = $scope.list2.findIndex(x => x === e1);
                //         if(index == -1)
                //             console.log(e1)
                //     })
                // }
                // $scope.filterCode()
                $scope.getAllFollowByInternshipTerm = function() {
                    studentService.getAllFollowByInternshipTerm()
                        .then(function(response) {
                            console.log(response.data);
                            $scope.allFollows = response.data;
                            $scope.totalItems = response.data.lefngth;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 25;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.allFollows, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                            // angular.forEach($scope.allFollows, function(follow){
                            //     follow.checked = false;
                            // });
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getWaitInterviewFollow = function() {
                    studentService.getAllFollow()
                        .then(function(response) {
                            console.log(response.data);
                            $scope.allFollows = response.data;
                            $scope.totalItems = response.data.lefngth;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 25;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.allFollows, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                            // angular.forEach($scope.allFollows, function(follow){
                            //     follow.checked = false;
                            // });
                        }, function(error) {
                            console.log(error);
                        })
                }


                // function locdau(str) {
                //     str = str.toLowerCase();
                //     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
                //     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
                //     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
                //     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
                //     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
                //     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
                //     str = str.replace(/đ/g, "d");
                //     return str;
                // }

                // $scope.getUserNameAndEmailVnu = function() {
                //     studentService.getUserNameAndEmailVnu(1)
                //         .then(function(response) {
                //             // console.log(response.data);
                //             console.log(response.data);

                //             angular.forEach(response.data, function(user) {
                //                 userName = locdau(user.userName);
                //                 var array = userName.split(' ');
                //                 var first = "";
                //                 var mid = "";
                //                 var last = "";
                //                 // console.log(array);
                //                 // var
                //                 for (var i = array.length - 1; i >= 0; i--) {
                //                     // console.log(array[i]);
                //                     if (i == (array.length - 1)) {
                //                         first = array[i];
                //                     } else if (i == 0) {

                //                         mid = array[i].split('')[0];
                //                     } else {
                //                         last = last + array[i].split('')[0];
                //                     }
                //                 }
                //                 userName = first + mid + last + '_' + user.studentCode;
                //                 console.log(userName);
                //             })

                //         })
                // }

                $scope.getStudentByStudentCode = function() {
                    // if (isNaN($scope.search)){
                    $scope.search = {};
                    // } else {
                    // $scope.search.studentCode = 020;
                    studentService.getStudentByStudentCode($scope.search)
                        .then(function(response) {
                            $scope.allStudents = response.data;
                        }, function(error) {
                            console.log(error);
                            $scope.alertWarning("Không tìm có kết quả!", "");
                        })
                    // }
                }

                $scope.deleteStudent = function(studentId) {
                    $('#close_modal_delete_student').trigger('click');
                    studentService.deleteStudent(studentId)
                        .then(function() {
                            $scope.alertSuccess("Xóa sinh viên thành công!", "");
                            $scope.getAllStudent($scope.page);
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, "");
                        })
                }

                $scope.confirmDelete = function(id, name, internId) {
                    console.log(id);
                    $scope.confirmDeleteId = id;
                    $scope.confirmDeleteInternId = internId;
                    $scope.confirmDeleteName = name;
                }
                $scope.getAllStudent = function(page) {
                    $scope.page = page;
                    studentService.getAllStudent(page - 1, 20)
                        .then(function(response) {
                            console.log(response);
                            // $scope.allStudents = response.data;
                            $scope.allStudents = response.data.content;
                            $scope.pages = [];
                            var page = response.data.totalPages;
                            for (var i = 1; i <= page; i++) {
                                if (i == $scope.page) {
                                    $scope.pages[i] = {
                                        page: i,
                                        class: "active"
                                    };
                                } else {
                                    $scope.pages[i] = {
                                        page: i,
                                        class: ""
                                    };
                                }
                                // console.log(i);                                
                                if ($scope.page == page) {
                                    $scope.nextPage = {
                                        class: "disabled",
                                        page: page
                                    };
                                } else {
                                    $scope.nextPage = {
                                        class: "",
                                        page: parseInt($scope.page) + 1
                                    };
                                }
                                if ($scope.page == 1) {
                                    $scope.previousPage = {
                                        class: "disabled",
                                        page: 1
                                    };
                                } else {
                                    $scope.previousPage = {
                                        class: "",
                                        page: $scope.page - 1
                                    };
                                }

                            }
                        })
                }



                $scope.saveOne = function() {
                    // console.log(data);
                    $scope.req = {
                        studentCode: $scope.student.studentCode,
                        major: $scope.student.major,
                        studentClass: $scope.student.studentClass,
                        diploma: $scope.student.diploma,
                        grade: $scope.student.grade,
                        graduationYear: $scope.student.graduationYear,
                        gpa: $scope.student.gpa,
                        studentName: $scope.student.studentName
                    };
                    studentService.saveData($scope.req, $scope.student.id)
                        .then(function(response) {
                            // console.log(response);
                            // console.log($scope.req);
                            // $window.location.href = $rootScope.clientAdd + '/admin.html#/student';
                            //arr.checked = false;
                            // data.checked = false;
                            $('#close_modal_edit').trigger('click');
                            $scope.alertSuccess("Chỉnh sửa thông tin sinh viên thành công!", "");
                        }, function(error) {
                            // alert("sua thong tin khong thanh cong");
                            $scope.alertDanger("Chỉnh sửa thông tin không thành công!", "danger");
                            console.log(error);
                            //$scope.error = error;
                        })
                };

                $scope.saveData_ = function() {
                    //alert(id);
                    angular.forEach($scope.response, function(arr) {
                        //alert(arr.id);
                        //alert(arr.checked);
                        if (arr.checked == true) {
                            //alert(arr.studentCode);
                            //alert(arr.checked);
                            studentService.saveData(arr, arr.id)
                                .then(function() {
                                    arr.checked = false;
                                }, function(error) {
                                    $scope.error = error;
                                })
                        }
                    })

                };
                $

                function showInput_(data, id) {
                    $('.' + data + '_' + id).after('<input type="text" value="' + data + '" ng-blur="hideInput(' + data + ',' + id + ')" ' +
                        'id="input_' + data + '_' + id + '">');
                    //$('#'+data+'_'+id).remove();
                } //khi du lieu null thi chua tu sinh ra id, doc den day thi nghi tiep ... da doc den day, va da nghi ra :))
                //dung truong id chu ko phai la id la value
                $scope.hideInput = function(data, id) {
                    $('#input_' + data + '_' + id).remove();
                };
                $scope.selectId = function(v) {
                    if (v.checked != true) {
                        v.checked = true;
                    } else
                    if (v.checked == true) {
                        v.checked = false;
                        // alert(v.checked);
                    }
                };
                $scope.onChange = function(id) {
                    angular.forEach($scope.response, function(v) {
                        if (v.id == id && v.checked != true) {
                            v.checked = true;
                            //$('#checkBox_'+id).after('<p ng-click="'+saveData_+'">Luu</p>');
                        }
                    });
                };
                $scope.selectAllId = false;
                $scope.selectAll = function() {
                    if ($scope.selectAllId == false) {
                        angular.forEach($scope.response, function(v) {
                            v.checked = true;
                        });
                        $scope.selectAllId = true;
                    } else {
                        angular.forEach($scope.response, function(v) {
                            v.checked = false;
                        });
                        $scope.selectAllId = false;
                    }
                };
                $scope.showInput = function() {
                    angular.forEach($scope.response, function(arr) {
                        if (arr.checked == true) {
                            showInput_(arr.studentCode, arr.id);
                            showInput_(arr.major, arr.id);
                            showInput_(arr.studentClass, arr.id);
                            showInput_(arr.diploma, arr.id);
                            showInput_(arr.grade, arr.id);
                            showInput_(arr.graduationYear, arr.id);
                        }
                    })
                };
                $scope.edit = function(data) {
                    // console.log(data);
                    $scope.student = data;
                    // if (data.status == "A") {
                    //     $scope.student.status = true;
                    // } else {
                    //     $scope.student.status = false;
                    // }
                    // $location.path('/admin/student/edit');

                    // console.log(data);
                    // alert(data);
                };


                $scope.changeStatus = function(userId) {
                    studentService.changeStatus(userId)
                        .then(function() {
                            if ($scope.student.status == true) {
                                $scope.student.status = false;
                            } else {
                                $scope.student.status = true;
                            }
                            // alert("user status changed");
                            $scope.alertSuccess("Chuyển trạng thái thành công!", "successdelete_edit");
                        }, function(error) {
                            $scope.alertDanger("Có lỗi xảy ra, hãy reload lại trang và thử lại!", "danger");
                        })
                }

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
                                    // console.log($rootScope.excel);

                                    //$scope.setExcelTable();
                                    // console.log(XLSX.utils.sheet_to_json(worksheet));
                                }
                            };
                            reader.readAsBinaryString(f);
                        }
                        $scope.setExcelTable();
                    }
                    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

                    // input_dom_element.addEventListener('change', handleFile, false);
                }

                $scope.setExcelTable = function() {
                    // alert(1);
                    // console.log($rootScope.excel);
                    $scope.excelTable = $rootScope.excel;
                    angular.forEach($scope.excelTable, function(student) {
                        student.emailvnu = student.emailvnu.replace(/(?:@vnu.edu.vn|@gmail.com)/g, '');
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