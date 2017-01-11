var app = angular.module('app', ['ngRoute', 'ngWYSIWYG', 'ngSanitize', 'ngCookies', '720kb.socialshare','ngFileUpload'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'homeCtrl'
            })
            .when('/article/:id', {
                templateUrl: 'articledetails.html',
                controller: 'articleDetailsCtrl'
            })
            .when('/admin/:param/:param2', {
                templateUrl: 'lib/admin/pages/admin.html',
                controller: 'adminCtrl'
            })
            .when('/mainadminpage', {
                templateUrl: 'lib/admin/pages/mainAdminPage.html',
                controller: 'editContentCtrl'
            })
            .when('/addarticle', {
                templateUrl: 'lib/admin/pages/addArticle.html',
                controller: 'addArticleCtrl'
            })
            .when('/editarticle', {
                templateUrl: 'lib/admin/pages/editArticle.html',
                controller: 'editArticleCtrl'
            })
            .when('/categorieshandler', {
                templateUrl: 'lib/admin/pages/categoriesHandler.html',
                controller: 'categoriesHandlerCtrl'
            })
            .when('/commentshandler', {
                templateUrl: 'lib/admin/pages/commentsHandler.html',
                controller: 'commentsHandlerCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .config(['socialshareConfProvider', function configApp(socialshareConfProvider) {

        socialshareConfProvider.configure([
            {
                'provider': 'facebook',
                'conf': {
                    'url': '',
                    'trigger': 'click',
                    'text': 'TEXT',
                    'socialshareTitle': 'TITLE',
                    'caption': 'CAPTION',
                    'socialshareType' : 'send',
                    'description': 'DESCRIPTION',
                    'popupHeight': 600,
                    'popupWidth' : 800
                }
            }
        ]);
    }])
    .service("postDataOfSenderSrv",['$http', '$rootScope', 'checkName', 'checkEmail', 'checkText', function($http, $rootScope, checkName, checkEmail, checkText){
        this.resultValidationName = [];
        this.resultValidationEmail = [];
        this.resultValidationText = [];
        //this.showFormConfirmation = function(){
        //    $rootScope.formConfirmation = true;
        //};

        this.callbackSenderName = function(result, inputSenderName){
            this.resultValidationName = [{result: result, input: inputSenderName}];
        };

        this.callbackSenderText = function(result, inputSenderText){
            this.resultValidationText = [{result: result, input: inputSenderText}];
        };
        this.callbackSenderEmail = function(result, inputSenderEmail){
            this.resultValidationEmail = [{result: result, input: inputSenderEmail}];
        };

        this.checkPostName = function($event, name){
            if(name == '' || name == undefined){
                name = 'empty field';
            }
            var inputSenderName = $event.target;
            var getAttribute = inputSenderName.hasAttribute('senderName');

            if(name == 'empty field'){
                res = 'empty field'
            }else var res = checkName.checkNameF(name);

            if(res == true && getAttribute == true){
                inputSenderName.className = 'form-control senderValid';
                this.callbackSenderName(true, inputSenderName);
            }
            else if(res == 'empty field'){
                inputSenderName.className = 'form-control senderinValid';
                this.callbackSenderName(false);
            }else{
                inputSenderName.className = 'form-control senderinValid';
                this.callbackSenderName(false);
            }
        };

        this.checkPostEmail = function($event, email){
            var inputSenderEmail = $event.target;
            var getAttribute = inputSenderEmail.hasAttribute('senderEmail');
            var res = checkEmail.checkEmailF(email);
            if(res == true && getAttribute == true){
                inputSenderEmail.className = 'form-control senderValid';
                this.callbackSenderEmail(true, inputSenderEmail);
            } else{
                inputSenderEmail.className = 'form-control senderinValid';
                this.callbackSenderEmail(false);
            }
        };

        this.checkPostText = function($event, text){
            var inputSenderText = $event.target;
            var getAttribute = inputSenderText.hasAttribute('senderText');
            var res = checkText.checkTextF(text);
            if(res == true && getAttribute == true){
                inputSenderText.className = 'form-control senderValid';
                this.callbackSenderText(true, inputSenderText);
            } else{
                inputSenderText.className = 'form-control senderinValid';
                this.callbackSenderText(false);
            }
        };

        this.sendContactData = function(articleFurl, senderName, senderEmail, senderText){
            var articleIdFromFurl = '';
            if( ( this.resultValidationName[0].result == true && this.resultValidationName[0].result != '')
                && (this.resultValidationEmail[0].result == true && this.resultValidationEmail[0].result != '')
                && (this.resultValidationText[0].result == true && this.resultValidationText[0].result != '') ){
                //$rootScope.formRequestVisible = false;
                $http({
                    method: 'GET',
                    url: 'lib/request_handler/articles_handler.php?articleFurl=' + articleFurl,
                })
                .then(function successCallback(response) {
                    articleIdFromFurl = response.data[0].id;
                    $http({
                        method: 'post',
                        url: 'lib/request_handler/addComment.php',
                        data: {
                            articleId: articleIdFromFurl,
                            senderName: senderName,
                            senderEmail: senderEmail,
                            senderText: senderText
                        }
                    }).then(function successCallback(response) {
                    }, function errorCallback(response) {
                    });
                });

                return true;

            }else return false;
        };
    }])
    .service("checkName", function(){
        this.nameValidation = function(name) {
            if(name == '' || name == undefined){
                return 'empty field';
            }else{
                var regName = new RegExp(/^[а-яА-Яa-zA-Z]/);
                var resultTestName = regName.test(name);
                if (resultTestName === true) {
                    return true;
                } else {
                    return false;
                }
            }
        };
        this.checkNameF = function(senderName){
            var res = this.nameValidation(senderName);
            if(res){
                return true;
            }else if(res == 'empty field'){
                return 'empty field';
            }
            else{
                return false;
            }
        }
    })
    .service("checkEmail", function(){
        this.emailValidation = function(email) {
            var regEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            var resultTestEmail = regEmail.test(email);
            if (resultTestEmail === true) {
                return true;
            } else {
                return false;
            }
        };
        this.checkEmailF = function(senderEmail){
            var res = this.emailValidation(senderEmail);
            if(res){
                return true;
            }else{
                return false;
            }
        }
    })
    .service("checkText", function(){
        this.textValidation = function(name) {
            if(name == '' || name == undefined){
                return 'empty field';
            }else{
                var regName = new RegExp(/^[\-\.\?\!\)\(\,\:\a-zа-яё\-\.\?\!\)\(\,\:\d]{1}[\-\.\?\!\)\(\,\:a-zа-яё\-\.\?\!\)\(\,\:\d\s]*[\-\.\?\!\)\(\,\:a-zа-яё\-\.\?\!\)\(\,\:\d]{1}$/i);
                var resultTestName = regName.test(name);
                if (resultTestName === true) {
                    return true;
                } else {
                    return false;
                }
            }
        };
        this.checkTextF = function(senderName){
            var res = this.textValidation(senderName);
            if(res){
                return true;
            }else if(res == 'empty field'){
                return 'empty field';
            }
            else{
                return false;
            }
        }
    })
    .service('anchorSmoothScroll', function(){
        this.scrollTo = function(eID) {
            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for ( var i=startY; i<stopY; i+=step ) {
                    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for ( var i=startY; i>stopY; i-=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                if(elm != null)
                {
                    var y = elm.offsetTop;
                    var node = elm;
                    while (node.offsetParent && node.offsetParent != document.body) {
                        node = node.offsetParent;
                        y += node.offsetTop;
                    } return y;
                }
            }
        };
    })
    .service('replaceSimbols', function(){
        this.replaceSimbols = function(header, text, textPreview){
            if(header != undefined){
                header = header.replace(new RegExp("&amp;nbsp;",'g')," ")
                    .replace(new RegExp("&lt;",'g'),'<')
                    .replace(new RegExp("&gt;",'g'),'>')
                    .replace(new RegExp("&quot;",'g'),'"')
                    .replace(new RegExp("&amp;quot;",'g'),'"')
                    .replace(new RegExp("&amp;mdash;",'g'),'-')
                    .replace(new RegExp("&amp;amp;rdquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;ldquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;laquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;raquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;quot;",'g'),'"')
                    .replace(new RegExp("&amp;amp;hellip;",'g'),'...');

            }else{
                header='';
            }
            if(text == undefined){
                text = '';
            }else{
                text = text.replace(new RegExp("&amp;nbsp;",'g')," ")
                    .replace(new RegExp("&lt;",'g'),'<')
                    .replace(new RegExp("&gt;",'g'),'>')
                    .replace(new RegExp("&quot;",'g'),'"')
                    .replace(new RegExp("&amp;quot;",'g'),'"')
                    .replace(new RegExp("&amp;mdash;",'g'),'-')
                    .replace(new RegExp("&amp;amp;rdquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;ldquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;laquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;raquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;quot;",'g'),'"')
                    .replace(new RegExp("&amp;amp;hellip;",'g'),'...');
            }
            if(textPreview == undefined){
                textPreview = '';
            }else{
                textPreview = textPreview.replace(new RegExp("&amp;nbsp;",'g')," ")
                    .replace(new RegExp("&lt;",'g'),'<')
                    .replace(new RegExp("&gt;",'g'),'>')
                    .replace(new RegExp("&quot;",'g'),'"')
                    .replace(new RegExp("&amp;quot;",'g'),'"')
                    .replace(new RegExp("&amp;mdash;",'g'),'-')
                    .replace(new RegExp("&amp;amp;rdquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;ldquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;laquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;raquo;",'g'),'"')
                    .replace(new RegExp("&amp;amp;quot;",'g'),'"')
                    .replace(new RegExp("&amp;amp;hellip;",'g'),'...');
            }
            return {
                header: header,
                text: text,
                textPreview: textPreview
            }
        };

    })
    .directive("bestpost",['$http', 'replaceSimbols', function($http, replaceSimbols){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/bestpost.html", // путь к шаблону директивы
            scope:{},
            controller: function($scope){

                $scope.headerItems= [];
                $http({
                    method: 'GET',
                    url: 'lib/request_handler/articles_handler.php?getBestArticle=1',
                }).then(function successCallback(response) {
                    var header = response.data[0]['post_header'];
                    var replacedFields =[];
                    replacedFields = replaceSimbols.replaceSimbols(header);

                    $scope.headerItems.push({
                        'post_id': response.data[0]['id'],
                        'furl': response.data[0]['furl'],
                        'post_date': response.data[0]['post_date'],
                        'post_header': replacedFields.header,
                        'post_views':  parseInt(response.data[0]['post_views']),
                        'post_comments':  response.data[0]['post_comments'],
                    });
                }, function errorCallback(response) {
                });
            },
            link: function($scope, element, attrs, controller) {
            }
        };
    }])
    .directive("articleHtmlBind",function(){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/article/articleHtmlBind.html", // путь к шаблону директивы
            scope:{
                articlepreview: '=',
                articleview: '=',
            },
            controller: function($scope, $sce){
                $scope.articleview = $sce.trustAsHtml($scope.articleview);
            },
            link: function($scope, element, attrs, controller) {
            }
        };
    })
    .directive("articlecontainer",['$http', '$routeParams', 'replaceSimbols', function($http, $routeParams, replaceSimbols){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/article/articlecontainer.html", // путь к шаблону директивы
            scope:{
                content: '='
            },
            controller: function($scope){

                /* ----------------------- getting one article end ----------------------- */
                $scope.increaseViews = function(){
                    var furl = $routeParams.id;
                    var articleid = "";

                    $http({
                        method: 'GET',
                        url: 'lib/request_handler/articles_handler.php?articleFurl=' + furl,
                    })
                        .then(function successCallback(response) {
                            articleid = response.data[0].id;
                        })
                        .then(function successCallback(response) {
                            $http({
                                method: 'GET',
                                url: 'lib/request_handler/articles_handler.php?increaseViews=1&id=' + articleid,
                                unique: true,
                                cashe: true
                            }).then(function successCallback(response) {
                                $scope.comments = response.data;
                            })
                        }, function errorCallback(response) {
                        });
                };

                //    var articleid = $routeParams.id;
                //    $http({
                //        method: 'GET',
                //        url: 'lib/request_handler/articles_handler.php?increaseViews=1&id=' + articleid,
                //        unique: true,
                //        cashe: true
                //    }).then(function successCallback(response) {
                //        $scope.comments = response.data;
                //    }, function errorCallback(response) {
                //    });
                //};
                $scope.increaseViews();
            },
            link: function($scope, element, attrs, controller) {
            }
        };
    }])
    .directive("articleheader",['$http', function($http){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/article/articleheader.html", // путь к шаблону директивы
            scope:{
                content: '='
            },
            controller: function($scope, $cookies){

            },
            link: function($scope, element, attrs, controller) {
                //$scope.title = '';
                //var list = document.getElementsByTagName("title");
                //list[0].outerHTML = '<title>CASE</title>';
                //console.log(list[0].outerHTML);
                $scope.prodHeader = '';
                function getParams(){
                    for (k in $scope.content) {
                        if(k == 1){
                            $scope.prodHeader= $scope.content[1].post_header;
                        }
                    }
                }
                setTimeout(getParams, 300);
                //list[0].outerText = $scope.title
            }
        };
    }])
    .directive("articlebody",['$http', function($http){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/article/articlebody.html", // путь к шаблону директивы
            scope:{
                content: '='
            },
            controller: function($scope){
            },
            link: function($scope, element, attrs, controller) {
            }
        };
    }])
    .directive("articlefooter",['$http', '$routeParams', function($http, $routeParams){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/article/articlefooter.html", // путь к шаблону директивы
            scope:{
                content: '='
            },
            controller: function($scope, $cookies, $rootScope){
                $scope.comments =[];
                var furl = $routeParams.id;
                var articleid = "";
                $http({
                    method: 'GET',
                    url: 'lib/request_handler/articles_handler.php?articleFurl=' + furl,
                })
                    .then(function successCallback(response) {
                        articleid = response.data[0].id;
                    })
                    .then(function successCallback(response) {
                        /* ----------------------- getting article comments start ----------------------- */
                        $http({
                            method: 'GET',
                            url: 'lib/request_handler/articles_handler.php?getComments=' + articleid,
                            unique: true,
                            cashe: true
                        }).then(function successCallback(response) {
                            $scope.comments = response.data;
                        }, function errorCallback(response) {
                        });
                        /* ----------------------- getting getting article comments end ----------------------- */
                    });
            },
            link: function($scope, element, attrs, controller) {
            }
        };
    }])
    .directive("articlecomments",['$http', 'replaceSimbols' ,function($http, replaceSimbols){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/article/articlecomments.html", // путь к шаблону директивы
            scope:{
                comments: '='
            },
            controller: function($scope, $cookies, $routeParams){

            },
            link: function($scope, element, attrs, controller) {
            }
        };
    }])
    .directive("addComments",['$http', 'replaceSimbols', '$routeParams', 'postDataOfSenderSrv' , function($http, replaceSimbols, $routeParams, postDataOfSenderSrv){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/article/addComments.html", // путь к шаблону директивы
            scope:{
                articleid: '='
            },
            controller: function($scope, $cookies, $routeParams){

                $scope.coms =[];
                var furl = $routeParams.id;
                var articleid = "";
                $scope.showWordComment = true; // if we have comments then show word "Comments"
                $http({
                    method: 'GET',
                    url: 'lib/request_handler/articles_handler.php?articleFurl=' + furl,
                })
                    .then(function successCallback(response) {
                        articleid = response.data[0].id;
                    })
                    .then(function successCallback(response) {
                        /* ----------------------- getting article comments start ----------------------- */
                        $http({
                            method: 'GET',
                            url: 'lib/request_handler/articles_handler.php?getComments=' + articleid,
                            unique: true,
                            cashe: true
                        }).then(function successCallback(response) {
                            if(response.data.length == 0){
                                $scope.showWordComment = false; // if we don't have comments then not show word "Comments"
                            }
                            angular.forEach(response.data, function(value, key) {
                                $scope.coms.push({
                                    com_author: response.data[key]['com_author'],
                                    com_text: response.data[key]['com_text'],
                                })
                            });
                            //console.log(response.data);
                            //$rootScope.coms = response.data;
                        }, function errorCallback(response) {
                        });
                        /* ----------------------- getting getting article comments end ----------------------- */
                    }, function errorCallback(response) {
                    });

                $scope.updateComments = function(name, text){
                    var newDiv = document.createElement('div');
                    var div = document.getElementsByClassName('for-input-comment');
                    var length = div.length;
                    if(length < 0) length = 1;
                    newDiv.innerHTML = '<div class="post-item"><div class="row"><div class="col-xs-12 post-item-content"><div class="post-item-comment-header">' + name +'</div><div class="post-item-preview-text">' + text + '</div></div></div></div>';
                    div[length-1].appendChild(newDiv);
                };

                $scope.commentUserName = '';
                $scope.commentUserEmail = '';
                $scope.commentUserText = '';
                var articleId = $routeParams.id;
                $scope.checkSenderName = function($event, name){ //checking valid name. The goal of this function to check valid text and add class 'senderValid' or 'senderinValid'
                    postDataOfSenderSrv.checkPostName($event, name);
                };
                $scope.checkSenderEmail = function($event, email){ //checking valid email. The goal of this function to check valid text and add class 'senderValid' or 'senderinValid'
                    postDataOfSenderSrv.checkPostEmail($event, email);
                };
                $scope.checkSenderText = function($event, text){ //checking of valid text. The goal of this function to check valid text and add class 'senderValid' or 'senderinValid'
                    postDataOfSenderSrv.checkPostText($event, text);
                };
                $scope.postDataOfSender = function(senderName, senderEmail, senderText){ // gettin all data and post
                    if( (senderName !='' && senderName != undefined) && ( senderEmail !='' && senderEmail != undefined) && ( senderText !='' && senderText != undefined) ){
                        var resultContactPost = postDataOfSenderSrv.sendContactData(articleId, senderName, senderEmail, senderText); //
                        if(resultContactPost) {
                            $scope.updateComments($scope.commentUserName, $scope.commentUserText);
                            $scope.showWordComment = true; // show word "Comments", when user has added comment
                            $scope.commentUserName = '';
                            $scope.commentUserEmail = '';
                            $scope.commentUserText = '';
                        }
                    }

                };
            },
            link: function($scope, element, attrs, controller) {
            }
        };
    }])
    .directive("categories",['$http',
        'replaceSimbols',
        '$routeParams',
        '$cookies',
        '$location',
        '$anchorScroll',
        'anchorSmoothScroll',
        '$window',
        '$document',
        function($http,
                replaceSimbols,
                $routeParams,
                $cookies,
                $location,
                $anchorScroll,
                anchorSmoothScroll,
                $window,
                $document){
            return {
                restrict: 'E', // использование директивы в качестве тега
                templateUrl: "lib/directives/categories.html", // путь к шаблону директивы
                scope:{
                    categories: '=',
                },
                controller: function($scope, $rootScope){
                    $scope.activeMenu = '';
                    $scope.activeMenuAllArticles = 'allArticles';
                    $scope.setActive = function(item){
                        $scope.activeMenu = item;
                        $scope.activeMenuAllArticles = '';
                    }
                    $scope.setActiveAllArticles = function(){
                        $scope.activeMenu = '';
                        $scope.activeMenuAllArticles = 'allArticles';
                    }
                    $scope.showMenu1 = false;
                    $scope.showMenu = function(showMenu1){
                        if(showMenu1 == false) $scope.showMenu1 = true;
                        else $scope.showMenu1 = false;
                    };
                    $scope.orderByMyFilter = function(x) {
                        $scope.myOrderFilter = x;
                    };
                    //$scope.categoryId = '';
                    $rootScope.allArticles = [];
                    $scope.currentOffset = 1;

                    $scope.refactObj = function(obj, pagination,allArt){
                        if(pagination != true)
                            $scope.articlesRow = [];
                        else if(allArt){
                            $scope.getAllArticles();
                        }
                        obj.forEach(function(item, i, obj) {
                            var obj1 = obj.slice(i * 3, (i*3) +3);
                            if(obj1.length != 0) {
                                $scope.articlesRow.push({row:obj.slice(i * 3, (i*3) +3)});
                                return $scope.articlesRow;
                            }
                        });
                    };
// -------------------------------------------- getting all articles when loading of main page start --------------------------------------------
                    $scope.getAllArticles = function(){
                        //$scope.currentOffset = $scope.currentOffset + offset;
                        //if(cookies.get(''))
                        if( ($cookies.get('catId') != '') || ($cookies.get('catId') != undefined) );
                        $cookies.remove('catId');
                        $scope.currentOffset = 1;
                        $location.hash('');
                        $rootScope.allArticles = [];
                        $http({
                            method: 'GET',
                            url: 'lib/request_handler/articles_handler.php?allArticles=1',
                            unique: true,
                            cashe: true
                        }).then(function successCallback(response) {
                            var ObjectLength = response.data.length;
                            $rootScope.allArticles = [];
                            angular.forEach(response.data, function(value, key) {

                                var header = response.data[key]['post_header'];
                                var text = response.data[key]['post_text'];
                                var replacedFields =[];
                                replacedFields = replaceSimbols.replaceSimbols(header, text);

                                $rootScope.allArticles.push({
                                    'id':  response.data[key]['id'],
                                    'furl':  response.data[key]['furl'],
                                    'cat_id':  response.data[key]['cat_id'],
                                    'post_img':  response.data[key]['post_img'],
                                    'post_date':  response.data[key]['post_date'],
                                    'post_header':  replacedFields.header,
                                    'post_preview':  response.data[key]['post_preview'],
                                    'post_text':  replacedFields.text,
                                    'post_views':  response.data[key]['post_views'],
                                    'post_likes':  response.data[key]['post_likes'],
                                    'post_comments':  response.data[key]['post_comments'],
                                    'best_post':  response.data[key]['best_post'],
                                });
                                if(key == (ObjectLength-1)){
                                    $rootScope.allArticles = $scope.refactObj($rootScope.allArticles);
                                }
                            });
                        }, function errorCallback(response) {

                        });
                    };
// -------------------------------------------- getting all articles when loading of main page end --------------------------------------------

// --------------------------------------------------------------- pagination start ---------------------------------------------------------
                    $scope.seeMoreArticles = function(offset){

                        $scope.pagination = true;
                        $scope.currentOffset = $scope.currentOffset + offset;
                        $cookies.put('currentCasePage', $scope.currentOffset);
                        var currentCategory = $cookies.get('catId');
                        if(currentCategory != undefined){
                            $scope.categoryId = currentCategory;
                            var url = 'lib/request_handler/articles_handler.php?articlesOfCategory=1&offset=' + $scope.currentOffset + '&categoryId=' + $scope.categoryId;
                        }else if(currentCategory == undefined){
                            var url = 'lib/request_handler/articles_handler.php?allArticles=1&offset=' + $scope.currentOffset;
                        }
                        $http({
                            method: 'GET',
                            url: url,
                            unique: true,
                            cashe: true
                        }).then(function successCallback(response) {
                            $rootScope.allArticles = [];
                            var ObjectLength = response.data.length;

                            angular.forEach(response.data, function(value, key) {

                                var header = response.data[key]['post_header'];
                                var text = response.data[key]['post_text'];
                                var replacedFields =[];
                                replacedFields = replaceSimbols.replaceSimbols(header, text);
                                $rootScope.allArticles.push({
                                    'id':  response.data[key]['id'],
                                    'furl':  response.data[key]['furl'],
                                    'cat_id':  response.data[key]['cat_id'],
                                    'post_img':  response.data[key]['post_img'],
                                    'post_date':  response.data[key]['post_date'],
                                    'post_header':  replacedFields.header,
                                    'post_preview':  response.data[key]['post_preview'],
                                    'post_text':  replacedFields.text,
                                    'post_views':  parseInt(response.data[key]['post_views']),
                                    'post_likes':  response.data[key]['post_likes'],
                                    'post_comments':  response.data[key]['post_comments'],
                                    'best_post':  response.data[key]['best_post'],
                                });
                                if(key == (ObjectLength-1)){
                                    $rootScope.allArticles = $scope.refactObj($rootScope.allArticles, $scope.pagination);
                                }
                            });
                        }, function errorCallback(response) {
                        });
                    };
                    // upload new articles by scrolling
                    $scope.scrollInProgress = false;
                    angular.element($window).bind("scroll", function() {
                        var Height = this.scrollY + this.innerHeight;
                        if (Height > $document.height() - 1  && !$scope.scrollInProgress) {
                            $scope.scrollInProgress = true;
                            $scope.seeMoreArticles(18);
                        } else {
                            $scope.scrollInProgress = false;
                        }
                        $scope.$apply();
                    });
// --------------------------------------------------------------- pagination end ---------------------------------------------------------
                    $scope.categoryIdFromCookie = $cookies.get('catId');
                    $scope.articleIdFromCookie = $cookies.get('articleId');
                    $scope.currentPageFromCookie = $cookies.get('currentCasePage');

                    if( ($scope.categoryIdFromCookie != '' && $scope.categoryIdFromCookie != undefined )
                        && ($scope.articleIdFromCookie != '' && $scope.articleIdFromCookie != undefined)
                    ) {
                        if($scope.currentPageFromCookie == undefined ||  $scope.currentPageFromCookie == ''){
                            $scope.currentPageFromCookie = 1;
                        }
                        $http({
                            method: 'GET',
                            url: 'lib/request_handler/articles_handler.php?articlesOfCategoryFromHistory=1&offset=' + $scope.currentPageFromCookie + '&categoryId=' +  $scope.categoryIdFromCookie,
                            unique: true,
                            cashe: true
                        }).then(function successCallback(response) {
                            $rootScope.allArticles =[];
                            var ObjectLength = response.data.length;
                            angular.forEach(response.data, function(value, key) {
                                var header = response.data[key]['post_header'];
                                var text = response.data[key]['post_text'];
                                var replacedFields =[];
                                replacedFields = replaceSimbols.replaceSimbols(header, text);

                                $rootScope.allArticles.push({
                                    'id': response.data[key]['id'],
                                    'furl':  response.data[key]['furl'],
                                    'cat_id': response.data[key]['cat_id'],
                                    'post_img': response.data[key]['post_img'],
                                    'post_date': response.data[key]['post_date'],
                                    'post_header': replacedFields.header,
                                    'post_preview': response.data[key]['post_preview'],
                                    'post_text': replacedFields.text,
                                    'post_views': parseInt(response.data[key]['post_views']),
                                    'post_likes': response.data[key]['post_likes'],
                                    'post_comments': response.data[key]['post_comments'],
                                    'best_post': response.data[key]['best_post'],
                                });
                                if(key == (ObjectLength-1)){
                                    $rootScope.allArticles = $scope.refactObj($rootScope.allArticles);
                                }
                            });
                        }, function errorCallback(response) {
                        });
                        setTimeout( (function(){
                            $location.hash( $scope.articleIdFromCookie);
                            anchorSmoothScroll.scrollTo( $scope.articleIdFromCookie);
                            $location.hash('');
                            $cookies.remove('catId');
                            $cookies.remove('articleId');
                        }), 300);
                    }else{
                        $scope.getAllArticles();
                    }

                    $scope.showCategoryArticles = function(catId){
                        $scope.currentOffset = 1;
                        $cookies.put('catId', catId);
                        $scope.categoryId = catId;
                        $http({
                            method: 'GET',
                            url: 'lib/request_handler/articles_handler.php?articlesOfCategory=1&categoryId=' + catId + '&offset=' + $scope.currentOffset,
                            unique: true,
                            cashe: true
                        }).then(function successCallback(response) {
                            $rootScope.allArticles = [];
                            var ObjectLength = response.data.length;
                            angular.forEach(response.data, function(value, key) {
                                var header = response.data[key]['post_header'];
                                var text = response.data[key]['post_text'];
                                var replacedFields =[];
                                replacedFields = replaceSimbols.replaceSimbols(header, text);

                                $rootScope.allArticles.push({
                                    'id':  response.data[key]['id'],
                                    'furl':  response.data[key]['furl'],
                                    'cat_id':  response.data[key]['cat_id'],
                                    'post_img':  response.data[key]['post_img'],
                                    'post_date':  response.data[key]['post_date'],
                                    'post_header':  replacedFields.header,
                                    'post_preview':  response.data[key]['post_preview'],
                                    'post_text':  replacedFields.text,
                                    'post_views':  response.data[key]['post_views'],
                                    'post_likes':  response.data[key]['post_likes'],
                                    'post_comments':  response.data[key]['post_comments'],
                                    'best_post':  response.data[key]['best_post'],
                                });

                                if(key == (ObjectLength-1)){
                                    $rootScope.allArticles = $scope.refactObj($rootScope.allArticles);
                                }
                            });
                        }, function errorCallback(response) {

                        });
                    }
                },
                link: function($scope, element, attrs, controller) {

                }
            };
        }])
    .directive("articles",['$http', '$cookies' , function($http, $cookies){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/articles.html", // путь к шаблону директивы
            scope:{
                article:'=', // контент, который мы отображаем при первом состоянии, при загрузке страницы
            },
            controller: function($scope){
                $scope.setCookie = function(articleId){
                    $cookies.put('articleId', articleId);
                }
            },
            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive("backButton", ["$window", function ($window) {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                elem.bind("click", function () {
                    $window.history.back();
                });
            }
        };
    }])
    .directive("adminMenu",['$http', function($http){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/admin/directives/adminMenu.html", // путь к шаблону директивы
            scope:{ },
            controller: function($scope){

            },
            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive("facebookShare", function(){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/directives/facebookShare.html", // путь к шаблону директивы
            scope:{
                description: '=',
                text: '=',
                socurl: '='
            },
            controller: function($scope){

            },
            link: function($scope, element, attrs, controller) {

            }
        };
    });