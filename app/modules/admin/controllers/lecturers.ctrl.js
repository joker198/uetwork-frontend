(function() {
    var app = angular.module("lecturers", []);
    app.controller('lecturersCtrl', ['filterFilter', '$scope', 'lecturersService', '$location', '$rootScope', '$window',
        '$timeout', 'md5', '$state',
        function(filterFilter, $scope, lecturersService, $location, $rootScope, $window, $timeout, md5, $state) {
            $rootScope.currentPageName = $state.current.name;
            $scope.entry = '';
            $scope.input = {};
            $scope.getAllStudentClass = function() {
                lecturersService.getAllStudentClass()
                    .then(function(response) {
                        console.log(response);
                        $scope.allStudentClass = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createStudentClass = function() {
                if ($scope.input.studentClass != null) {
                    lecturersService.createStudentClass($scope.input)
                        .then(function() {
                            $scope.alertSuccess("Thêm lớp khóa học thành công!", "");
                            $scope.getAllStudentClass();
                            $scope.input = {};
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }
            }

            $scope.deleteStudentClass = function(id) {
                $('#close_modal_delete_delete_class').trigger('click');
                lecturersService.deleteStudentClass(id)
                    .then(function() {
                        $scope.alertSuccess("Xóa lớp khóa học thành công!", "");
                        $scope.getAllStudentClass();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.message.data, "");
                    })
            }

            $scope.editStudentClass = function(studentClassId, classNameId) {
                // $('#nation_' + nationId).html('<div class="col-md-4 col-sm-4 col-xs-6">' + 
                //     '<input type="text" name="country" class="form-control col-md-6" ng-model="' + nationName + '" required /></div>');
                var studentClass = $('#studentClass_' + studentClassId).text();
                $('#studentClass_' + studentClassId).html('<input id="studentClass_value_' + studentClassId + '" value="' + studentClass + '" style="border-radius:3px; border: 1px solid; width: 50%;"/>');
                var className = $('#className_' + studentClassId).text();
                $('#className_' + studentClassId).html('<input id="className_value_' + studentClassId + '" value="' + className + '" style="border-radius:3px; border: 1px solid; width: 50%;"/>');

                $('#edit_studentClass_' + studentClassId).hide();
                $('#save_edit_studentClass_' + studentClassId).show();


            }

            $scope.saveEditStudentClass = function(studentClassId) {
                // console.log(nationId);
                var studentClass = $('#studentClass_value_' + studentClassId).val();
                var className = $('#className_value_' + studentClassId).val();
                // console.log(v);
                $scope.request = {
                    id: studentClassId,
                    studentClass: studentClass,
                    className: className
                }
                console.log($scope.request);
                lecturersService.editStudentCLass($scope.request)
                    .then(function() {
                        $('#save_edit_studentClass_' + studentClassId).hide();
                        $('#studentClass_' + studentClassId).html(studentClass);
                        $('#edit_studentClass_' + studentClassId).show();
                        $('#className_' + studentClassId).html(className);
                        $scope.alertSuccess('Sửa tên lớp thành công!', ''); //dang vuong o cho hien alert success
                        // $scope.getA();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
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
                            worksheet['B1'].w = "fullName";
                            worksheet['C1'].w = "subject";
                            worksheet['D1'].w = "phoneNumber";
                            worksheet['E1'].w = "emailvnu";
                            $rootScope.excel = XLSX.utils.sheet_to_json(worksheet);
                        };
                        reader.readAsBinaryString(f);
                    }
                }
                if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

                // input_dom_element.addEventListener('change', handleFile, false);
            }

            $scope.setExcelTable = function() {
                // alert(1);
                console.log($rootScope.excel);
                $scope.excelTable = $rootScope.excel;
                angular.forEach($scope.excelTable, function(lecturers) {
                        lecturers.userName = lecturers.emailvnu.replace(/(?:@vnu.edu.vn|@gmail.com)/g, '');
                    })
                    // $rootScope.excelTable =$rootScope.excel  ;
            }

            $scope.send = function() {
                $scope.errorCount = 0;
                lecturersService.createLecturersFromExcel($scope.excelTable)
                    .then(function(response) {
                        console.log(response);
                        $scope.excelTable = null;
                        angular.forEach(response.data, function(lecturers) {
                            if (lecturers.status == "userNameExisted") {
                                $('#' + lecturers.userName).css('background-color', '#f0ad4e');
                                $scope.errorCount++;
                                console.log(lecturers.userName);
                            } else {
                                var index = response.data.indexOf(lecturers)
                                response.data.splice(index, 1);
                            }
                        });
                        if ($scope.errorCount != 0) {
                            $scope.alertDanger("Kiểm tra lại các giảng viên sau, UserName bị trùng", "");
                            $scope.excelTable = response.data;
                        } else {
                            $scope.alertSuccess("Nhập giảng viên thành công!", "");
                            $scope.getAllLecturers();
                        }
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, "");
                    })
            }

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
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                }
            }

            $scope.getAllLecturers = function() {
                lecturersService.getAllLecturers()
                    .then(function(response) {
                        console.log(response);
                        $scope.allLecturers = response.data;
                        $scope.totalItems = response.data.length;
                        $scope.currentPage = 1;
                        $scope.entryLimit = 25;
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                        $scope.$watch('search', function(newVal, oldVal) {
                            $scope.filtered = filterFilter($scope.allLecturers, newVal);
                            $scope.totalItems = $scope.filtered.length;
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                            $scope.currentPage = 1;
                        }, true);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllFaculty = function() {
                lecturersService.getAllFaculty()
                    .then(function(response) {
                        $scope.allFaculty = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createFaculty = function() {
                lecturersService.createFaculty($scope.input)
                    .then(function() {
                        $scope.getAllFaculty();
                        $scope.alertSuccess("Tạo thêm khoa thành công!", "");
                    }, function(error) {
                        $scope.alertDanger(error.message, "");
                    })
            }

            $scope.createLecturers = function() {
                $scope.lecturers.role = "LECTURERS";
                $scope.lecturers.password = md5.createHash($scope.lecturers.password || '');
                console.log($scope.lecturers);
                lecturersService.createLecturers($scope.lecturers)
                    .then(function(response) {
                        $scope.alertSuccess("Thêm giảng viên thành công!", "");
                        $scope.lecturers = {};
                        $scope.getAllLecturers();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.confirmDelete = function(id, name) {
                console.log(id);
                $scope.confirmDeleteId = id;
                $scope.confirmDeleteName = name;
            }

            $scope.deleteLecturers = function(lecturersId) {
                $('#close_modal_delete_lecturers').trigger('click');
                lecturersService.deleteLecturers(lecturersId)
                    .then(function() {
                        // $('#close_modal_delete_lecturers').trigger('click');
                        $scope.alertSuccess("Xóa giảng viên thành công", ""),
                            $scope.getAllLecturers();
                    }, function(error) {
                        $scope.alertDanger(error.data.message, "");
                    })
            }

            $scope.editLecturers = function(lecturersId) {
                var fullName = $('#fullName_' + lecturersId).text();
                $('#fullName_' + lecturersId).html('<input id="fullName_value_' + lecturersId + '" value="' + fullName + '" style="border-radius:3px; border: 1px solid;"/>');

                var email = $('#email_' + lecturersId).text();
                $('#email_' + lecturersId).html('<input id="email_value_' + lecturersId + '" value="' + email + '" style="border-radius:3px; border: 1px solid;"/>');

                var emailVNU = $('#emailVNU_' + lecturersId).text();
                $('#emailVNU_' + lecturersId).html('<input id="emailVNU_value_' + lecturersId + '" value="' + emailVNU + '" style="border-radius:3px; border: 1px solid;"/>');

                var subject = $('#subject_' + lecturersId).text();
                $('#subject_' + lecturersId).html('<input id="subject_value_' + lecturersId + '" value="' + subject + '" style="border-radius:3px; border: 1px solid; width: 70%;"/>');

                var phoneNumber = $('#phoneNumber_' + lecturersId).text();
                $('#phoneNumber_' + lecturersId).html('<input id="phoneNumber_value_' + lecturersId + '" value="' + phoneNumber + '" style="border-radius:3px; border: 1px solid; width: 70%;"/>');

                $('#edit_lecturers_' + lecturersId).hide();
                $('#save_edit_lecturers_' + lecturersId).show();
            }

            $scope.saveEditLecturers = function(lecturersId) {
                var fullName = $('#fullName_value_' + lecturersId).val();
                var email = $('#email_value_' + lecturersId).val();
                var emailVNU = $('#emailVNU_value_' + lecturersId).val();
                var subject = $('#subject_value_' + lecturersId).val();
                var phoneNumber = $('#phoneNumber_value_' + lecturersId).val();
                // console.log(v);
                $scope.request = {
                        id: lecturersId,
                        fullName: fullName,
                        email: email,
                        emailVNU: emailVNU,
                        subject: subject,
                        phoneNumber: phoneNumber
                    }
                    // console.log($scope.request);
                lecturersService.editLecturers($scope.request)
                    .then(function() {
                        $('#edit_lecturers_' + lecturersId).show();
                        $('#save_edit_lecturers_' + lecturersId).hide();
                        $('#fullName_' + lecturersId).html(fullName);
                        $('#email_' + lecturersId).html(email);
                        $('#emailVNU_' + lecturersId).html(emailVNU);
                        $('#subject_' + lecturersId).html(subject);
                        $('#phoneNumber_' + lecturersId).html(phoneNumber);
                        $scope.alertSuccess('Sửa Giảng viên thành công!', '');
                        // $scope.getAllContinent();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
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
