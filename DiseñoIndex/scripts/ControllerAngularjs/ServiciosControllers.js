var myapp;
myapp = angular.module('myap', ['ui.bootstrap']);

myapp.controller('ServiciosTrabajorController', function ($scope, $http) {

    CargarCombos();

    function CargarCombos() {


        $http.get('api/Servicios').success(function (response) {
            $scope.Datas = response;
            $scope.TipoServicios = response;
            $scope.predicate = 'nombre';
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
    $scope.Salir = function () {
        window.sessionStorage.removeItem('accessToken');
        window.sessionStorage.removeItem('email');
        window.sessionStorage.removeItem('rol');
        window.sessionStorage.removeItem('codUsuario');
        window.sessionStorage.clear();
        window.location.href = 'Login.html';
    }

    $scope.Agregar = function (codigo, nombre) {
        var idemp = sessionStorage.getItem("codUsuario");
        var TipoServicioTrabajador = {
            codigoTipoServicio: codigo,
            codigoTrabajador: idemp
        }
        if (confirm('Esta Seguro que desea Registrar ' + nombre + ' ?')) {
            $http.post('api/TipoServicioTrabajador/post', TipoServicioTrabajador).success(function (data, status, headers, config) {

                alert('Servicio Registrado con Exito !');
            }).error(function (data, status, headers, config) {
                alert(data.ExceptionMessage);
            });
        } else {
            return;
        };
    }

});