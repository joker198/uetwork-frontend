(function() {
    var app = angular.module("message", []);
    app.controller('messageCtrl', ['$timeout', '$scope', '$location', '$rootScope', '$window', '$cookies', 'messageService', '$stateParams', '$state', '$sce',
        function($timeout, $scope, $location, $rootScope, $window, $cookies, messageService, $stateParams, $state, $sce) {
            // $scope.currentPage = $state.current.url;
            $scope.message = {};
            $scope.reply = {};
            if ($rootScope.initPage == undefined) {
                $rootScope.initPage = 1;
            }
            // $scope.currentPage = $state.current.url;

            $scope.changeMess = function(string) {
                if (string == 'finalReport') {
                    $scope.messType = string;
                    messageService.getLecturersName()
                        .then(function(response) {
                            console.log(response);
                            $scope.message.receiverName = response.data.email;
                            // $scope.message.title = "Báo cáo thực tập cuối kì - " + response.data.subject;
                            $('#receiverName').attr('readonly', 'readonly');
                            $scope.final = true;
                        }, function(error) {
                            console.log(error)
                        })

                } else {
                    $scope.message.receiverName = "";
                    $('#receiverName').removeAttr('readonly');
                    $scope.final = false;
                }
            }


            $scope.getAllMessage = function(page) {
                if ($rootScope.messages == undefined) {
                    $rootScope.messages = [];

                }
                console.log($rootScope.initPage);
                $scope.page = page;
                if ($rootScope.lastUpdated == undefined) {
                    var currentTime = new Date();
                    var curr_date = currentTime.getDate();
                    var curr_month = currentTime.getMonth() + 1; //Months are zero based
                    var curr_year = currentTime.getFullYear();
                    var curr_hours = currentTime.getHours();
                    var curr_min = currentTime.getMinutes();
                    var curr_sec = currentTime.getSeconds();
                    currentTime = curr_year + "-" + curr_month + "-" + curr_date + " " + curr_hours + ":" + curr_min + ":" + curr_sec;
                    $rootScope.lastUpdated = currentTime;
                }
                messageService.getAllMessage($rootScope.initPage - 1, 5, $rootScope.lastUpdated)
                    .then(function(response) {
                        console.log(response);
                        // $rootScope.messages = response.data.content;
                        angular.forEach(response.data.content, function(v) {
                            $rootScope.messages.push(v);
                        });
                        $rootScope.initPage++;
                        console.log($rootScope.initPage);
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
                    }, function(error) {
                        console.log(error);
                    })
            }
            $rootScope.currentPage = $state.current.name;

            $scope.getLinkFile = function(attachFileAdd) {
                // attachFileAdd = "http://www.pdf995.com/samples/pdf.pdf";
                $rootScope.modalFileLink = $sce.trustAs($sce.RESOURCE_URL, "https://docs.google.com/gview?url=" + $rootScope.sourceAdd + attachFileAdd + "&embedded=true");
            }

            $scope.getFileName = function(fileAdd) {
                return fileAdd.split('/').pop();
            }

            $scope.getLinkDownLoad = function(fileAdd) {
                // console.log($rootScope.clientAdd + fileAdd);
                return $rootScope.sourceAdd + fileAdd;
            }


            $scope.getRegistrationList = function() {
                
                messageService.getRegistrationList($rootScope.studentId)
                    .then(function(response) {
                        $scope.allFollow = response.data;
                        console.log(response.data);
                        // var index = $scope.allFollow.findIndex(x => x.status === 'SELECTED');
                        // if (index != -1) {
                        //     $scope.selected = true;
                        // }
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.selectPartner = function() {
                $('#close_select_partner').trigger('click');
                messageService.selectInternByPartnerId($scope.selectedPartnerId)
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

            $scope.select = function(partnerId, partnerName) {
                $scope.selectedPartnerId = partnerId;
                $scope.selectedPartnerName = partnerName;
                $scope.showButton = true;
            }

            $scope.checkMessage = function(message) {

                console.log($rootScope.selectedMessage);
                if ($rootScope.selectedMessage != undefined) {
                    if ($rootScope.selectedMessage.messageType == 'Reply') {
                        $rootScope.markMessageAsSeen($rootScope.selectedMessage.parentId);
                    }
                    // $rootScope.markMessageAsSeen($rootScope.selectedMessage.parentId);
                    if ($rootScope.selectedMessage.messageType == 'Inbox' || $rootScope.selectedMessage.messageType == 'Reply') {
                        $scope.receiverName = $rootScope.selectedMessage.senderName;
                        if ($rootScope.selectedMessage.status == 'NEW') {
                            $rootScope.markMessageAsSeen($rootScope.selectedMessage.id);
                            $rootScope.selectedMessage.status = "";
                        }
                        console.log(139);
                        messageService.getOneMessage($rootScope.selectedMessage.id)
                            .then(function(response) {
                                console.log(response);
                                $rootScope.selectedMessage = response.data;

                                // $scope.receiverName = $rootScope.selectedMessage.receiverName;
                            }, function(error) {
                                console.log(error);
                            });
                    } else {
                        $scope.receiverName = $rootScope.selectedMessage.senderName;
                        if ($rootScope.selectedMessage.status == 'NEW') {
                            $rootScope.markMessageAsSeen($rootScope.selectedMessage.id);
                        }
                    }

                    console.log($scope.receiverName);
                } else {
                    messageService.getOneMessage($stateParams.messageId)
                        .then(function(response) {
                            console.log(response.data);
                            $rootScope.selectedMessage = response.data;
                            if ($rootScope.selectedMessage.messageType == 'Inbox') {
                                $scope.receiverName = $rootScope.selectedMessage.receiverName;
                            } else {
                                if ($scope.selectedMessage.senderName == $rootScope.username) {
                                    $scope.receiverName = $rootScope.selectedMessage.receiverName;
                                } else {
                                    $scope.receiverName = $rootScope.selectedMessage.senderName;
                                }

                            }
                            if (response.data.status == 'NEW' && response.data.receiverName == $rootScope.username) {
                                $rootScope.markMessageAsSeen($rootScope.selectedMessage.id);
                            }
                            console.log($scope.receiverName);
                        }, function(error) {
                            console.log(error);
                        })
                }

            }

            $rootScope.markMessageAsSeen = function(messageId) {
                messageService.markMessageAsSeen(messageId)
                    .then(function() {
                        var index = $rootScope.newMessages.findIndex(x => x.id === messageId)
                        if (index != -1) {
                            $rootScope.newMessages.splice(index, 1);
                            $rootScope.messagesCount = $rootScope.newMessages.length;
                        } else {
                            var index = $rootScope.newMessages.findIndex(x => x.parentId === messageId)
                            if (index != -1) {
                                $rootScope.newMessages.splice(index, 1);
                                $rootScope.messagesCount = $rootScope.newMessages.length;
                            }
                        }
                        var index = $rootScope.messages.findIndex(x => x.id === messageId)
                        if (index != -1) {
                            $rootScope.messages[index].status = "";
                        }
                    });
            }

            $scope.comfirmationLink = function() {
                messageService.selectIntern($stateParams.confirmationLink)
                    .then(function(response) {
                        alert("successfully select Internship");
                        $window.location.href = $rootScope.clientAdd;
                    }, function(error) {
                        console.log(error);
                        if (error.data.message == 'Internship is available!' || error.data.message == 'Cannot choose this partner!' || error.data.message == 'Please fill all your information in profile!' || error.data.message == 'Not found!') {
                            alert(error.data.message);
                        }
                    })
            }

            $scope.getMessageByType = function(messageType) {
                messageService.getMessageByType(messageType)
                    .then(function(response) {
                        $scope.MessageByType = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.replyMessage = function() {
                if ($scope.reply.content != undefined) {
                    $scope.reply.content = $scope.reply.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $scope.reply.receiverName = $scope.receiverName;
                    $scope.reply.messageId = $rootScope.selectedMessage.id;
                    console.log($scope.message.attachFile);
                    if ($scope.message.attachFile != undefined) {
                        $scope.reply.attachFile = $scope.message.attachFile;
                        $scope.reply.fileName = $scope.message.fileName;
                        $scope.reply.fileType = $scope.message.fileType;
                    }
                    // console.log($scope.reply);
                    messageService.createMessage($scope.reply)
                        .then(function(response) {
                            console.log(response.data);
                            $scope.reply = {};
                            if ($rootScope.selectedMessage.messages == null) {
                                $rootScope.selectedMessage.messages = [];
                            }
                            $rootScope.selectedMessage.messages.push(response.data);
                            $rootScope.selectedMessage.lastUpdated = new Date().getTime();
                            // alert("ok");
                            // console.log($rootScope.selectedMessage.message);
                            // $rootScope.selectedMessage.message.push(response.data);
                            // location.reload();
                        }, function(error) {
                            console.log(error);
                        })
                }
            }

            $scope.sendMessage = function() {
                if ($scope.message.content != undefined) {
                    $scope.message.content = $scope.message.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    // $scope.message.receiverName = receiverId;
                    $scope.loading = true;
                    if ($scope.final == undefined || $scope.final == false) {
                        messageService.createMessage($scope.message)
                            .then(function() {
                                $scope.message = {};
                                // alert("ok");
                                $scope.loading = false;
                                $scope.alertSuccess("Gửi tin nhắn thành công", "");
                            }, function(error) {
                                console.log(error);
                                $scope.loading = false;
                                $scope.alertDanger("Error", "");
                            })
                    } else {
                        $scope.req = {};
                        $scope.req.messageDTO = $scope.message;
                        console.log($scope.req);
                        messageService.addFinalReport($scope.req)
                            .then(function() {
                                $scope.message = {};
                                $('#baocao').val(null);
                                $scope.loading = false;
                                // alert("ok");
                                $scope.alertSuccess("Gửi tin nhắn thành công", "");
                            }, function(error) {
                                console.log(error);
                                $scope.loading = false;
                                $scope.alertDanger("Error", "");
                            })
                    }
                }

            }

            var handleFileSelect = function(evt) {
                var file = evt.currentTarget.files[0];
                console.log(evt.currentTarget.files);
                $scope.message.fileName = evt.currentTarget.files[0].name;
                $scope.message.fileType = evt.currentTarget.files[0].name.split('.').pop();
                var reader = new FileReader();
                reader.onload = function(evt) {
                    $scope.$apply(function($scope) {
                        $scope.message.attachFile = evt.target.result.split(',').pop();
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#baocao')).on('change', handleFileSelect);

            $scope.showFile = function() {
                console.log($scope.message.attachFile);
            }

            $scope.getAllComfirmationLink = function() {
                messageService.getAllComfirmationLink($cookies.get('studentId'))
                    .then(function(response) {
                        console.log(response.data);
                        $scope.allComfirmationLink = response.data;
                    }, function(error) {
                        console.log(error);
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