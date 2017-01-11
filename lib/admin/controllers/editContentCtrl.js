angular.module('app')
    .controller('editContentCtrl', function($scope, $http, $location, $cookies){
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
        $scope.allCategories = [];
        /* ----------------------- getting all articles end ----------------------- */

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
    })
    .directive("categoriesEdit",['$http', function($http){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/admin/directives/categoriesEdit.html", // путь к шаблону директивы
            scope:{
                categories: '='
            },
            controller: function($scope){

                $scope.allArticles = [];
                /* ----------------------- getting all articles start ----------------------- */
                $http({
                    method: 'GET',
                    url: 'lib/request_handler/articles_handler.php?allArticlesAdmin',
                    unique: true,
                    cashe: true
                }).then(function successCallback(response) {
                    angular.forEach(response.data, function(value, key) {
                        $scope.allArticles.push({
                            'id':  response.data[key]['id'],
                            'cat_id':  response.data[key]['cat_id'],
                            'post_img':  response.data[key]['post_img'],
                            'post_date':  response.data[key]['post_date'],
                            'post_header':  response.data[key]['post_header'],
                            'post_preview':  response.data[key]['post_preview'],
                            'post_text':  response.data[key]['post_text'],
                            'post_views':  parseInt(response.data[key]['post_views']),
                            'post_likes':  response.data[key]['post_likes'],
                            'post_comments':  response.data[key]['post_comments'],
                            'best_post':  response.data[key]['best_post'],
                        });
                    });
                }, function errorCallback(response) {

                });


                $scope.showCategoryArticles = function(catId){
                    $http({
                        method: 'GET',
                        url: 'lib/request_handler/articles_handler.php?articlesOfCategory=' + catId,
                        unique: true,
                        cashe: true
                    }).then(function successCallback(response) {
                        $scope.allArticles = response.data;
                    }, function errorCallback(response) {

                    });
                }
            },
            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive("articlesEdit",['$http', function($http){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "lib/admin/directives/articlesEdit.html", // путь к шаблону директивы
            scope:{
                article:'=', // контент, который мы отображаем при первом состоянии, при загрузке страницы
            },
            controller: function($scope){

            },
            link: function($scope, element, attrs, controller) {

            }
        };
    }]);