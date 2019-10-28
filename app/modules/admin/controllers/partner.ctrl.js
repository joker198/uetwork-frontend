(function() {
    "use strict";
    var app = angular.module("partner", []);
    angular.module('partner')
        .controller('partnerCtrl', ['filterFilter', '$window', '$scope', 'partnerService', 'studentService', '$location', '$rootScope',
            '$timeout', '$stateParams', 'messageService', 'md5', '$state',
            function(filterFilter, $window, $scope, partnerService, studentService, $location, $rootScope, $timeout, $stateParams, messageService, md5, $state) {
                $rootScope.currentPageName = $state.current.name;
                $scope.loadPartner = true;
                $scope.partnersRole = [
                    { role: 'VIP_PARTNER' },
                    { role: 'NORMAL_PARTNER' }
                    // {role:'OTHER'}
                ];
                $scope.post = {};
                $scope.role = $scope.partnersRole[0];
                $scope.editIma = false;
                $scope.request = {};
                $scope.editPostTimeModal = {};
                $scope.search = "";
                $scope.partner = {};
                $scope.input = {};
                // $rootScope.postType = 'Recruitment';
                $rootScope.currentPageName = $state.current.name;
                console.log($rootScope.currentPageName);

                $scope.acceptPartner = function() {
                    $scope.listAcceptPartner = [];
                    angular.forEach($scope.allWaitPartner, function(partner) {
                        if (partner.checked === true) {
                            partner.status = null;
                            $scope.listAcceptPartner.push(partner);
                        }
                    })
                    console.log($scope.listAcceptPartner);
                    partnerService.acceptPartner($scope.listAcceptPartner)
                        .then(function() {
                            $scope.alertSuccess("Thành Công!", '');
                            $scope.getAllWaitpartner();
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.notAcceptPartner = function() {
                    $scope.listAcceptPartner = [];
                    angular.forEach($scope.allWaitPartner, function(partner) {
                        if (partner.checked === true) {
                            partner.status = "false";
                            $scope.listAcceptPartner.push(partner);
                        }
                    })
                    partnerService.acceptPartner($scope.listAcceptPartner)
                        .then(function() {
                            $scope.alertSuccess("Thành Công!", '');
                            $scope.getAllWaitpartner();
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.getAllWaitpartner = function() {
                    partnerService.getAllWaitpartner()
                        .then(function(response) {
                            console.log(response);
                            $scope.allWaitPartner = response.data;
                            angular.forEach($scope.allWaitPartner, function(partner) {
                                partner.checked = false;
                            })
                            $scope.totalItems = response.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.allWaitPartner, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.editPartner = function(partner) {
                    $scope.Partner = partner;
                    console.log(partner);
                }

                $scope.editPartnerInfo = function() {
                    $('#close_edit_partnerInfo').trigger('click');
                    partnerService.editPartner($scope.Partner.id, $scope.Partner)
                        .then(function() {
                            $scope.alertSuccess("Sửa thông tin đối tác thành công!", "");
                            $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }

                $scope.deletePartner = function(partnerId) {
                    $('#close_modal_delete_partner').trigger('click');
                    partnerService.deletePartner(partnerId)
                        .then(function() {
                            $scope.alertSuccess("Xóa partner thành công!", "");
                            if ($rootScope.currentPageName == '/fit-partner') {
                                $scope.getFitPartner();
                            }
                            if ($rootScope.currentPageName == '/other-partner') {
                                $scope.getOtherPartner();
                            }
                            // $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }

                // 

                $scope.showFollow = function(follows) {
                    $scope.modelFollows = follows;
                }

                $scope.getAllFollows = function() {
                    partnerService.getAllFollows()
                        .then(function(response) {
                            console.log(response.data);
                            $scope.allFollows = response.data;
                            // angular.forEach($scope.allFollows, function(follow){
                            //     follow.checked = false;
                            // });
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.showPartnerContact = function(partner) {
                    alert(1);
                    console.log(partner);
                    if (partner != "") {
                        $scope.partnerContacts = JSON.parse(partner);
                    } else {
                        $scope.partnerContacts = null;
                    }

                    // console.log(JSON.parse(continent));
                }

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
                        $scope.editIma = true;
                        $scope.$apply();
                    };

                    r.readAsDataURL(f); //once defined all callbacks, begin reading the file

                };

                $scope.showPostModal = function(post) {
                    $scope.modalPost = post;
                    console.log(post);
                }

                $scope.editPost = function(post) {
                    $scope.editPostModal = post;
                    if (post.partnerContact != null) {
                        partnerService.findPartnerByContactID(post.partnerContact.id)
                            .then(function(response) {
                                console.log(response);
                                $scope.editPostModal.partner = response.data;
                                // <option value="other"> -- Khác -- </option>
                                // <option value="no"> -- Không có -- </option>
                                $scope.editPostModal.partner.partnerContacts.push({
                                    id: "other",
                                    contactName: "-- Khác --"
                                }, {
                                    id: "no",
                                    contactName: "-- Để trống --"
                                })
                                $scope.editPostModal.partnerContactId = post.partnerContact.id;
                                $timeout(function() {
                                    // 
                                    $scope.$apply();
                                });
                            }, function(error) {
                                console.log(error);
                            })
                    } else {
                        partnerService.findPartnerByPostID(post.id)
                            .then(function(response) {
                                console.log(response);
                                $scope.editPostModal.partner = response.data;
                                // <option value="other"> -- Khác -- </option>
                                // <option value="no"> -- Không có -- </option>
                                $scope.editPostModal.partner.partnerContacts.push({
                                    id: "other",
                                    contactName: "-- Khác --"
                                }, {
                                    id: "no",
                                    contactName: "-- Để trống --"
                                });
                            }, function(error) {
                                console.log(error);
                            })
                    }
                    console.log(post);
                    // $scope.ima = $rootScope.clientAdd + post.image;
                    // $scope.editPostModal.describePost = post.describePost.replace(/<br\s*[\/]?>/g, '\r\n');
                }

                $scope.saveEditPost = function() {
                    if ($scope.editIma == false) {

                    } else {
                        // $scope.request.image = $scope.ima.replace(/^data:image\/(png|jpeg);base64,/, "");
                    }
                    if ($scope.editPostTimeModal.startDate != undefined) {
                        $scope.request.startDate = new Date($scope.editPostTimeModal.startDate).getTime() / 1000;
                    }
                    if ($scope.editPostTimeModal.expiryTime != undefined) {
                        $scope.request.expiryTime = new Date($scope.editPostTimeModal.expiryTime).getTime();
                        // console.log($scope.request.expiryTime);
                    }
                    $scope.request.content = $scope.editPostModal.content;
                    // $scope.request.describePost = $scope.editPostModal.describePost.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $scope.request.hashtagDTO = $scope.obj;
                    $scope.request.requiredNumber = $scope.editPostModal.requiredNumber;
                    $scope.request.title = $scope.editPostModal.title;
                    if ($scope.editPostModal.partnerContact.id == 'other') {
                        $scope.request.partnerContactDTO = $scope.editPostModal.partnerContactDTO;
                        $scope.request.partnerContactId = 0;
                    } else if ($scope.editPostModal.partnerContact.id == 'no') {
                        $scope.request.partnerContactId = -1;
                    } else {
                        $scope.request.partnerContactId = $scope.editPostModal.partnerContact.id
                    }

                    partnerService.editPost($scope.editPostModal.id, $scope.request)
                        .then(function(response) {
                            $('#close_modal_edit_post').trigger('click');
                            $scope.alertSuccess("Sửa post thành công", "");
                            $scope.loadAllPost();
                            // $state.reload();
                            // $timeout(function() {
                            //     // 
                            //     $state.reload();
                            // });

                        }, function(error) {
                            $('#close_modal_edit_post').trigger('click');
                            $scope.alertDanger("Có lỗi xảy ra, hãy thử lại!", "");
                        })
                }


                $scope.createPost = function() {
                    if ($scope.post.postType != "") {
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
                        if ($scope.post.postType == 'Research') {
                            // for(var i = 0; i <= $scope.fitPartners.length - 1; i++){
                            //     if($scope.fitPartners[i].partnerName.indexOf('CNTT') != -1){
                            //         $scope.Partner = $scope.fitPartners[i];
                            //         break;
                            //     }
                            // }
                            $scope.Partner = $scope.cntt;
                            // $scope.post.partnerContactId = 'no';
                        }
                        console.log($scope.post);
                        if ($scope.post.partnerContactId == 'other') {
                            $scope.post.partnerContactId = 0;
                        } else if ($scope.post.partnerContactId == 'no') {
                            $scope.post.partnerContactId = -1;
                        } else {
                            $scope.post.partnerContactDTO = null;
                        }
                        if ($scope.post.partner == 'other') {
                            $scope.partnerId = -1
                            $scope.post.partnerContactDTO = $scope.input.partnerContactDTO;
                        } else {
                            $scope.partnerId = $scope.Partner.id;
                            $scope.input.partner = null;
                            // angular.forEach($scope.Partner.partnerContacts, function(contact) {
                            //     $scope.post.partnerContactId = contact.id;
                            // });

                        }
                        $scope.request = {
                            // image: $scope.ima.replace(/^data:image\/(png|jpeg);base64,/, ""),
                            content: $scope.post.content,
                            datePost: Date.now(),
                            // describePost: $scope.post.describePost.replace(/(?:\r\n|\r|\n)/g, '<br />'),
                            hashtagDTO: $scope.obj,
                            partnerContactId: $scope.post.partnerContactId,
                            requiredNumber: $scope.post.requiredNumber,
                            title: $scope.post.title,
                            // startDate: new Date($scope.post.startDate).getTime() / 1000,
                            expiryTime: new Date($scope.post.expiryTime).getTime(),
                            partnerContactDTO: $scope.post.partnerContactDTO,
                            partner: $scope.input.partner,
                            postType: $scope.post.postType
                        };
                        // console.log($scope.request);
                        if ($scope.request.postType != undefined && $scope.partnerId != undefined) {

                            console.log($scope.partnerId);
                            console.log($scope.request);
                            partnerService.createPost($scope.partnerId, $scope.request)
                                .then(function(response) {
                                        // $('#close_create_post').trigger('click');
                                        // alert()
                                        $scope.alertSuccess("Thêm post thành công", "");
                                        $scope.loadAllPost();
                                        $scope.Partner = undefined;
                                        $scope.post = {};
                                        //console.log(response.data);
                                    },
                                    function(error) {
                                        console.log(error);
                                        $scope.alertDanger(error.data.message, "");
                                    });
                        }

                    }

                };

                $scope.loadAllPostByInternshipTerm = function() {
                    if ($stateParams.internshipTermId) {
                        partnerService.loadAllPostByInternshipTerm($stateParams.internshipTermId)
                            .then(function(response) {
                                console.log(response);
                                $scope.allPosts = response.data;
                            }, function(error) {
                                console.log(error);
                            });
                    }
                }

                // $scope.changePostTypeAndGetPost = function(postType){
                //     $scope.postType
                // }



                $scope.loadAllPost = function(postType, stateParams) {
                    if (stateParams != undefined) {
                        $state.transitionTo('/post/page=:page', { page: 1 }, { location: true, notify: false });
                        $stateParams.page = 1;
                    }
                    if ($stateParams.page) {
                        if (postType != undefined) {
                            // $rootScope.postType = postType;
                            sessionStorage.setItem('postType', postType);
                            $rootScope.postType = postType;
                        }
                        // sessionStorage.setItem('studentId', response.data.studentId);
                        if (sessionStorage['postType'] == undefined) {
                            // $rootScope.postType = 'Recruitment';
                            sessionStorage.setItem('postType', 'Recruitment');
                        }
                        if ($rootScope.postType == undefined) {
                            $rootScope.postType = sessionStorage['postType'];
                        }
                        // console.log($rootScope.postType);
                        // alert($stateParams.page);
                        $scope.activePage = $stateParams.page;
                        partnerService.loadLatestPost($stateParams.page - 1, 15, sessionStorage['postType'])
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
                                // console.log($scope.previousPage);
                                // console.log($scope.pages);
                                console.log(response.data);
                            }, function(error) {
                                console.log(error);
                            })
                    }
                }

                $scope.selectPartner = function(partner) {
                    if (partner != "" && partner != 'other') {
                        $scope.Partner = JSON.parse(partner);
                        console.log($scope.Partner);
                    } else if (partner == 'other') {
                        $scope.input = {};
                    } else {
                        $scope.partnerContact = null;
                    }
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
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                    }
                }

                $scope.getOtherPartner = function() {
                    partnerService.getOtherPartner()
                        .then(function(response) {
                            $scope.otherPartners = response.data;
                            $scope.partners = response.data;
                            $scope.totalItems = response.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.otherPartners, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        })
                }

                $scope.getFitPartner = function() {
                    partnerService.getFitPartner()
                        .then(function(response) {
                            console.log(response);
                            $scope.fitPartners = response.data;
                            $scope.partners = response.data;
                            $scope.totalItems = response.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.fitPartners, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                            for (var i = 0; i <= $scope.fitPartners.length - 1; i++) {
                                if ($scope.fitPartners[i].partnerName.indexOf('CNTT') != -1) {
                                    $scope.cntt = $scope.fitPartners[i];
                                    break;
                                }
                            }
                        })
                }

                $scope.loadAllPartner = function() {
                    $scope.loadPartner = true;
                    partnerService.loadAllPartner()
                        .then(function(data) {
                            console.log(data);
                            $scope.partners = data.data;
                            $scope.totalItems = data.data.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10;
                            if ($scope.entryLimit > $scope.totalItems) {
                                $scope.entryLimit = $scope.totalItems;
                            }
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                            $scope.$watch('search', function(newVal, oldVal) {
                                $scope.filtered = filterFilter($scope.partners, newVal);
                                $scope.totalItems = $scope.filtered.length;
                                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                                $scope.currentPage = 1;
                            }, true);
                        });

                };

                $scope.deletePost = function(postId) {
                    partnerService.deletePost(postId)
                        .then(function() {
                            $('#close_modal_delete_post').trigger('click');
                            $scope.alertSuccess("Xóa post thành công!", "");
                            $scope.loadAllPost();
                        }, function(error) {
                            console.log(error);
                            $('#close_modal_delete_post').trigger('click');
                            $scope.alertDanger("Có lỗi xảy ra, hãy reload và thử lại!", "");
                        })
                }

                $scope.deletePartnerContact = function(contactId) {
                    $('#close_modal_delete_partner_contact').trigger('click');
                    // console.log($scope.partnerId);
                    partnerService.deletePartnerContact(contactId)
                        .then(function() {
                            $scope.alertSuccess("Xóa liên hệ thành công!", "successdelete_edit");
                            $('#tr_contact_' + contactId).remove();
                            // console.log($scope.partnerId);
                            $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "danger");
                        })
                }
                // contactName_{{contact.id}}
                // email{{contact.id}}
                // phone{{contact.id}
                // skype{{contact.id}}
                // about{{contact.id}}
                $scope.editContact = function(contactId) {
                    console.log(contactId);
                    // $('#contact_' + contactId).html('<div class="col-md-4 col-sm-4 col-xs-6">' + 
                    //     '<input type="text" name="country" class="form-control col-md-6" ng-model="' + contactName + '" required /></div>');
                    var contactName = $('#contactName_' + contactId).text();
                    $('#contactName_' + contactId).html('<input id="contactName_value_' + contactId + '" value="' + contactName + '" style="border-radius:3px; border: 1px solid;" ng-keydown="editContactEnter($event, ' + contactId + ')"/>');

                    var email = $('#email_' + contactId).text();
                    $('#email_' + contactId).html('<input id="email_value_' + contactId + '" value="' + email + '" style="border-radius:3px; border: 1px solid;" ng-keydown="editContactEnter($event, ' + contactId + ')"/>');

                    var phone = $('#phone_' + contactId).text();
                    $('#phone_' + contactId).html('<input id="phone_value_' + contactId + '" value="' + phone + '" style="border-radius:3px; border: 1px solid; width: 70%;" ng-keydown="editContactEnter($event, ' + contactId + ')"/>');

                    var skype = $('#skype_' + contactId).text();
                    $('#skype_' + contactId).html('<input id="skype_value_' + contactId + '" value="' + skype + '" style="border-radius:3px; border: 1px solid; width: 70%;" ng-keydown="editContactEnter($event, ' + contactId + ')"/>');

                    // var about = $('#about' + contactId).text();
                    // $('#about_' + contactId).html('<input id="about_value_' + contactId + '" value="' + about + '" style="border-radius:3px; border: 1px solid;"/>');

                    $('#edit_contact_' + contactId).hide();
                    $('#save_edit_contact_' + contactId).show();
                }

                $scope.editContactEnter = function($event, contactId) {
                    console.log(contactId);
                    if ($event.keyCode == 13) {
                        // data.editEmail = data.stt;
                        console.log(contactId);
                        $('#save_edit_contact_' + contactId).trigger('click');
                    }
                }

                $scope.saveEditContact = function(contactId) {
                    var contactName = $('#contactName_value_' + contactId).val();
                    var email = $('#email_value_' + contactId).val();
                    var phone = $('#phone_value_' + contactId).val();
                    var skype = $('#skype_value_' + contactId).val();
                    // console.log(v);
                    $scope.request = {
                        contactName: contactName,
                        email: email,
                        phone: phone,
                        skype: skype
                    }
                    // console.log($scope.request);
                    partnerService.editPartnerContact(contactId, $scope.request)
                        .then(function() {
                            $('#edit_contact_' + contactId).show();
                            $('#save_edit_contact_' + contactId).hide();
                            $('#contactName_' + contactId).html(contactName);
                            $('#email_' + contactId).html(email);
                            $('#phone_' + contactId).html(phone);
                            $('#skype_' + contactId).html(skype);
                            $scope.alertSuccess('Sửa liên hệ thành công!', 'successdelete_edit');
                            // $scope.getAllContinent();
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, 'danger');
                        })
                }

                $scope.confirmDelete = function(id, name) {
                    console.log(id);
                    $scope.confirmDeleteId = id;
                    $scope.confirmDeleteName = name;
                }

                $scope.createPartner = function() {
                    // console.log($scope.role);
                    $scope.request = {
                        userName: $scope.partner.userName,
                        password: md5.createHash($scope.partner.password || ''),
                        role: $scope.role.role
                    };
                    $scope.partner.password = md5.createHash($scope.partner.password || '');
                    $scope.partner.role = $scope.role.role;
                    console.log($scope.partner);
                    partnerService.createPartner($scope.partner)
                        .then(function(data) {
                            $scope.partner = {};
                            $scope.alertSuccess("Tạo đối tác thành công!", "")
                            $scope.loadAllPartner();
                            // $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger("Có lỗi khi tạo đối tác, hãy reload trang và thử lại!", "")
                            $scope.error = error;
                        })
                };

                $scope.getPartnerNameAndId = function() {
                    partnerService.getPartnerNameAndId('true')
                        .then(function(response) {
                            $scope.partnerNameAndId = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }

                $scope.createPartnerContact = function() {
                    partnerService.createPartnerContact($scope.input.partnerContact.partnerId, $scope.input.partnerContact)
                        .then(function(response) {
                            $scope.input.partnerContact = {};
                            $scope.alertSuccess("Thên liên hệ cho đối tác thành công!", "");
                            $scope.loadAllPartner();
                        }, function(error) {
                            $scope.alertDanger(error.data.message, "");
                        })
                }

                $scope.showPartner = function(data) {
                    $rootScope.partner = data;
                    $location.path('/admin/partner/' + data.partnerId);
                    // console.log($rootScope.partner);
                };

                $scope.setPartnerInfo = function() {
                    // alert(1);
                    // console.log($rootScope.partner);
                    $scope.partnerData = [];
                    $scope.partnerData.partnerName = $rootScope.partner.partnerName;
                    if ($rootScope.partner.status == "A") {
                        $scope.partnerData.status = true;
                    } else {
                        $scope.partnerData.status = false;
                    }
                    // $scope.partnerData.status = $rootScope.partner.status;
                    $scope.partnerData.userId = $rootScope.partner.userId;
                    $scope.partnerData.partnerId = $rootScope.partner.partnerId;
                    // delete $rootScope.partner;
                };

                $scope.changeStatus = function(userId) {
                    studentService.changeStatus(userId)
                        .then(function() {
                            if ($scope.partnerData.status == true) {
                                $scope.partnerData.status = false;
                            } else {
                                $scope.partnerData.status = true;
                            }
                            alert("user status changed");
                        }, function(error) {

                        })
                };

                $scope.showPartnerContact = function(partnerContact, partnerName, partnerId) {
                    $scope.partnerContacts = partnerContact;
                    $scope.partnerName = partnerName;
                    $scope.partnerId = partnerId;
                }

                $scope.loadPartnerContact = function(partnerId, partnerName) {
                    $scope.partnerContact = [];
                    $scope.partnerName = partnerName;
                    partnerService.loadPartnerContact(partnerId)
                        .then(function(response) {
                            console.log(response.data);
                            $scope.partnerContacts = response.data;
                        }, function(error) {
                            console.log(error);
                        })
                };

                $scope.loadAllPartnerPost = function(partnerId) {
                    // if(partnerId != '')

                    $scope.allPartnerPost = [];
                    partnerService.loadAllPartnerPost(partnerId)
                        .then(function(response) {
                            $scope.show_post = false;
                            $scope.allPartnerPost = response.data;
                            angular.forEach($scope.allPartnerPost, function(post) {
                                // console.log(post.id);
                                partnerService.getFollowOfPost(post.id)
                                    .then(function(respone) {
                                        post.follow = respone.data.length;
                                        // console.log(respone.data.length);
                                    })
                            });
                            // console.log($scope.allPost);
                        }, function(error) {
                            console.log(error);
                        })
                };
                $scope.closePost = function() {
                    $scope.show_post = false;
                };

                $scope.showPost = function(post) {
                    $scope.show_post = true;
                    $scope.post = post;
                };

                $scope.loadPartner = function() {
                    if ($rootScope.partner != null) {
                        $scope.setPartnerInfo();
                    } else {
                        partnerService.loadPartner($stateParams.partnerId)
                            .then(function(respone) {
                                console.log(respone.data);
                                $scope.partnerData = [];
                                $scope.partnerData.partnerName = respone.data.partnerName;
                                if (respone.data.status == "A") {
                                    $scope.partnerData.status = true;
                                } else {
                                    $scope.partnerData.status = false;
                                }
                                // $scope.partnerData.status = $rootScope.partner.status;
                                $scope.partnerData.userId = respone.data.userId;
                                $scope.partnerData.partnerId = respone.data.partnerId;
                            })
                    }
                };

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