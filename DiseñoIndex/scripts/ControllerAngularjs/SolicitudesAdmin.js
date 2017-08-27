var myapp;
myapp = angular.module('myap', []);

myapp.controller('SolicitudesController', function ($scope, $http) {

    var us = sessionStorage.getItem("accessToken");
    var solicitu;
    //
    clientes();
    trabajadores();
    getall();
    $scope.buscarTrbajador = function (codigo) {
        
        $http.get('api/solicitudes?codigo=' + codigo).success(function (resp) {
            $scope.SolicitudesDTO = resp;
            //$scope.SolicitudesDTO.codigoTipoServicio;
            solicitu = codigo;
            $http.get('api/TipoServicioTrabajador?codigoSolicitud=' + resp.codigoTipoServicio).success(function (respon) {

                
                if (respon != '') {
                    $scope.resultado = respon;
                } else {
                    
                    alert('No se Encuentran Trabajadores para la Solicitud seleccionada');
                }
                //console.log($scope.TipoServicios);
            });


        });

    }

    $scope.Salir = function () {
        window.sessionStorage.removeItem('accessToken');
        window.sessionStorage.clear();
        window.location.href = 'Login.html';
    }

    $scope.result;
    getall();

    function Initialize() {
        $scope.SolicitudesDTO =
           {
               codigo: "",
               direccion: "",
               descripcion: "",
               fecha: "",
               hora: "",
               horaAtencion: "",
               codigoTipoServicio: "",
               codigoTipoSolicitud: "",
               codigoCliente: "",
               codigoTrabajador: "",
               codigoEstado: ""
           }
    }

    $scope.btnGuardar = function (codTrabajador) {

        $http.get('api/solicitudes?codigo=' + solicitu).success(function (resp) {
            $scope.SolicitudesDTO = resp;
            var Solicitudes = {
                codigo: resp.codigo,
                direccion: resp.direccion,
                descripcion: resp.descripcion,
                fecha: resp.fecha,
                hora: resp.hora,
                horaAtencion: resp.horaAtencion,
                codigoTipoServicio: resp.codigoTipoServicio,
                codigoTipoSolicitud: resp.codigoTipoSolicitud,
                codigoCliente: resp.codigoCliente,
                codigoMunicipio: resp.codigoMunicipio,
                codigoTrabajador: codTrabajador,
                codigoEstado: 3
            }
            $http.put('api/Solicitudes/put', Solicitudes).
            success(function (data, status, headers, config) {

                alert('Trabajador Asignado con Exito !');
            }).error(function (data, status, headers, config) {
                alert(data.ExceptionMessage);
            });

        });
        
    }
    function clientes() {
        $http.get('api/usuarios?codRol=2').success(function (response) {
            $scope.Datas = response;
            $scope.cliente = response;
           
        });

    }

    function trabajadores() {
        $http.get('api/usuarios?codRol=3').success(function (response) {
            $scope.Datas = response;
            $scope.trabajador = response;
          
        });
    }
    function getall() {
        $http.get('api/Solicitudes').success(function (response) {
            $scope.Datas = response;
            $scope.result = response;
            $scope.predicate = 'descripcion';
            $scope.reverse = true;
            $scope.currentPage = 1;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            }
            $scope.totalItems = $scope.Datas.length;
            $scope.numPerPage = 3;
            $scope.paginate = function (value) {
                begin = ($scope.currentPage - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.Datas.indexOf(value);
                return (begin <= index && index < end);
            };
        });

       

      
        $scope.asignar = true;
    }

});