/* =============================================================
   CookieLab · Práctica de cookies
   Desarrollo Web en Entorno Cliente · 2º DAW
   Alumna: Alba Casado García
   ============================================================= */

console.log("CookieLab iniciado");

// Duración de las cookies: 30 días en segundos (30 × 24 × 60 × 60).
const TREINTA_DIAS = 30 * 24 * 60 * 60;

// Elementos del HTML que vamos a usar.
const saludo       = document.getElementById("saludo");
const selectTema   = document.getElementById("select-tema");
const selectIdioma = document.getElementById("select-idioma");

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
let primeraVisita = false;

// GUARD: decide qué hacer según exista o no la cookie.
if (usuario === null) {
  // PRIMERA VISITA: preguntamos el nombre y lo guardamos (Fase 1).
  const nombre = prompt("¡Hola! ¿Cómo te llamas?");

  if (nombre && nombre.trim() !== "") {
    usuario = nombre.trim();
    primeraVisita = true;
    guardarCookie("usuario", usuario, TREINTA_DIAS);
    alert("¡Bienvenida/o a CookieLab, " + usuario + "! 🍪");
  }
}
// Si YA existe, no preguntamos nada: el saludo se pinta más abajo.





/* =============================================================
   FASE 3 · Preferencias: tema e idioma
   ============================================================= */

// Textos del saludo en cada idioma.
const textos = {
  es: {
    nuevo:   "Encantada de conocerte, ",
    deNuevo: "Hola de nuevo, ",
    anonimo: "Hola, visitante anónimo 👀"
  },
  en: {
    nuevo:   "Nice to meet you, ",
    deNuevo: "Welcome back, ",
    anonimo: "Hello, anonymous visitor 👀"
  }
};

/**
 * pintarSaludo()
 * Escribe el saludo en el idioma guardado en la cookie "idioma"
 * (español por defecto).
 */
function pintarSaludo() {
  const idioma = leerCookie("idioma") || "es";
  const t = textos[idioma];

  if (usuario === null) {
    saludo.textContent = t.anonimo;
  } else if (primeraVisita) {
    saludo.textContent = t.nuevo + usuario + " 🍪";
  } else {
    saludo.textContent = t.deNuevo + usuario + " 👋";
  }
}

/**
 * aplicarTema(tema)
 * Igual que el modo noche: añade o quita la clase "claro" al body.
 */
function aplicarTema(tema) {
  if (tema === "claro") {
    document.body.classList.add("claro");
  } else {
    document.body.classList.remove("claro");
  }
}

// Al cargar: aplicamos las preferencias guardadas (o las de por defecto).
const temaGuardado   = leerCookie("tema")   || "oscuro";
const idiomaGuardado = leerCookie("idioma") || "es";

selectTema.value   = temaGuardado;
selectIdioma.value = idiomaGuardado;
aplicarTema(temaGuardado);
pintarSaludo();

// Cuando el usuario cambia el tema: lo guardamos y lo aplicamos.
selectTema.addEventListener("change", function () {
  guardarCookie("tema", selectTema.value, TREINTA_DIAS);
  aplicarTema(selectTema.value);
});

// Cuando cambia el idioma: lo guardamos y repintamos el saludo.
selectIdioma.addEventListener("change", function () {
  guardarCookie("idioma", selectIdioma.value, TREINTA_DIAS);
  pintarSaludo();
});




/* =============================================================
   FASE 4 · Contador de visitas
   ============================================================= */

const textoVisitas = document.getElementById("visitas");

// Al cargar, leemos la cookie "visitas".
let visitas = leerCookie("visitas");

// Si no existe, empezamos en 1. Si existe, le sumamos 1.
// La cookie guarda TEXTO, así que la pasamos a número con Number.
if (visitas === null) {
  visitas = 1;
} else {
  visitas = Number(visitas) + 1;
}

// Guardamos el nuevo valor.
guardarCookie("visitas", visitas, TREINTA_DIAS);

/**
 * pintarVisitas()
 * Muestra el número de visitas en el idioma elegido.
 */
function pintarVisitas() {
  const idioma = leerCookie("idioma") || "es";

  if (idioma === "en") {
    textoVisitas.textContent = "👣 You have visited this page " + visitas + (visitas === 1 ? " time" : " times");
  } else {
    textoVisitas.textContent = "👣 Has visitado esta página " + visitas + (visitas === 1 ? " vez" : " veces");
  }
}

pintarVisitas();

// Si cambia el idioma, también traducimos el contador.
selectIdioma.addEventListener("change", pintarVisitas);


/* =============================================================
   FASE 5 · Panel de control
   ============================================================= */

/**
 * borrarCookie(nombre)
 * Para borrar una cookie se guarda vacía con max-age=0.
 */
function borrarCookie(nombre) {
  document.cookie = nombre + "=; max-age=0; path=/";
}

// Botón "Cambiar mi nombre": pregunta con prompt y actualiza cookie y saludo.
document.getElementById("btn-cambiar").addEventListener("click", function () {
  const nuevo = prompt("¿Cómo quieres que te llame?", usuario || "");

  if (nuevo && nuevo.trim() !== "") {
    usuario = nuevo.trim();
    primeraVisita = false;
    guardarCookie("usuario", usuario, TREINTA_DIAS);
    pintarSaludo();
  }
});

// Botón "Olvidarme": tras un confirm, borra TODAS las cookies.
document.getElementById("btn-olvidar").addEventListener("click", function () {
  // confirm devuelve true (Aceptar) o false (Cancelar).
  const seguro = confirm("¿Seguro que quieres que CookieLab te olvide? Se borrarán todos tus datos.");

  if (seguro) {
    borrarCookie("usuario");
    borrarCookie("tema");
    borrarCookie("idioma");
    borrarCookie("visitas");

    alert("Listo, te hemos olvidado 👋 La página se recargará como si fueras nueva.");
    location.reload();
  }
});