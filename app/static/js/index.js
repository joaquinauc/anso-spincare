function mostrarErrorCredenciales() {
  const modal = document.querySelector("#modalCredentials");
  const mensajeElement = document.querySelector("#credentialsModalMsg");
  const cerrarBtn = document.querySelector("#credentialsModalCloseBtn");

  mensajeElement.textContent = "Contraseña incorrecta.";
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

document.addEventListener("DOMContentLoaded", function () {
  // 1. Forzar recarga sin caché si se llega aquí al retroceder
  if (performance.navigation.type === 2) { // Si se navegó con "back/forward"
    window.location.replace('index.html?noCache=' + Date.now());
  }

  // 2. Resetear formulario y desactivar autocompletado
  const form = document.querySelector("#login-form");
  form.reset(); // Limpia campos
  form.setAttribute('autocomplete', 'off'); // Bloquea autocompletado

  // --- Manejo del envío del formulario (original) ---
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('password', document.querySelector('#password').value);
    // Necesita el CSRF TOKEN para que funcione el forms de Flask y pueda hacer la validación
    formData.append('csrf_token', document.querySelector('[name=csrf_token]').value);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
        headers: {
          'Cache-Control': 'no-store' // Evita caché en la petición
        }
      });

      const result = await response.json();
      console.log(result)

      if (result.success) {
        // 3. Redirección que no deja historial
        window.location.replace(result.redirect); 
      } else {
        mostrarErrorCredenciales();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  });
});