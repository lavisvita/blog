angular.module('app')
    .controller('commentsHandlerCtrl', function($scope, $http, $location, $cookies){
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
            if(result != '1'){
                $location.path('/admin');
            }
        }, function errorCallback(response) {
            console.log('result false: ');
            console.error(response.data);
        });
        $scope.allComments = [];
        $http({
            method: 'GET',
            url: 'lib/request_handler/editComments.php?allComments=1',
        }).then(function successCallback(response) {
            angular.forEach(response.data, function(value, key) {
                $scope.allComments.push({
                    'id':  response.data[key]['id'],
                    'com_text':  response.data[key]['com_text'],
                    'com_author':  response.data[key]['com_author'],
                    'user_email':  response.data[key]['user_email']
                });
            });
        }, function errorCallback(response) {
        });

        $scope.refreshList = function(){
            $scope.allComments = [];
            $http({
                method: 'GET',
                url: 'lib/request_handler/editComments.php?allComments=1',
            }).then(function successCallback(response) {
                angular.forEach(response.data, function(value, key) {
                    $scope.allComments.push({
                        'id':  response.data[key]['id'],
                        'com_text':  response.data[key]['com_text'],
                        'com_author':  response.data[key]['com_author'],
                        'user_email':  response.data[key]['user_email']
                    });
                });
            }, function errorCallback(response) {
            });
        }

        $scope.deleteComment = function(id){

            $http({
                method: 'GET',
                url: 'lib/request_handler/editComments.php?deleteComment=1&id=' + id,
            }).then(function successCallback(response) {
                $scope.refreshList();
            }, function errorCallback(response) {
            });
        }
    });