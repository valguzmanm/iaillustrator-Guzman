localUsuarios = JSON.parse(localStorage.getItem('usuarios'));

const usuarios = localUsuarios ? localUsuarios : []


//le asigné un id al boton de inicio y registro para que al momento de hacer clik, me aparezca el cajón de iniciar sesión y se oculte el de registro.

document.getElementById("btnRegistro").addEventListener("click", ocultar);
document.getElementById("btnInSes").addEventListener("click", ocultar);

//Creo una funcion que se ejecuta al momento de hacer click en la pantalla registro y en el boton de iniciar sesion ya que solo esos dos tienen la clase 'd-none' y con el método toggle, cuando la clase d-none esta la quita y cuando esta la agrega.

function ocultar() {
  document.getElementById("btnRegistro").classList.toggle("d-none");
  document.getElementById("btnInSes").classList.toggle("d-none");

  document.getElementById("pantalla-registro").classList.toggle("d-none");
  document.getElementById("pantalla-inicio").classList.toggle("d-none");
}

//Guardar los parametros que se ingresaron en los input

document.getElementById("enviar-registro").addEventListener("click", guardar);

function guardar() {
  let nombre = document.getElementById("nombre-registro").value;
  let apellido = document.getElementById("apellido-registro").value;
  let usuario = document.getElementById("usuario-registro").value;
  let contrasena = document.getElementById("contrasena-registro").value;

  let nuevoUsuario = {
    nombre: nombre,
    apellido: apellido,
    usuario: usuario,
    contrasena: contrasena,
  };

  validarNuevoUsuario(nuevoUsuario);
}

function validarNuevoUsuario(usuariosIngresado) {
  let usuarioEncontrado;

  let usuariosFiltrados = usuarios.filter(
    (u) => u.usuario === usuariosIngresado.usuario
  );

  if (usuariosFiltrados.length === 1) {
    usuarioEncontrado = usuariosFiltrados[0];
  }

  if (usuarioEncontrado) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Este usuario ya esta en uso, intenta uno diferente",
    });
  } else {
    usuarios.push(usuariosIngresado);
    localStorage.setItem('usuarios', JSON.stringify([...usuarios]))
    Swal.fire({
      icon: "success",
      title: "Registro exitoso ¡Bienvenido a IA Illustrator!",
      showConfirmButton: false,
    });
    ocultar()
  }
}

//Registro y validacion de usuarios en el inicio de sesion
document
  .getElementById("enviar-inicio")
  .addEventListener("click", iniciarSesion);

function iniciarSesion() {
  let usuario = document.getElementById("usuario-inicio").value;
  let contrasena = document.getElementById("contrasena-inicio").value;

  let usuariosUsados = {
    usuario: usuario,
    contrasena: contrasena,
  };
  validarInicioSesion(usuariosUsados);
}

function validarInicioSesion(usuarioParaValidar) {
  let usuarioEncontradoInicio;

  let usuariosFiltradosInicio = usuarios.filter(
    (u) =>
      u.usuario === usuarioParaValidar.usuario &&
      u.contrasena === usuarioParaValidar.contrasena
  );

  if (usuariosFiltradosInicio.length === 1) {
    usuarioEncontradoInicio = usuariosFiltradosInicio[0];
  }
  if (!usuarioEncontradoInicio) {
    Swal.fire({
      title: "Credenciale incorrectas",
      text: "Usuario o contraseña incorrecto",
      icon: "error",
    });
  } else {
    Swal.fire({
      title: "Bienvenido, " + usuarioEncontradoInicio.nombre + ' ' + usuarioEncontradoInicio.apellido,
      text: "Tu inicio ha sido exitoso",
      icon: "success",
    });
  }
}


