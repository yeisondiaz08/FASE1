var myapp;
myapp = angular.module('myap', []);

myapp.controller('SolicitudesController', function ($scope, $http) {



    CargarCombos();

    $scope.result;
    $scope.txtDireccion = "";
    $scope.Salir = function () {

        window.location.href = 'Login.html';
    }

    function Clean() {
        $(":text").each(function () {
            $($(this)).val('');
        });


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
    function CargarCombos() {

        $http.get('api/Servicios?codigoServ=4').success(function (response) {

            $scope.TipoServicios = response;

            //console.log($scope.TipoServicios);
        });
        $http.get('api/TipoSolicitud').success(function (response) {

            $scope.TipoSolici = response;

            //console.log($scope.TipoServicios);
        });
        $http.get('api/Municipios').success(function (response) {

            $scope.Municipios = response;

            //console.log($scope.TipoServicios);
        });
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


        $scope.one = false;
        $scope.two = false;
        Clean();
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

    $scope.btnGuardar = function () {
        var grup = document.getElementById("TipoSol").value;//id="TipoSer"
        var Tipservicio = document.getElementById("TipoSer").value;
        var codigoMinucipio = document.getElementById("idMuni").value;
        var codUsuar = sessionStorage.getItem("codUsuario");
        var Solicitudes =
        {
            descripcion: $scope.txtDescripcion,
            fecha: $scope.txtFecha,
            direccion: $scope.txtDireccion,
            hora: $scope.txtHora + " Hora",
            horaAtencion: $scope.cbmHoraAtencion,
            codigoTipoServicio: Tipservicio,
            codigoTipoSolicitud: grup,
            codigoTrabajador: null,
            codigoEstado: 1,
            codigoMunicipio: codigoMinucipio,
            codigoCliente: codUsuar
        }

        if (codUsuar == null) {
            window.location.href = 'login.html';
        }
        else {

            $http.post('api/Solicitudes/Post', Solicitudes).
          success(function (data, status, headers, config) {

              alert('Registro Guardado Con exito !');
              Clean();
          }).error(function (data, status, headers, config) {
              alert(data.ExceptionMessage);
          });
        }

    }


});





