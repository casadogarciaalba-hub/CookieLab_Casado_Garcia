/* =============================================================
   CookieLab · Práctica de cookies
   Desarrollo Web en Entorno Cliente · 2º DAW
   Alumna: Alba Casado García
   ============================================================= */

console.log("CookieLab iniciado");

// Duración de las cookies: 30 días en segundos (30 × 24 × 60 × 60).
const TREINTA_DIAS = 30 * 24 * 60 * 60;

// Párrafo donde se muestra el saludo.
const saludo = document.getElementById("saludo");

/**
 * guardarCookie(nombre, valor, segundos)
 * Crea (o actualiza) una cookie que dura los segundos indicados.
 * encodeURIComponent permite guardar espacios y tildes sin problemas.
 */
function guardarCookie(nombre, valor, segundos) {
  document.cookie = nombre + "=" + encodeURIComponent(valor) + "; max-age=" + segundos + "; path=/";
}

/**
 * leerCookie(nombre)
 * document.cookie devuelve todas las cookies juntas: "a=1; b=2; c=3".
 * Las separamos por "; " y buscamos la que empieza por "nombre=".
 * Devuelve su valor, o null si no existe.
 */
function leerCookie(nombre) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].startsWith(nombre + "=")) {
      return decodeURIComponent(cookies[i].substring(nombre.length + 1));
    }
  }
  return null;
}


/* =============================================================
   FASE 1 · Pedir y guardar el nombre
   FASE 2 · Recordar al usuario (el guard)
   ============================================================= */

// Al cargar, leemos primero la cookie "usuario".
let usuario = leerCookie("usuario");

// GUARD: decide qué hacer según exista o no la cookie.
if (usuario === null) {
  // PRIMERA VISITA: preguntamos el nombre y lo guardamos (Fase 1).
  const nombre = prompt("¡Hola! ¿Cómo te llamas?");

  if (nombre && nombre.trim() !== "") {
    usuario = nombre.trim();
    guardarCookie("usuario", usuario, TREINTA_DIAS);
    alert("¡Bienvenida/o a CookieLab, " + usuario + "! 🍪");
    saludo.textContent = "Encantada de conocerte, " + usuario + " 🍪";
  } else {
    saludo.textContent = "Hola, visitante anónimo 👀";
  }
} else {
  // YA EXISTE: no preguntamos nada, saludamos directamente.
  saludo.textContent = "Hola de nuevo, " + usuario + " 👋";
}