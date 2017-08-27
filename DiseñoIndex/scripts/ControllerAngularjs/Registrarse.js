var myapp;
myapp = angular.module('myapp', []);

myapp.controller('RegistrarseController', function ($scope, $http) {

    function Clean() {
        $(":text").each(function () {
            $($(this)).val('');
        });


    }
    $scope.AddTrabajador = function () {
        var gen = ($('input:radio[name=group1]:checked').val());
        var con = ($('input:checkbox[name=condiciones]:checked').val());
        var Usuario =
        {
            cedula: $scope.txtCedula,
            nombre: $scope.txtNombre,
            apellido: $scope.txtApellido,
            fechaNacimiento: $scope.txtFecha,
            genero: gen,
            descripcionPerfil: $scope.txtDescripcion,
            direccion: $scope.txtDireccion,
            correo: $scope.txtCorreo,
            telefono: $scope.txtCelular,
            passw: $scope.contra1,
            codigoRol: 3,
        }

        if (con == null) {
            alert('Por favor acepte las condiciones de uno');
        }
        else {
            $http.post('api/Usuarios/Post', Usuario).
          success(function (data, status, headers, config) {

              alert('Registro Guardado Con exito !');
              Clean();
          }).error(function (data, status, headers, config) {
              alert(data.ExceptionMessage);
          });
        }
      
    }
    $scope.AddCliente = function () {
      
        var gen = ($('input:radio[name=group1]:checked').val());
        var con = ($('input:checkbox[name=condiciones]:checked').val());
        var Usuario =
         {
             cedula: null,
             nombre: $scope.txtNombre,
             fechaNacimiento: $scope.txtFecha,
             genero: gen,
             descripcionPerfil: null,
             apellido: $scope.txtApellido,
             direccion: $scope.txtDireccion,
             correo: $scope.txtCorreo,
             telefono: $scope.txtCelular,
             passw: $scope.contra1,
             codigoRol: 2,
         }

        if (con == null) {
            alert('Por favor acepte las condiciones de uno');
        }
        else {
              $http.post('api/Usuarios/Post', Usuario).
            success(function (data, status, headers, config) {

                alert('Registro Guardado Con exito !');
                Clean();
            }).error(function (data, status, headers, config) {
                alert(data.ExceptionMessage);
            });
        }
       

     
    }
});