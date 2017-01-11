angular.module('app')
    .controller('categoriesHandlerCtrl', function($scope, $http, $location, $cookies){
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
        $scope.catId = '';
        $scope.catName = '';
        /* ----------------------- getting all categories end ----------------------- */
        $scope.getOneCategory = function(id){
            /* ----------------------- getting one category start ----------------------- */
            $http({
                method: 'GET',
                url: 'lib/request_handler/articles_handler.php?getOneCategory=1'+ '&catId=' + id,
                unique: true,
                cashe: true
            }).then(function successCallback(response) {
                console.log(response);
                $scope.catId = response.data[0]['id'];
                $scope.catName = response.data[0]['cat_name'];
            }, function errorCallback(response) {
            });
            /* ----------------------- getting one category end ----------------------- */
        };
        $scope.updateCategory = function(catId, catName){
            console.log(catId, catName);

            $http({
                method: 'GET',
                url: 'lib/request_handler/articles_handler.php?updateCategory=1'+ '&catId=' + catId + '&catName= ' + catName,
                unique: true,
                cashe: true
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
            });
        };
        $scope.addNewCategory = function(catNewName){
            console.log(catNewName);
            $http({
                method: 'GET',
                url: 'lib/request_handler/articles_handler.php?addNewCategory=1' + '&catName= ' + catNewName,
                unique: true,
                cashe: true
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
            });
        }
    });