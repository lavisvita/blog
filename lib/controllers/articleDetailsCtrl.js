angular.module('app')
    .controller('articleDetailsCtrl',['$scope', '$http', '$routeParams', 'replaceSimbols', '$sce', '$location' ,function($scope, $http, $routeParams, replaceSimbols, $sce, $location){
        var furl = $routeParams.id;
        $scope.id = '';
        (furl == undefined) ? $location.$$path.slice(9) : $routeParams.id;
        $scope.articleDetails = [];
        $scope.headerItems =[
            {
                'post_date': '',
                'post_img':'',
                'post_header': '',
                'post_preview': ''
            }
        ];
        $scope.bodyItems =[
            {
                'post_header': '',
                'post_text': ''

            }
        ];

        $http({
            method: 'GET',
            url: 'lib/request_handler/articles_handler.php?articleFurl=' + furl,
        })
        .then(function successCallback(response) {
            $scope.id = response.data[0].id;
        })
        .then(function successCallback(response) {
        /* ----------------------- getting one article start ----------------------- */
            $http({
                method: 'GET',
                url: 'lib/request_handler/articles_handler.php?oneArticle=' + $scope.id,
            }).then(function successCallback(response) {
                var header = response.data[0]['post_header'];
                var text = response.data[0]['post_text'];
                var replacedFields =[];
                replacedFields = replaceSimbols.replaceSimbols(header, text);
                $scope.headerItems.push({
                    'post_id': response.data[0]['id'],
                    'post_date': response.data[0]['post_date'],
                    'post_img':response.data[0]['post_img'],
                    'post_header': replacedFields.header,
                    'post_preview': response.data[0]['post_preview'],
                    'post_views': response.data[0]['post_views'],
                    'post_comments': response.data[0]['post_comments'],
                });
                $scope.bodyItems.push(
                    {
                        'post_header': replacedFields.header,
                        'post_text': replacedFields.text
                    }
                );
                $scope.bodyItems[1].post_text = $sce.trustAsHtml($scope.bodyItems[1].post_text);
            }, function errorCallback(response) {
            });
        /* ----------------------- getting one article end ----------------------- */
        }, function errorCallback(response) {
        });
    }]);