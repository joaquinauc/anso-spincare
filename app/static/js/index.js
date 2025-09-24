function mostrarErrorCredenciales() {
  const modal = document.querySelector("#modalCredentials");
  const mensajeElement = document.querySelector("#credentialsModalMsg");
  const cerrarBtn = document.querySelector("#credentialsModalCloseBtn");

  mensajeElement.textContent = "Contraseña o Número de Usuario incorrecto.";
  modal.style.display = "block";

  // Evento para cerrar el modal
  cerrarBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Cerrar al hacer clic fuera del modal
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

