var myapp;
myapp = angular.module('myap', []);

myapp.controller('SolicitudesController', function ($scope, $http) {

    Cargar();
    $scope.result;
    $scope.txtDireccion = "";
    $scope.Salir = function () {
  
        window.location.href = 'Login.html';
    }

    function Cargar() {

        var emai = sessionStorage.getItem("email");
        if (emai != null) {
            $http.get('api/usuarios?email=' + emai).success(function (response) {
                $scope.ClientesDTO = response;
                codigoUsuario = $scope.ClientesDTO.codigo;
                $scope.txtNombre = $scope.ClientesDTO.nombre;
                $scope.txtApellido = $scope.ClientesDTO.apellido;
                $scope.txtDireccion = $scope.ClientesDTO.direccion;
                $scope.txtCorreo = $scope.ClientesDTO.correo;
                $scope.txtCelular = $scope.ClientesDTO.telefono;
                pass = $scope.ClientesDTO.passw;
                window.sessionStorage.setItem("rol", $scope.ClientesDTO.codigoRol);
                window.sessionStorage.setItem("codUsuario", codigoUsuario);
                $scope.Iniciad = true;
                $scope.IniciarSes = false;

            });

        }
        else {
            $scope.Iniciad = false;
            $scope.IniciarSes = true;
        }


       
    }

  
    $scope.PaginaUsuario = function () {
      
        var codigoRol = sessionStorage.getItem("rol");
       
        if ((codigoRol == 2)) {
            window.location.href = 'Cliente.html';
        }
        if (codigoRol == 3) {
            window.location.href = 'Cuenta.html';
        }
        if (codigoRol == 1) {
            window.location.href = 'Solicitudes.html';
        }
        
    }

    $scope.btnProgramarfecha = function () {

        var grup = document.getElementById("TipoSol").value;
        if (grup == 1) {
            $scope.one = true;
            $scope.two = true;
        }
        else {
            $scope.one = false;
            $scope.two = false;
        }
    }

});









