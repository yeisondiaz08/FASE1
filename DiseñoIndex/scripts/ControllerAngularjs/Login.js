var myapp;
myapp = angular.module('myap', []);

myapp.controller('LoginController', function ($scope, $http) {

    $scope.tow = false;
    var tokenKey = 'accessToken';

    $scope.btnLogin = function () {
        $scope.tow = true;
        var username = $scope.userLoginEmail;
        var password = $scope.userLoginPassword;
        $http({
            url: "/TOKEN",
            method: "POST",
            data: $.param({ grant_type: 'password', username: username, password: password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

        }).success(function (data) {
            //alert(JSON.stringify(data));
            $scope.tow = false;
            //alert(JSON.stringify(data.access_token));
            window.sessionStorage.setItem(tokenKey, data.access_token);
            window.sessionStorage.setItem("email", $scope.userLoginEmail);
            window.location.href = 'Default.html';
        }).error(function (data, status, headers, config) {
            $scope.tow = false;
            $scope.message = "Correo o contarseña Inconrrecta";
            //alert(JSON.stringify(data));
        });
    }

});


