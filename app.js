/* =============================================================
   CookieLab · Práctica de cookies
   Desarrollo Web en Entorno Cliente · 2º DAW
   Alumna: Alba Casado García
   ============================================================= */

console.log("CookieLab iniciado");

// Duración de las cookies: 30 días en segundos (30 × 24 × 60 × 60).
const TREINTA_DIAS = 30 * 24 * 60 * 60;

/**
 * guardarCookie(nombre, valor, segundos)
 * Crea (o actualiza) una cookie que dura los segundos indicados.
 * encodeURIComponent permite guardar espacios y tildes sin problemas.
 */
function guardarCookie(nombre, valor, segundos) {
  document.cookie = nombre + "=" + encodeURIComponent(valor) + "; max-age=" + segundos + "; path=/";
}


/* =============================================================
   FASE 1 · Pedir y guardar el nombre
   ============================================================= */

// Al cargar la página, pedimos el nombre con prompt.
const nombre = prompt("¡Hola! ¿Cómo te llamas?");

// Si ha escrito algo (no ha cancelado ni lo ha dejado vacío)...
if (nombre && nombre.trim() !== "") {
  // ...lo guardamos en la cookie "usuario" durante 30 días
  guardarCookie("usuario", nombre.trim(), TREINTA_DIAS);

  // ...y le damos la bienvenida.
  alert("¡Bienvenida/o a CookieLab, " + nombre.trim() + "! 🍪");
}