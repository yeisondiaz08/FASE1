var myapp;
myapp = angular.module('myapp', ['ui.bootstrap']);

myapp.controller('RegistrarTrabajadorController', function ($scope, $http) {


    CargarCombos();
    function CargarCombos() {

        var codUsuar = sessionStorage.getItem("codUsuario");
        if (codUsuar == null) {
            window.sessionStorage.removeItem('accessToken');
            window.sessionStorage.clear();

            window.sessionStorage.removeItem('email');
            window.location.href = 'Login.html';
        }
        else {
            $http.get('api/solicitudes?codigoTrabajador=' + codUsuar).success(function (response) {
                $scope.Datas = response;
                $scope.solicitudes = response;
                $scope.predicate = 'descripcion';
                $scope.reverse = true;
                $scope.currentPage = 1;
                $scope.order = function (predicate) {
                    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                    $scope.predicate = predicate;
                }
                $scope.totalItems = $scope.Datas.length;
                $scope.numPerPage = 5;
                $scope.paginate = function (value) {
                    begin = ($scope.currentPage - 1) * $scope.numPerPage;
                    end = begin + $scope.numPerPage;
                    index = $scope.Datas.indexOf(value);
                    return (begin <= index && index < end);
                };
            });
        }
       

    }

    $scope.Salir = function () {
        window.sessionStorage.removeItem('accessToken');
        window.sessionStorage.removeItem('email');
        window.sessionStorage.removeItem('rol');
        window.sessionStorage.removeItem('codUsuario');
        window.sessionStorage.clear();
        window.location.href = 'Login.html';
    }
    $scope.Add = function () {
        var Trabajadores =
        {
            nombre: $scope.txtNombre,
            apellido: $scope.txtApellido,
            direccion: $scope.txtDireccion,
            correo: $scope.txtCorreo,
            telefono: $scope.txtCelular,
            passw: $scope.contra1,
        }

        $http.post('api/Trabajadores/Post', Trabajadores).
      success(function (data, status, headers, config) {

          alert('Registro Guardado Con exito !');
      }).error(function (data, status, headers, config) {
          alert(data.ExceptionMessage);
      });

    }

});