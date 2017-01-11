angular.module('app')
    .controller('addArticleCtrl',  ['$scope', '$rootScope','$q', '$timeout', '$http', 'fileUpload', '$cookies', '$location', function($scope, $rootScope, $q, $timeout, $http, fileUpload, $cookies, $location){
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


        $rootScope.myFile = '';
        //$scope.myFile = '';
        //$scope.uploadFile = function(){
        //    var file = $scope.myFile;
        //    console.log($scope.myFile.name);
        //
        //    var uploadUrl = "lib/request_handler/save_form.php";
        //    var text = $scope.name;
        //    fileUpload.uploadFileToUrl(file, uploadUrl, text);
        //};

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


        /* ----------------------- create article end ----------------------- */
    }])
    .directive("addArticle",['$http', '$cookies', function($http, $cookies){
        return {
            restrict: 'E',
            templateUrl: "lib/admin/directives/addArticle.html",
            scope:{
                categories: '=',
                //file: '='
            },
            controller: function($scope){
                $scope.allCategories = [];
                $scope.catId = '';
                $scope.articleText = '';
                $scope.articlePreview = '';
                $scope.fileDetails = [];
                $scope.fileName = '';
                $scope.articleFURL = '';
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

                /* ----------------------- create article start ----------------------- */
                $scope.createArticle = function(catId, articleFURL, header, preview, fileName) {
                    console.log(catId, articleFURL, header, preview, fileName);
                    var fileNameFromCookie = $cookies.get('fileName');
                   var content = document.querySelector('#cke_editor1')
                        .getElementsByTagName('iframe')[0].ownerDocument
                        .getElementsByTagName('iframe')[0].contentDocument.body.innerHTML;
                    var data = [];


                    data.push({
                        'furl' : articleFURL,
                        'catId': catId,
                        'articleText': content,
                        'articleHeader': header,
                        'articlePreview': preview,
                        'fileName': fileNameFromCookie
                    });

                    $http({
                        url: 'lib/request_handler/create.php',
                        method: "POST",
                        data: data,
                    }).success(function (data, status, headers, config) {
                        $cookies.remove('fileName');

                        // clearing fields
                        content = document.querySelector('#cke_editor1')
                            .getElementsByTagName('iframe')[0].ownerDocument
                            .getElementsByTagName('iframe')[0].contentDocument.body.innerHTML = '';

                        $scope.catId = '';
                        $scope.articlePreview = '';
                        $scope.header = '';
                        $scope.articleFURL = '';
                        // clearing fields

                    }).error(function (data, status, headers, config) {
                        console.log(data);
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