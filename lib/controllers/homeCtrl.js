angular.module('app')
    .controller('homeCtrl', ['$scope','$http', '$rootScope' , function($scope, $http, $rootScope){

        $scope.allCategories = [];
        //document.getElementsByTagName('title')[0].innerHTML = 'Блог';
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
    }]);