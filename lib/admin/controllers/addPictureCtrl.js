angular.module('app')
    .controller('addPictureCtrl', function ($scope, $rootScope, Upload, $timeout, $cookies){
        //$scope.getImage = function(file){
        //    console.log(file);
        //    var fd = new FormData();
        //    var result = fd.append('file', file);
        //    console.log(result);
        //}

        $scope.$watch('files', function () {
            $scope.upload($scope.files);
            if($scope.files != undefined)
                $cookies.put('fileName', $scope.files[0].name);
        });
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.log = '';

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        Upload.upload({
                            url: 'lib/request_handler/save_form.php',
                            data: {
                                username: $scope.username,
                                file: file
                            }
                        }).then(function (resp) {
                            $timeout(function() {
                                $scope.log = 'file: ' +
                                    resp.config.data.file.name + '\n' + $scope.log;
                            });
                        }, null, function (evt) {
                            var progressPercentage = parseInt(100.0 *
                                evt.loaded / evt.total);
                            $scope.log = 'progress: ' + progressPercentage +
                                '% ' + evt.config.data.file.name + '\n' +
                                $scope.log;
                        });
                    }
                }
            }
        };

    });