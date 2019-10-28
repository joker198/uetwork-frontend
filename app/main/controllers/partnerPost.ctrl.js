(function() {
    var app = angular.module("partnerPost", []);
    app.controller('partnerPostCtrl', ['$scope', 'partnerPostService', '$rootScope',
        '$stateParams', '$route', '$location', '$window', '$cookies', '$state', 'partnerContactService', '$timeout',
        function($scope, partnerPostService, $rootScope, $stateParams, $route, $location, $window, $cookies, $state, partnerContactService, $timeout) {

            $scope.getPartnerNameAndIdOfOtherPartner = function() {
                partnerPostService.getPartnerNameAndIdOfOtherPartner()
                    .then(function(response) {
                        // console.log(response.data);
                        $scope.nameAndIdOther = response.data;
                    })
            }

            $scope.getPartnerNameAndIdOfFitPartner = function() {
                partnerPostService.getPartnerNameAndIdOfFitPartner()
                    .then(function(response) {
                        // console.log(response.data);
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
                    console.log($scope.req)
                    partnerPostService.registerPartner($scope.req)
                        .then(function(response) {
                            $scope.alertSuccess('Đăng kí công ty thực tập thành công. ' +
                                'Hãy chờ thông báo phê duyệt công ty trong mục tin nhắn hoặc kiểm tra trong mục "Thông tin thực tập"', '', true);
                            // $scope.mess = ;
                            // $timeout(function() {
                            //     $('#showModalMess').trigger('click');
                            // });
                            $scope.getCurrentInternshipOfInternshipTerm();
                            $scope.clearAngucompleteAltInput('findPartner');
                            $scope.checkFollow(0, 'registration', "Recruitment_other");
                        }, function(error) {
                            console.log(error.data.message);
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
                    console.log($scope.req)
                    partnerPostService.registerPartner($scope.req)
                        .then(function(response) {
                            $scope.alertSuccess('Đăng kí công ty thực tập thành công. ', '', true);
                            // $scope.mess = ;
                            // $timeout(function() {
                            //     $('#showModalMess').trigger('click');
                            // });

                            $scope.getCurrentInternshipOfInternshipTerm();
                            $scope.clearAngucompleteAltInput('findFitPartner');
                            $scope.checkFollow(0, 'registration_fit', "Recruitment");
                        }, function(error) {
                            console.log(error.data.message);
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
                            // $scope.mess = ;
                            // $timeout(function() {
                            //     $('#showModalMess').trigger('click');
                            // });
                            $scope.getCurrentInternshipOfInternshipTerm();
                            $scope.clearAngucompleteAltInput('findPartner');
                            $scope.checkFollow(0, 'registration');
                        }, function(error) {
                            console.log(error.data.message);
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
                // console.log($scope.nameAndIdOfLecturers.selected);
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
                        console.log(response.data)
                        $scope.partnerContacts = response.data;
                    }, function(error) {
                        console.log(error);
                    });
            }

            $scope.initTag = function() {
                let $ = s => [].slice.call(document.querySelectorAll(s));

                // log events as they happen:
                let t = $('#tags')[0];
                t.addEventListener('input', log);
                t.addEventListener('change', log);

                function log(e) {
                    $scope.tags = `${this.value.replace(/,/g,', ')}`;
                    // alert(`${e.type}`);
                    if (`${e.type}` == 'input') {
                        // console.log(`${this.value.replace(/,/g,', ')}`);
                        $scope.array = [];
                        $scope.array = `${this.value.replace(/,/g,', ')}`.split(', ');
                        // console.log(array);
                        var i = $scope.array.length;
                        $scope.lastTag = $scope.array[i - 1];
                        console.log($scope.lastTag);
                    }
                    // $('#out')[0].textContent = `${this.value.replace(/,/g,', ')}`;
                }

                // hook 'em up:
                $('input[type="tags"]').forEach(tagsInput);
            }

            $scope.selectTag = function(tag) {
                var i = array.length;
                array[i - 1] = tag;
            }

            $scope.loadAllHashtag = function() {
                partnerPostService.loadAllHashtag()
                    .then(function(response) {
                        console.log(response);
                        $rootScope.hashtags = response.data;
                        console.log($scope.hashtags);
                    }, function(error) {
                        console.log(error);
                    });
            }

            $scope.showTags = function() {
                // $scope.tag = $('#tags').val();
                var array = $scope.listTag.split(',');
                // var
                $scope.obj = [];
                for (var i = 0; i < array.length; i++) {
                    $scope.obj.push({
                        tag: array[i]
                    });

                }
                // $scope.tags = $scope.tags + "}";
                // $scope.tags = angular.fromJson($scope.tags);
                console.log($scope.obj);
                // var obj = {};
                // for (var i = 0; i < array.length; i++) {
                //     var split = array[i].split(':');
                //     obj[split[0].trim()] = split[1].trim();
                // }

                // console.log(array);
            }

            $rootScope.currentPage = $state.current.url;
            $scope.partnerPost = [];
            // alert(indexPost);
            $scope.image = false;
            //crop anh
            // $scope.pic = false;
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
                        console.log(data);
                        $scope.pic = true;
                        $scope.res = data.data;
                    }, function(error) {
                        console.log(error.toString());
                    });
            }
            // convert file to base64
            $scope.data = {}; //init variable
            $scope.click = function() { //default function, to be override if browser supports input type='file'
                $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
            }

            var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
            fileSelect.type = 'file';

            if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
                return;
            }

            $scope.click = function() { //activate function to begin input file on click
                fileSelect.click();
            }

            fileSelect.onchange = function() { //set callback to action after choosing file
                var f = fileSelect.files[0],
                    r = new FileReader();

                r.onloadend = function(e) { //callback after files finish loading

                    $scope.ima = e.target.result;
                    $scope.$apply();
                };

                r.readAsDataURL(f); //once defined all callbacks, begin reading the file

            };
            $scope.convert = function() {
                // $scope.encoded = $base64.encode("$scope.input");
                // console.log($scope.ima);
                // = ima;
                // $scope.post.content = "a";
            };
            $scope.loadPost = function() {
                partnerPostService.loadPost($cookies.get('partnerID'))
                    .then(function(data) {
                            $scope.partnerPost = data.data;
                            // console.log($scope.partnerPost);
                            // angular.forEach($scope.partnerPost, function(v){
                            //     console.log($filter('date')(v.datePost, "yyyy-MM-dd"));
                            //     // $filter('date')(v.datePost, "yyyy-MM-dd");
                            // })
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
                        // $scope.slider = ''
                        //     + '<!-- Homepage Slider -->'
                        //     + '< div class = "homepage-slider" >'
                        //         + '< div id = "sequence" >'
                        //             + '<ul class="sequence-canvas">';
                        //     //         + '< div class = "sequence-pagination-wrapper" >'
                        //     //             + '< ul class = "sequence-pagination" >'
                        //     //             + '< li > 1 < /li> < li > 2 < /li> < li > 3 < /li>'
                        //                 // +< /ul> '
                        //     //         + '< /div> '
                        //     //     + '< /div> '
                        //     // + '< /div>'
                        //     // + '<!-- End Homepage Slider -->';
                        // angular.forEach(response.data, function(post){
                        //     $scope.slider = $scope.slider + ''
                        //         + '<li class="bg4">'
                        //             + '<h2 class="title">Cơ hội làm việc dễ dàng</h2>'
                        //             + '<h3 class="subtitle">Trường Đại học Công nghệ khai giảng năm học 2016-2017</h3>'
                        //             + '<img class="slide-img" src="img/service-icon/title2.png" alt="Slide 1" />'
                        //         + '</li>';
                        // });
                        // $scope.slider = $scope.slider + ''
                        //     + '< /ul>'
                        //         + '< div class = "sequence-pagination-wrapper" >'
                        //             + '< ul class = "sequence-pagination" >'
                        //             + '< li > 1 < /li> < li > 2 < /li> < li > 3 < /li>'
                        //             + '< /ul> '
                        //         + '< /div> '
                        //     + '< /div> '
                        //     + '< /div>'
                        //     + '<!-- End Homepage Slider -->';

                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createAPost = function() {
                if ($scope.tags != "" && $scope.tags != undefined) {
                    var array = $scope.tags.split(',');
                    // var
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
                            //console.log(response.data);
                            // alert("Tạo thành công");
                            // $scope.loadPost();
                            $window.location.href = $rootScope.clientAdd + '/#/post/' + response.data.id;
                        },
                        function(error) {
                            console.log(error);
                        });
                // } else {
                //     alert("Chưa có tag!");
                // }



            };

            $scope.changeTime = function() {
                $scope.post.startDate = new Date($scope.post.startDate).getTime() / 1000;
                console.log($scope.post.startDate);
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
                            // $scope.showAPost(id);
                            $location.path('/post/' + id);
                        },
                        function(error) {
                            //console.log("Ko the edit")
                        })
            };
            //$rootScope.editPost = [];
            $scope.editPost = function(post) {
                // console.log(post);
                $rootScope.editPost = post;
                //$cookies.get(setItem('editPost', post);
            };

            $scope.edit = function() {
                $scope.post = [];
                // alert(1);
                // console.log($rootScope.editPost);
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
                            //console.log("Ko the delete")
                        })
            };

            $scope.post = [];
            var date = new Date();
            date.setDate(date.getDate() - 1);
            date = date.getTime();
            $scope.today = date;
            $scope.showAPost = function(id) {

                //$cookies.get(setItem('postId',id);
                //$rootScope.postID=id;
                partnerPostService.showAPost(id)
                    .then(function(data) {
                            // alert(1);

                            if (data.data == "") {
                                $location.path('/404');
                            } else {
                                // console.log(data.data.expiryTime);
                                $scope.post = data.data;

                                // console.log(date);
                                if (data.data.expiryTime < date) {
                                    $scope.expiry = true;
                                } else {
                                    $scope.expiry = false;
                                }
                                console.log($scope.expiry);
                            }

                            //$window.location.href = $rootScope.clientAdd + '/#/post/'+id;
                        },
                        function(error) {
                            // alert(2);
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
                        // console.log(error);
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
                    //chỗ này làm thế này vì ở code server check student id, nhưng thực ra là ko cần vì 
                    // có thể tìm student id thông qua token.
                    studentId: 0
                }
                if (postTitle != null) {
                    followDTO.postTitle = postTitle;
                }
                partnerPostService.unfollow(postId, $cookies.get('studentId'), followDTO)
                    .then(function() {
                        $scope.getCurrentInternshipOfInternshipTerm();
                        if (type == 'registration') {
                            // $scope.inputNewPartner = {};
                            // $scope.addAttr('readonly', 'inputNewPartner');
                            // $scope.removeAttr("readonly", "inputNewPartner");
                            // $scope.getPartnerNameAndId();
                            $window.location.href = $rootScope.clientAdd;
                        }
                        $scope.subs = false;
                        $scope.loading = false;
                        if ($scope.researchPostId != undefined) {
                            // $('#close_unfollow').trigger('click');
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
                        // if ($scope.researchPostId != undefined) {
                        //     $('#close_unfollow').trigger('click');
                        // }
                        $scope.loading = false;
                        // console.log(error);
                        if (type == 'registration') {
                            $scope.inputNewPartner = {};
                            // $scope.addAttr('readonly', 'inputNewPartner');
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
                // if(postId != undefined){
                $scope.request.postId = postId;
                // } else {}

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

                        // console.log($scope.subs);
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
                        // console.log(response.data);
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
                            //chỗ này lấy ở 1 vì là get bài là research, mà mỗi 1 kì chỉ có 
                            // 1 bài research, nhưng mà ở trên server lười sửa code get nên làm theo kiểu này
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
                        // console.log(response);
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

            $scope.getOtherPost = function(page) {
                $scope.page = page;
                partnerPostService.loadLatestPost(page - 1, 2, 'Recruitment_other')
                    .then(function(response) {
                        // console.log(response);
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

            $scope.showLastestPost = function() {
                if ($stateParams.page) {
                    // alert($stateParams.page);
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
                                // console.log(i);                                
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
                            // console.log(error);
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
                            // console.log($scope.pages);
                            // console.log(response.data);
                        }, function(error) {
                            // console.log(error);
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