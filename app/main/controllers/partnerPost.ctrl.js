(function() {
    var app = angular.module("partnerPost", []);
    app.controller('partnerPostCtrl', ['$scope', 'partnerPostService', '$rootScope',
        '$stateParams', '$route', '$location', '$window', '$cookies', '$state', 'partnerContactService', '$timeout',
        function($scope, partnerPostService, $rootScope, $stateParams, $route, $location, $window, $cookies, $state, partnerContactService, $timeout) {

            $scope.getPartnerNameAndIdOfOtherPartner = function() {
                partnerPostService.getPartnerNameAndIdOfOtherPartner()
                    .then(function(response) {
                        $scope.nameAndIdOther = response.data;
                    })
            }

            $scope.getPartnerNameAndIdOfFitPartner = function() {
                partnerPostService.getPartnerNameAndIdOfFitPartner()
                    .then(function(response) {
                        $scope.nameAndIdFit = response.data;
                    })
            }

            $scope.registerPartner = function(postTitle = null) {
                if ($scope.selectedPartner != undefined) {
                    $scope.req = {
                        partner: {
                            id: $scope.selectedPartner.originalObject[0]
                        },
                        postTitle: "Recruitment_other"
                    }
                    partnerPostService.registerPartner($scope.req)
                        .then(function(response) {
                            $scope.alertSuccess('Đăng kí công ty thực tập thành công. ' +
                                'Hãy chờ thông báo phê duyệt công ty trong mục tin nhắn hoặc kiểm tra trong mục "Thông tin thực tập"', '', true);
                            $scope.getCurrentInternshipOfInternshipTerm();
                            $scope.clearAngucompleteAltInput('findPartner');
                            $scope.checkFollow(0, 'registration', "Recruitment_other");
                        }, function(error) {
                            if (error.data.message.indexOf('fill') != -1) {
                                $scope.alertDanger('Hãy điền đầy đủ thông tin cá nhân trước.', '');
                            } else if (error.data.message.indexOf('NOT_ACCEPTED') != -1) {
                                $scope.alertDanger('Đăng kí thực tập tại ' + $scope.selectedPartner.originalObject[1] + ' không được chấp nhận.', '');
                            } else if (error.data.message == "Out of date") {
                                $scope.alertDanger("Không thể đăng ký vì bạn chưa đăng ký thực tập trong thời gian " +
                                    $rootScope.internship.internshipTerm.startDate + " đến " +
                                    $rootScope.internship.internshipTerm.expiredDate, "");
                            } else {
                                $scope.alertDanger('Chưa đăng ký được, hãy thử lại sau.', '');
                            }

                        })
                }

            }

            $scope.registerFitPartner = function(postTitle = null) {
                if ($scope.selectedFitPartner != undefined) {
                    $scope.req = {
                        partner: {
                            id: $scope.selectedFitPartner.originalObject[0]
                        },
                        postTitle: "Recruitment"
                    }
                    partnerPostService.registerPartner($scope.req)
                        .then(function(response) {
                            $scope.alertSuccess('Đăng kí công ty thực tập thành công. ', '', true);
                            $scope.getCurrentInternshipOfInternshipTerm();
                            $scope.clearAngucompleteAltInput('findFitPartner');
                            $scope.checkFollow(0, 'registration_fit', "Recruitment");
                        }, function(error) {
                            if (error.data.message.indexOf('fill') != -1) {
                                $scope.alertDanger('Hãy điền đầy đủ thông tin cá nhân trước.', '');
                            } else if (error.data.message.indexOf('NOT_ACCEPTED') != -1) {
                                $scope.alertDanger('Đăng kí thực tập tại ' + $scope.selectedFitPartner.originalObject[1] + ' không được chấp nhận.', '');
                            } else if (error.data.message == "Out of date") {
                                $scope.alertDanger("Không thể đăng ký vì bạn chưa đăng ký thực tập trong thời gian " +
                                    $rootScope.internship.internshipTerm.startDate + " đến " +
                                    $rootScope.internship.internshipTerm.expiredDate, "");
                            } else {
                                $scope.alertDanger('Chưa đăng ký được, hãy thử lại sau.', '');
                            }
                        })
                }

            }

            $scope.registerNewPartner = function() {
                if ($scope.inputNewPartner.partnerName != "" && $scope.inputNewPartner.partnerName != null && $scope.inputNewPartner.partnerName != undefined &&
                    $scope.inputNewPartner.address != "" && $scope.inputNewPartner.address != null && $scope.inputNewPartner.address != undefined &&
                    $scope.inputNewPartner.email != "" && $scope.inputNewPartner.email != null && $scope.inputNewPartner.email != undefined &&
                    $scope.inputNewPartner.phone != "" && $scope.inputNewPartner.phone != null && $scope.inputNewPartner.phone != undefined) {
                    $scope.req = {
                        partner: {},
                        partnerDTO: {
                            partnerName: $scope.inputNewPartner.partnerName,
                            address: $scope.inputNewPartner.address,
                            email: $scope.inputNewPartner.email,
                            phone: $scope.inputNewPartner.phone
                        },
                        postTitle: "Recruitment_other"
                    }
                    partnerPostService.registerPartner($scope.req)
                        .then(function(response) {
                            $scope.alertSuccess('Đăng kí thông tin công ty thực tập thành công. ' +
                                'Hãy chờ thông báo phê duyệt công ty trong mục tin nhắn hoặc kiểm tra trong mục "Thông tin thực tập"', '', true);
                            $scope.getCurrentInternshipOfInternshipTerm();
                            $scope.clearAngucompleteAltInput('findPartner');
                            $scope.checkFollow(0, 'registration');
                        }, function(error) {
                            if (error.data.message.indexOf('fill') != -1) {
                                $scope.alertDanger('Hãy điền đầy đủ thông tin cá nhân trước.', '');
                            } else if (error.data.message == "Out of date") {
                                $scope.alertDanger("Không thể đăng ký vì bạn chưa đăng ký thực tập trong thời gian " +
                                    $rootScope.internship.internshipTerm.startDate + " đến " +
                                    $rootScope.internship.internshipTerm.expiredDate, "");
                            } else {
                                $scope.alertDanger('Không thể đăng ký đăng ký được, hãy thử lại sau.', '');
                            }
                        })
                }

            }

            $scope.followResearch = function() {
                if ($scope.nameAndIdOfLecturers.selected != undefined && $scope.nameAndIdOfLecturers.selected != "") {
                    $scope.loading = true;
                    partnerPostService.followResearch($scope.nameAndIdOfLecturers.selected)
                        .then(function() {
                            $scope.loading = false;
                            $scope.alertSuccess("Success", "");
                            $scope.checkFollow($scope.researchPostId);
                        }, function(error) {
                            $scope.loading = false;
                            if (error.data.message.indexOf('fill') != -1) {
                                $scope.alertDanger('Hãy điền đầy đủ thông tin cá nhân trước.', '');
                            } else if (error.data.message == "Out of date") {
                                $scope.alertDanger("Không thể đăng ký vì bạn chưa đăng ký thực tập trong thời gian " +
                                    $rootScope.internship.internshipTerm.startDate + " đến " +
                                    $rootScope.internship.internshipTerm.expiredDate, "");
                            } else {
                                $scope.alertDanger('Không thể đăng ký đăng ký được, hãy thử lại sau.', '');
                            }
                        })
                }
            }

            $scope.getNameAndIdOfLecturers = function() {
                partnerPostService.getNameAndIdOfLecturers()
                    .then(function(response) {
                        $scope.nameAndIdOfLecturers = response.data;
                    })
            }

            $scope.loadPartnerContact = function() {
                $scope.input = {};
                partnerContactService.loadContact($cookies.get('partnerID'))
                    .then(function(response) {
                        $scope.partnerContacts = response.data;
                    }, function(error) {
                        console.log(error);
                    });
            }

            $scope.initTag = function() {
                let $ = s => [].slice.call(document.querySelectorAll(s));
                let t = $('#tags')[0];
                t.addEventListener('input', log);
                t.addEventListener('change', log);

                function log(e) {
                    $scope.tags = `${this.value.replace(/,/g,', ')}`;
                    if (`${e.type}` == 'input') {
                        $scope.array = [];
                        $scope.array = `${this.value.replace(/,/g,', ')}`.split(', ');
                        var i = $scope.array.length;
                        $scope.lastTag = $scope.array[i - 1];
                    }
                }

                $('input[type="tags"]').forEach(tagsInput);
            }

            $scope.selectTag = function(tag) {
                var i = array.length;
                array[i - 1] = tag;
            }

            $scope.loadAllHashtag = function() {
                partnerPostService.loadAllHashtag()
                    .then(function(response) {
                        $rootScope.hashtags = response.data;
                    }, function(error) {
                        console.log(error);
                    });
            }

            $scope.showTags = function() {
                var array = $scope.listTag.split(',');
                $scope.obj = [];
                for (var i = 0; i < array.length; i++) {
                    $scope.obj.push({
                        tag: array[i]
                    });
                }
            }

            $rootScope.currentPage = $state.current.url;
            $scope.partnerPost = [];
            $scope.image = false;
            $scope.myImage = '';
            $scope.myCroppedImage = '';
            $scope.input = "";
            $scope.edit_post = false;
            var handleFileSelect = function(evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function(evt) {
                    $scope.$apply(function($scope) {
                        $scope.myImage = evt.target.result;
                    });
                };
                $scope.image = true;
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

            $scope.upload = function() {
                $scope.req = {
                    image: $scope.myCroppedImage.replace(/^data:image\/(png|jpeg);base64,/, "")
                };
                partnerPostService.uploadImg($cookies.get('partnerID'), $scope.req)
                    .then(function(data) {
                        $scope.pic = true;
                        $scope.res = data.data;
                    }, function(error) {
                        console.log(error.toString());
                    });
            }

            // convert file to base64
            $scope.data = {};
            $scope.click = function() {
                $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
            }

            var fileSelect = document.createElement('input');
            fileSelect.type = 'file';

            if (fileSelect.disabled) {
                return;
            }

            $scope.click = function() {
                fileSelect.click();
            }

            fileSelect.onchange = function() {
                var f = fileSelect.files[0],
                    r = new FileReader();

                r.onloadend = function(e) {
                    $scope.ima = e.target.result;
                    $scope.$apply();
                };
                r.readAsDataURL(f);

            };
            $scope.convert = function() {
                //
            };
            $scope.loadPost = function() {
                partnerPostService.loadPost($cookies.get('partnerID'))
                    .then(function(data) {
                            $scope.partnerPost = data.data;
                        },
                        function(error) {
                            console.log(error);
                            console.log('ko the load all Post of a partner');
                        })
            };


            $scope.renderSlider = function() {
                partnerPostService.loadLatestPost(1, 3)
                    .then(function(response) {
                        $scope.slidePost = response.data.content;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createAPost = function() {
                if ($scope.tags != "" && $scope.tags != undefined) {
                    var array = $scope.tags.split(',');
                    $scope.obj = [];
                    for (var i = 0; i < array.length; i++) {
                        $scope.obj.push({
                            tag: array[i]
                        });

                    }
                }
                $scope.request = {
                    image: $scope.ima.replace(/^data:image\/(png|jpeg);base64,/, ""),
                    content: $scope.post.content,
                    datePost: Date.now(),
                    describePost: $scope.post.describePost,
                    hashtagDTO: $scope.obj,
                    partnerContactId: $scope.input.partnerContactId,
                    requiredNumber: $scope.post.requiredNumber,
                    title: $scope.post.title,
                    startDate: new Date($scope.post.startDate).getTime() / 1000,
                    expityTime: new Date($scope.post.expityTime).getTime() / 1000
                };
                partnerPostService.createAPost($cookies.get('partnerID'), $scope.request)
                    .then(function(response) {
                            $window.location.href = $rootScope.clientAdd + '/#/post/' + response.data.id;
                        },
                        function(error) {
                            console.log(error);
                        });
            };

            $scope.changeTime = function() {
                $scope.post.startDate = new Date($scope.post.startDate).getTime() / 1000;
            }

            $scope.editAPost = function(id) {
                if ($scope.ima.indexOf("data:image") == -1) {
                    $scope.request = {
                        image: $scope.ima,
                        content: $scope.post.content,
                        describePost: $scope.post.describePost
                    };
                } else {
                    $scope.request = {
                        image: $scope.ima.replace(/^data:image\/(png|jpeg);base64,/, ""),
                        content: $scope.post.content,
                        describePost: $scope.post.describePost
                    };
                }

                partnerPostService.editAPost(id, $scope.request)
                    .then(function() {
                            alert("Sửa thông tin thành công");
                            $location.path('/post/' + id);
                        },
                        function(error) {
                            console.log(error);
                        })
            };

            $scope.editPost = function(post) {
                $rootScope.editPost = post;
            };

            $scope.edit = function() {
                $scope.post = [];
                if ($rootScope.editPost != null) {
                    $scope.post.content = $rootScope.editPost.content;
                    $scope.post.describePost = $rootScope.editPost.describePost;
                    $scope.ima = $rootScope.clientAdd + $rootScope.editPost.image;
                    $scope.post.id = $rootScope.editPost.id;
                    $scope.edit_post = true;
                    delete $rootScope.editPost;
                }
            };

            $scope.deleteAPost = function(id) {
                partnerPostService.deleteAPost(id)
                    .then(function() {
                            alert("Xóa thành công");
                            $location.path("/partner/post")
                            $scope.loadPost();
                        },
                        function(error) {
                            console.log(error);
                        })
            };

            $scope.post = [];
            var date = new Date();
            date.setDate(date.getDate() - 1);
            date = date.getTime();
            $scope.today = date;
            $scope.showAPost = function(id) {
                partnerPostService.showAPost(id)
                    .then(function(data) {
                            if (data.data == "") {
                                $location.path('/404');
                            } else {
                                $scope.post = data.data;
                                if (data.data.expiryTime < date) {
                                    $scope.expiry = true;
                                } else {
                                    $scope.expiry = false;
                                }
                            }
                        },
                        function(error) {
                            $scope.error = error;
                        })
            };

            $scope.follow = function(postId, postTitle) {
                $scope.loading = true;
                $scope.request = {
                    studentName: $rootScope.username,
                    postTitle: postTitle
                };
                partnerPostService.follow(postId, $scope.request)
                    .then(function() {
                        $scope.subs = true;
                        $scope.loading = false;
                    }, function(error) {
                        console.log(error);
                        $scope.loading = false;
                        if (error.data.message == 'Please fill all your information in profile!' || error.data.message == 'Post followed') {
                            $scope.alertDanger(error.data.message, "");
                        } else if (error.data.message == "Out of date") {
                            $scope.alertDanger("Không thể đăng ký vì bạn chưa đăng ký thực tập trong thời gian " +
                                $rootScope.internship.internshipTerm.startDate + " đến " +
                                $rootScope.internship.internshipTerm.expiredDate, "");
                        }

                    });

            };

            $scope.unfollow = function(postId, type, postTitle = null, index) {
                $scope.loading = true;
                if ($scope.researchPostId != undefined) {
                    $('#close_unfollow').trigger('click');
                }
                var followDTO = {
                    studentId: 0
                }
                if (postTitle != null) {
                    followDTO.postTitle = postTitle;
                }
                partnerPostService.unfollow(postId, $cookies.get('studentId'), followDTO)
                    .then(function() {
                        $scope.getCurrentInternshipOfInternshipTerm();
                        if (type == 'registration') {
                            $window.location.href = $rootScope.clientAdd;
                        }
                        $scope.subs = false;
                        $scope.loading = false;
                        if ($scope.researchPostId != undefined) {
                            $scope.checkFollow($scope.researchPostId);
                        }
                        if (type == 'unregist_internship') {
                            if (index != undefined) {
                                $rootScope.internship.follows.splice(index, 1);
                                console.log($rootScope.internship.follows);
                            }
                        }
                    }, function(error) {
                        if (error.data.message == 'Cannot unfollow!') {
                            alert('Cannot unfollow!');
                        }
                        $scope.loading = false;
                        if (type == 'registration') {
                            $scope.inputNewPartner = {};
                            $scope.removeAttr("readonly", "inputNewPartner")
                        }
                    });

            };

            $scope.addAttr = function(attr, className) {
                $('.' + className).attr(attr, attr);
            }

            $scope.removeAttr = function(attr, className) {
                $('.' + className).removeAttr(attr);
            }

            $scope.checkFollow = function(postId, type, postTitle = null) {
                $scope.request = {};
                if (postTitle != null) {
                    $scope.request.postTitle = postTitle;
                }
                $scope.request.postId = postId;

                partnerPostService.checkFollow(postId, $scope.request)
                    .then(function(response, t = type) {
                        console.log(postTitle, response.data);
                        if (response.data.id == 0) {
                            $scope.subs = false;
                            if (t == 'registration') {
                                $scope.subsRegistration = "false";
                                $scope.inputNewPartner = {};
                                $scope.inputNewPartner.message = "Điền thông tin đơn vị bạn đang thực tập";

                            }
                        } else {
                            $scope.subs = true;
                            $scope.lecturersName = response.data.lecturersName;
                            if (t == 'registration') {
                                $scope.subsRegistration = "true";
                                $scope.inputNewPartner = response.data.partner;
                                $scope.addAttr('readonly', 'inputNewPartner');
                                $scope.inputNewPartner.message = "Bạn đã đăng kí thực tập tại đơn vị";
                            } else if (t === 'registration_fit') {
                                $scope.subsRegistrationFit = "true";
                                $scope.registrationFit = response.data.partner;
                            }
                        }
                        $timeout(function() {
                            $scope.$apply();
                        });
                    }, function(error) {
                        console.log(error);
                    });
            };

            $scope.reload = function() {
                $window.location.reload();
            };

            $scope.showListFollower = function(postId) {
                $scope.listFollower = [];
                partnerPostService.showListFollower(postId)
                    .then(function(response) {
                        $scope.listFollower = response.data;
                    }, function(error) {
                        console.log(error);
                    });
            };
            $scope.showFollowedPost = function() {
                $scope.posts = [];
                partnerPostService.showFollowedPost($cookies.get('studentId'))
                    .then(function(response) {
                        $scope.posts = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getResearchPost = function() {
                partnerPostService.loadLatestPost(0, 1, 'Research')
                    .then(function(response) {
                        console.log(response);
                        if (response.data.content.length != 0) {
                            $scope.researchPost = response.data.content[0];
                            $scope.researchPostId = $scope.researchPost.id;
                            $scope.checkFollow($scope.researchPostId);
                            console.log($scope.researchPost);
                        }
                    })

            }

            $scope.getFitPost = function(page) {
                $scope.page = page;
                partnerPostService.loadLatestPost(page - 1, 9, 'Recruitment')
                    .then(function(response) {
                        $scope.allPosts = response.data.content;
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

            $scope.getOtherPost = function(page) {
                $scope.page = page;
                partnerPostService.loadLatestPost(page - 1, 2, 'Recruitment_other')
                    .then(function(response) {
                        $scope.allPosts = response.data.content;
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

            $scope.showLastestPost = function() {
                if ($stateParams.page) {
                    $scope.activePage = $stateParams.page;
                    partnerPostService.loadLatestPost($stateParams.page - 1, 9)
                        .then(function(response) {
                            $scope.allPosts = response.data.content;
                            $scope.pages = [];
                            var page = response.data.totalPages;
                            for (var i = 1; i <= page; i++) {
                                if (i == $stateParams.page) {
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
                                if ($stateParams.page == page) {
                                    $scope.nextPage = {
                                        class: "disabled",
                                        page: page
                                    };
                                } else {
                                    $scope.nextPage = {
                                        class: "",
                                        page: parseInt($stateParams.page) + 1
                                    };
                                }
                                if ($stateParams.page == 1) {
                                    $scope.previousPage = {
                                        class: "disabled",
                                        page: 1
                                    };
                                } else {
                                    $scope.previousPage = {
                                        class: "",
                                        page: $stateParams.page - 1
                                    };
                                }

                            }
                        }, function(error) {
                            console.log(error);
                        })
                } else {
                    partnerPostService.loadLatestPost(0, 3)
                        .then(function(response) {
                            $scope.allPosts = response.data.content;
                            $scope.pages = [];
                            var page = response.data.totalPages;
                            for (var i = 1; i <= page; i++) {
                                if (i == 1) {
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
                            }
                            $scope.nextPage = {
                                class: "",
                                page: 2
                            };
                            $scope.previousPage = {
                                class: "disabled",
                                page: 1
                            };
                        }, function(error) {
                            console.log(error);
                        })
                }
            }
            var init = function() {
                if ($stateParams.postId) {
                    $scope.postSelected = $stateParams.postId;
                }
            };
            init();

            $scope.alertWarning = function(warning, timeout) {
                $scope.warningMessage = warning;
                $scope.warning = true;
                $timeout(function() {
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

            $scope.clearAngucompleteAltInput = function(id) {
                $scope.$broadcast('angucomplete-alt:clearInput', id)
            }
        }
    ])
}());
