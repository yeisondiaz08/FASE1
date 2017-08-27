var myapp;
myapp = angular.module('myap', []);

myapp.controller('CuentaController', function ($scope, $http) {
    $("input:radio").prop('checked', true);
    $("input[type=radio]").prop('checked', true);
    var codigoUsuario;
    var pass;
    var emai = sessionStorage.getItem("email");
    $http.get('api/usuarios?email=' + emai).success(function (response) {
        $scope.ClientesDTO = response;
        codigoUsuario = $scope.ClientesDTO.codigo;
        $scope.txtNombre = $scope.ClientesDTO.nombre;
        $scope.txtApellido = $scope.ClientesDTO.apellido;
        $scope.txtDireccion = $scope.ClientesDTO.direccion;
        $scope.txtCedula = $scope.ClientesDTO.cedula;
        $scope.txtFecha = $scope.ClientesDTO.fechaNacimiento;
        $scope.txtCorreo = $scope.ClientesDTO.correo;
        $scope.txtDescripcion = $scope.ClientesDTO.descripcionPerfil;
        $scope.txtCelular = $scope.ClientesDTO.telefono;
        $scope.txtpass = $scope.ClientesDTO.passw;
        window.sessionStorage.setItem("rol", $scope.ClientesDTO.codigoRol);
        window.sessionStorage.setItem("codUsuario", codigoUsuario);

    });

    $scope.btnUpdate = function () {
        var codRol = sessionStorage.getItem("rol");
        var gen = ($('input:radio[name=group1]:checked').val());
        var clientes = {
            codigo: codigoUsuario,
            nombre: $scope.txtNombre,
            cedula: $scope.txtCedula,
            apellido: $scope.txtApellido,
            fechaNacimiento: $scope.txtFecha,
            genero: gen,
            descripcionPerfil: $scope.txtDescripcion,
            direccion: $scope.txtDireccion,
            correo: emai,
            telefono: $scope.txtCelular,
            passw: $scope.txtpass,
            codigoRol: codRol
            
        }

        $http.put('api/usuarios/PUT', clientes).success(function (data, status, headers, config) {
           
            alert('Registro Actualizado con Exito !');
        }).error(function (data, status, headers, config) {
            alert(data.ExceptionMessage);
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


});