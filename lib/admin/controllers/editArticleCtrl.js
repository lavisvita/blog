angular.module('app')
    .controller('editArticleCtrl', ['$scope', '$q', '$timeout', '$http', 'fileUpload', '$location', '$cookies', function($scope, $q, $timeout, $http, fileUpload, $location, $cookies) {
        var param = $cookies.get('param');
        var param2 = $cookies.get('param2');

        $http({
            method: 'GET',
            url: 'lib/request_handler/login_handler.php?getUser=1&param=' + param + '&param2=' + param2,
            unique: true,
            cashe: true
        }).then(function successCallback(response) {
            console.log('result true: ');

            var result = response.data.replace(/\s{2,}/g, '');
            console.log(result);
            if(result != '1'){
                $location.path('/admin');
            }
        }, function errorCallback(response) {
            console.log('result false: ');
            console.error(response.data);
        });
        $scope.uploadFile = function(){
            var file = $scope.myFile;
            console.log($scope.myFile.name);

            var uploadUrl = "lib/request_handler/save_form.php";
            var text = $scope.name;
            fileUpload.uploadFileToUrl(file, uploadUrl, text);
        };

        $scope.editorConfig = {
            sanitize: false,
            toolbar: [
                { name: 'basicStyling', items: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '-', 'leftAlign', 'centerAlign', 'rightAlign', 'blockJustify', '-'] },
                { name: 'paragraph', items: ['orderedList', 'unorderedList', 'outdent', 'indent', '-'] },
                { name: 'doers', items: ['removeFormatting', 'undo', 'redo', '-'] },
                { name: 'colors', items: ['fontColor', 'backgroundColor', '-'] },
                { name: 'links', items: ['image', 'hr', 'symbols', 'link', 'unlink', '-'] },
                { name: 'tools', items: ['print', '-'] },
                { name: 'styling', items: ['font', 'size', 'format'] },
            ]
        };

        $scope.api = {
            scope: $scope,

            insertImage: function() {
                var deferred = $q.defer();
                $timeout(function() {
                    var val = prompt('Enter image url', 'https://upload.wikimedia.org/wikipedia/commons/c/ca/AngularJS_logo.svg');
                    if(val) {
                        deferred.resolve('<img src="' + val + '" style="width: 30%;">');
                    }
                    else {
                        deferred.reject(null);
                    }
                }, 1000);
                return deferred.promise;
            }
        };

    }])
    .directive("editArticle",['$http', 'replaceSimbols', '$cookies', function($http, replaceSimbols, $cookies){
        return {
            restrict: 'E',
            templateUrl: "lib/admin/directives/editArticle.html",
            scope:{
                categories: '=',
                file: '=',
            },
            controller: function($scope){

                $scope.allArticles = [];
                /* ----------------------- getting all articles start ----------------------- */
                $http({
                    method: 'GET',
                    url: 'lib/request_handler/articles_handler.php?allArticlesAdmin=1',
                    unique: true,
                    cashe: true
                }).then(function successCallback(response) {
                    angular.forEach(response.data, function(value, key) {

                        var header = response.data[key]['post_header'];
                        var text = response.data[key]['post_text'];
                        var postPreview = response.data[key]['post_preview'];
                        var replacedFields =[];
                        replacedFields = replaceSimbols.replaceSimbols(header, text, postPreview);
                        $scope.allArticles.push({
                            'id':  response.data[key]['id'],
                            'cat_id':  response.data[key]['cat_id'],
                            'post_img':  response.data[key]['post_img'],
                            'post_date':  response.data[key]['post_date'],
                            'post_header':  replacedFields.header,
                            'post_preview':  replacedFields.textPreview,
                            'post_text':  replacedFields.text,
                            'post_views':  parseInt(response.data[key]['post_views']),
                            'post_likes':  response.data[key]['post_likes'],
                            'post_comments':  response.data[key]['post_comments'],
                            'best_post':  response.data[key]['best_post'],
                        });
                    });
                }, function errorCallback(response) {

                });
                $scope.articleId='';
                $scope.articleHeader='';
                $scope.articlePreview='';
                $scope.updatedPreview='';
                $scope.articleCatId = '';
                $scope.articleOldPicture = '';
                $scope.articlePostText = '';
                $scope.fileNameOldPicture = '';
                $scope.bodyItems = [];
                $scope.articleFURL = '';

                $scope.getPostData = function(id){
                    /* ----------------------- getting one article start ----------------------- */
                    $http({
                        method: 'GET',
                        url: 'lib/request_handler/articles_handler.php?oneArticle=' + id,
                        unique: true,
                        cashe: true
                    }).then(function successCallback(response) {
                        var header = response.data[0]['post_header'];
                        var text = response.data[0]['post_text'];
                        var postPreview = response.data[0]['post_preview'];
                        var replacedFields =[];
                        replacedFields = replaceSimbols.replaceSimbols(header, text, postPreview);

                        $scope.articleId = response.data[0]['id'];
                        $scope.articleFURL = response.data[0]['furl'];
                        $scope.articleCatId = response.data[0]['cat_id'];
                        $scope.articleOldPicture = response.data[0]['post_img'];
                        $scope.articlePreview = replacedFields.textPreview;
                        $scope.articleHeader = replacedFields.header;
                        $scope.articlePostText = replacedFields.text;
                        $scope.contentText = $scope.articlePostText;

                        // так как мы используем ckEditor, то нам приходится добираться до контента нативными методами
                        $scope.fileNameOldPicture = $scope.articleOldPicture;
                        //var content = document.querySelector('#cke_editor1')
                        //    .getElementsByTagName('iframe')[0].ownerDocument
                        //    .getElementsByTagName('iframe')[0].contentDocument.body.innerHTML = $scope.contentText;
                    }, function errorCallback(response) {
                    });
                    /* ----------------------- getting one article end ----------------------- */
                };

                $scope.allCategories = [];
                $scope.catId = '';
                /* ----------------------- getting all categories start ----------------------- */
                $http({
                    method: 'GET',
                    url: 'lib/request_handler/articles_handler.php?allCategories=1',
                    unique: true,
                    cashe: true
                }).then(function successCallback(response) {
                    $scope.allCategories = response.data;
                }, function errorCallback(response) {

                });
                /* ----------------------- getting all categories end ----------------------- */

                $scope.updateArticle = function(postId, catId, articlePreview, articleHeader, text, oldCatId, fileName, articleOldPicture, furl){
                    console.log(furl, text);
                    // получаем имя файла из cookie
                    var fileNameFromCookie = $cookies.get('fileName');
                    console.log(fileNameFromCookie);

                    // так как мы используем ckEditor, то нам приходится добираться до контента нативными методами
                    // поэтому, когда мы получаем текст при нажатии на название статьи ( функция getPostData ), то
                    // после редактирования, мы также должны получить этот текст тем же самым способом
                    //var content = document.querySelector('#cke_editor1')
                    //    .getElementsByTagName('iframe')[0].ownerDocument
                    //    .getElementsByTagName('iframe')[0].contentDocument.body.innerHTML;
                    //console.log(content);

                    if(catId == undefined){
                        catId = oldCatId;
                    }
                    // если картинка не была обновлена, то берём старое имя файла, которое мы получили на строчке 121
                    // (не исключено, что строчка может поменяться :D )
                    if(fileNameFromCookie == undefined){
                        fileNameFromCookie = $scope.fileNameOldPicture;
                    }
                    console.log(fileNameFromCookie);

                    var data = [];
                    data.push({
                        'furl' : furl,
                        'postId': postId,
                        'catId': catId,
                        'articleText': text,
                        'articleHeader': articleHeader,
                        'articlePreview': articlePreview,
                        'fileName': fileNameFromCookie
                    });

                    $http({
                        url: 'lib/request_handler/update.php',
                        method: "POST",
                        data: data,
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                        $cookies.remove('fileName');
                        // clearing fields
                        //content = document.querySelector('#cke_editor1')
                        //    .getElementsByTagName('iframe')[0].ownerDocument
                        //    .getElementsByTagName('iframe')[0].contentDocument.body.innerHTML = '';
                        $scope.articlePostText = '';
                        $scope.catId = '';
                        $scope.articlePreview = '';
                        $scope.articleHeader = '';

                        // clearing fields
                    }).error(function (data, status, headers, config) {});

                };

                $scope.deletePost = function(id){
                    result = confirm("Вы собираетесь удалить статью. Удалить?");
                    if(result) {
                        $http({
                            method: 'GET',
                            url: 'lib/request_handler/articles_handler.php?deleteArticle=1' + '&articleId=' + id,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                            },
                        }).then(function successCallback(response) {
                            console.log(response);
                        }, function errorCallback(response) {

                        });
                    }
                }
                $scope.setBestArticle = function(id){
                    console.log('set best post');
                    console.log(id);
                    $http({
                        method: 'GET',
                        url: 'lib/request_handler/articles_handler.php?setBestArticle=1&articleId=' + id,
                    }).then(function successCallback(response) {
                        console.log(response);
                    }, function errorCallback(response) {

                    });
                }

            },
            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl, name){
            console.log(uploadUrl);
            var fd = new FormData();
            fd.append('file', file);
            fd.append('name', name);
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined,'Process-Data': false}
                })
                .success(function(){
                    console.log("Success");
                })
                .error(function(){
                    console.log("Success");
                });
        }
    }]);