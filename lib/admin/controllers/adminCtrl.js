angular.module('app')
    .controller('adminCtrl', [ '$scope', '$http', '$location', '$cookies', '$routeParams',function($scope, $http, $location, $cookies, $routeParams){
        $scope.test = 'test';
        var pamParam = $routeParams.param;
        var pamParam2 = $routeParams.param2;
            $http({
                method: 'GET',
                url: 'lib/request_handler/login_handler.php?getUser=1&param=' + pamParam + '&param2=' + pamParam2,
                unique: true,
                cashe: true
            }).then(function successCallback(response) {
                console.log('result true: ');

                var result = response.data.replace(/\s{2,}/g, '');
                console.log(result);
                if(result == '1'){
                    $cookies.put('param', pamParam);
                    $cookies.put('param2', pamParam2);
                    $location.path('/mainadminpage');
                }
            }, function errorCallback(response) {
                console.log('result false: ');
                console.error(response.data);
            });
    }]);