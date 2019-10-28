(function() {
    var app = angular.module("message", []);
    angular.module('message')
        .controller('messageCtrl', ['$timeout', '$scope', '$rootScope', '$location', '$window', 'messageService', '$state', '$sce',
            function($timeout, $scope, $rootScope, $location, $window, messageService, $state, $sce) {
                $rootScope.currentPageName = $state.current.name;
                $scope.message = {};
                $scope.reply = {};
                $rootScope.initPage = 1;
                $scope.deleteNotificationMessage = function(messageId) {
                    $('#close_modal_delete_message').trigger('click');
                    messageService.deleteNotificationMessage(messageId)
                        .then(function() {
                            $scope.getNotificationMessage();
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getNotificationMessage = function() {
                    messageService.getNotificationMessage()
                        .then(function(response) {
                            $scope.notificationMessage = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.createNotification = function() {
                    $scope.notification.content = $scope.notification.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    messageService.createNotificationMessage($scope.notification)
                        .then(function() {
                            $scope.getNotificationMessage();
                            $scope.notification.content = "";
                        }, function(error) {
                            console.log(error);
                        })
                }
                $scope.getAllMessage = function(page) {
                    $scope.page = page;
                    // if ($rootScope.messages == undefined) {
                    //     // $rootScope.messages = [];
                    // }
                    $rootScope.messages = [];
                    console.log($rootScope.initPage);
                    if ($rootScope.lastUpdated == undefined) {
                        currentTime = new Date();
                        var curr_date = currentTime.getDate();
                        var curr_month = currentTime.getMonth() + 1; //Months are zero based
                        var curr_year = currentTime.getFullYear();
                        var curr_hours = currentTime.getHours();
                        var curr_min = currentTime.getMinutes();
                        var curr_sec = currentTime.getSeconds();
                        currentTime = curr_year + "-" + curr_month + "-" + curr_date + " " + curr_hours + ":" + curr_min + ":" + curr_sec;
                        $rootScope.lastUpdated = currentTime;
                    }
                    messageService.getAllMessage($rootScope.initPage - 1, 20, $rootScope.lastUpdated)
                        .then(function(response) {
                            console.log(response);
                            $rootScope.messagesCount = response.data.length;
                            angular.forEach(response.data.content, function(v) {
                                $rootScope.messages.push(v);
                            });

                            $rootScope.initPage++;
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

                $scope.getAllStudent = function(page) {
                    $scope.page = page;
                    studentService.getAllStudent(page - 1, 10)
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

                $scope.showMessage = function(message) {
                    if (message.messageType == 'Inbox') {
                        $scope.receiverName = message.senderName;
                        messageService.getOneMessage(message.id)
                            .then(function(response) {
                                console.log(response.data);
                                $rootScope.selectedMessage = response.data;
                            }, function(error) {
                                content.log(error);
                            })
                    } else {
                        $scope.receiverName = message.senderName;
                        $rootScope.selectedMessage = message;
                    }
                    console.log($scope.receiverName);
                    if (message.status == 'NEW') {
                        messageService.markMessageAsSeen(message.id)
                            .then(function() {
                                // $rootScope.messagesCount--;
                                message.status = "";
                                // $scope.getNewMessage();
                            });
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

                $rootScope.markMessageAsSeen = function(messageId) {
                    messageService.markMessageAsSeen(messageId)
                        .then(function() {
                            // var index = $rootScope.newMessages.findIndex(x => x.id === messageId)
                            // if (index != -1) {
                            //     $rootScope.newMessages.splice(index, 1);
                            //     $rootScope.messagesCount = $rootScope.newMessages.length;
                            // } else {
                            //     var index = $rootScope.newMessages.findIndex(x => x.parentId === messageId)
                            //     if (index != -1) {
                            //         $rootScope.newMessages.splice(index, 1);
                            //         $rootScope.messagesCount = $rootScope.newMessages.length;
                            //     }
                            // }
                        });
                }

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

                $scope.sendMessage = function() {
                    if ($scope.message.content != undefined) {
                        $scope.message.content = $scope.message.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        // $scope.message.receiverName = receiverId;
                        console.log($scope.message);
                        messageService.createMessage($scope.message)
                            .then(function() {
                                $scope.message = {};
                                new PNotify({
                                    title: 'Gửi tin nhắn thành công!',
                                    // text: 'That thing that you were trying to do worked!',
                                    type: 'success',
                                    styling: 'bootstrap3'
                                });
                                // alert("ok");
                                // $scope.alertSuccess("Your message has been sent", "");
                            }, function(error) {
                                console.log(error);
                                $scope.alertDanger("Error", "");
                            })
                    }

                }

                $scope.replyMessage = function() {
                    if ($scope.reply.content != undefined) {
                        $scope.reply.content = $scope.reply.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        $scope.reply.receiverName = $scope.receiverName;
                        $scope.reply.messageId = $rootScope.selectedMessage.id;
                        // console.log($scope.reply);
                        messageService.createMessage($scope.reply)
                            .then(function(response) {
                                console.log(response.data);
                                $scope.reply = {};
                                // $scope.alertSuccess("Gửi tin nhắn thành công!", "");
                                $rootScope.selectedMessage.messages.push(response.data);
                                $rootScope.selectedMessage.lastUpdated = new Date().getTime();
                                // alert("ok");
                                // console.log($rootScope.selectedMessage.message);
                                // $rootScope.selectedMessage.message.push(response.data);
                                // location.reload();
                            }, function(error) {
                                console.log(error);
                                $scope.alertDanger(error.data.message, "");
                            })
                    }
                }


                $scope.confirmDelete = function(id) {
                    console.log(id);
                    $scope.confirmDeleteId = id;
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